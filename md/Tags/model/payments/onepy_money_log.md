# onepy_money_log (한평머니 이력)

- **한평머니**의 지급/사용/환불 등 모든 이력 기록
- 지급/사용 사유, 금액, 잔액, 관련 테이블 등 상세 기록
- FK: user_onepy_id → [[user_onepy]].user_onepy_id
- 예시: 회원가입 축하 지급, 이벤트 지급, 한평머니로 상품 결제, 한평머니 환불 등

---

| 필드명                | 타입          | 필수  | 기본값   | min | max | 설명                           |
| ------------------ | ----------- | --- | ----- | --- | --- | ---------------------------- |
| onepy_money_log_id | bigserial   | Y   |       | 1   |     | PK, 자동 증가                    |
| user_onepy_id      | uuid        | Y   |       |     |     | user_onepy.user_onepy_id, FK |
| action             | enum()      | Y   |       |     |     | 충전/결제/환불                     |
| amount             | int4        | Y   |       |     |     | 충전 +, 결제(환불) -               |
| reason             | varchar(64) | N   |       |     | 64  | 사유                           |
| meta               | jsonb       | N   | {}    |     |     | 상세 정보                        |
| total_onepy_money  | int4        | N   | {}    |     |     | 한평머니의 합                      |
| created_at         | timestamptz | Y   | now() |     |     | 생성일시                         |

## 제약조건

- id: PK, BIGSERIAL
- user_onepy_id: FK(user_onepy.user_onepy_id), ON DELETE CASCADE
- money: NOT NULL, enum(한평머니, 실제머니)
- action: NOT NULL, enum(지급,사용,환불)
- amount: NOT NULL
- reason: 최대 64자, NULL 허용
- created_at: NOT NULL, 기본값 now()

---

#### 예시

```json
{
  "onepy_money_log_id": "uuid",
  "user_onepy_id": "uuid",
  "action": "earn",
  "amount": 1000,
  "reason": "이벤트 참여 보상",
  "meta": "상세 정보",
  "total_onepy_money": 58000,
  "created_at": "2025-06-01T12:00:00Z"
}
```

---

### 테이블 관계 및 제약조건

- **user_onepy_id**: [[user_onepy]] 테이블의 user_onepy_id와 1:N 관계 (FK, ON DELETE CASCADE)
  - 회원이 삭제되면 관련 onepy_money_log 이력도 자동 삭제됨
- **ref_type/ref_id**: 다양한 테이블(이벤트, 결제, 환불 등)과의 연관을 위해 다형성 구조 사용
- **action**: 지급(earn), 사용(spend) 등 구분
- **amount**: 한평머니 지급/사용/환불 금액

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장
