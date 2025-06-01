# real_money_log (실제머니 이력)

- **실제 현금 결제/환불/사용** 등 모든 이력 기록
- 결제/사용/환불 사유, 금액, 결제수단, 관련 테이블 등 상세 기록
- FK: user_onepy_id → [[user_onepy]].user_onepy_id
- 예시: 카드 결제, 계좌이체 결제, 현금 환불, 현금 사용 등

---

| 필드명               | 타입          | 필수  | 기본값   | min | max | 설명                           |
| ----------------- | ----------- | --- | ----- | --- | --- | ---------------------------- |
| real_money_log_id | bigserial   | Y   |       | 1   |     | PK, 자동 증가                    |
| user_onepy_id     | uuid        | Y   |       |     |     | user_onepy.user_onepy_id, FK |
| action            | enum()      | Y   |       |     |     | 결제/환불/사용                     |
| amount            | int4        | Y   |       |     |     |                              |
| reason            | varchar(64) | N   |       |     | 64  | 사유                           |
| meta              | jsonb       | N   | {}    |     |     | 상세 정보                        |
| total_real_money  | int4        | Y   |       |     |     | 실제머니의 합                      |
| created_at        | timestamptz | Y   | now() |     |     | 생성일시                         |

## 제약조건

- real_money_log_id: PK, BIGSERIAL
- user_onepy_id: FK(user_onepy.user_onepy_id), ON DELETE CASCADE
- action: NOT NULL, enum(결제/환불/사용)
- amount: NOT NULL
- reason: 최대 64자, NULL 허용
- created_at: NOT NULL, 기본값 now() |

---

#### 예시

```json
{
  "real_money_log_id": "uuid",
  "user_onepy_id": "uuid",
  "action": "pay",
  "reason": "프리미엄 상품 결제",
  "amount": 10000,
  "reason": "product",
  "meta": "상세 정보",
  "total_onepy_money": 58000,
  "created_at": "2024-06-01T12:00:00Z"
}
```

---

### 테이블 관계 및 제약조건

- **user_id**: [[user_onepy]] 테이블의 id와 1:N 관계 (FK, ON DELETE CASCADE)
  - 회원이 삭제되면 관련 real_money_log 이력도 자동 삭제됨
- **action**: 결제(pay), 환불(refund), 사용(spend) 등 구분
- **amount**: 실제 결제/사용/환불 금액

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장
