# real_money_log (실제머니 이력)

- **실제 현금 결제/환불/사용** 등 모든 이력 기록
- 결제/사용/환불 사유, 금액, 결제수단, 관련 테이블 등 상세 기록
- FK: user_id → [[user_onepy]]
- 예시: 카드 결제, 계좌이체 결제, 현금 환불, 현금 사용 등

---

| 필드명            | 타입          | 필수 | 기본값 | min  | max | 설명                  |
| ----------------- | ------------- | ---- | ------ | ---- | --- | --------------------- |
| real_money_log_id | bigserial     | Y    |        | 1    |     | PK, 자동 증가         |
| user_id           | uuid          | Y    |        |      |     | [[user_onepy.id]], FK |
| type              | varchar(16)   | Y    |        |      | 16  | 결제/환불/사용 등     |
| amount            | numeric(12,2) | Y    |        | 0.01 |     | 금액, 0.01 이상       |
| reason            | varchar(64)   | N    |        |      | 64  | 사유                  |
| meta              | jsonb         | N    | {}     |      |     | 상세 정보             |
| created_at        | timestamptz   | Y    | now()  |      |     | 생성일시              |

## 제약조건

- id: PK, BIGSERIAL
- user_id: FK(user_onepy.id), ON DELETE CASCADE
- type: NOT NULL, 최대 16자
- amount: NOT NULL, 0.01 이상 (CHECK (amount >= 0.01))
- reason: 최대 64자, NULL 허용
- created_at: NOT NULL, 기본값 now() |

---

#### 예시

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "action": "pay",
  "reason": "프리미엄 상품 결제",
  "amount": 10000,
  "method": "card",
  "ref_type": "product",
  "ref_id": "uuid",
  "created_at": "2024-06-01T12:00:00Z"
}
```

---

### 테이블 관계 및 제약조건

- **user_id**: [[user_onepy]] 테이블의 id와 1:N 관계 (FK, ON DELETE CASCADE)
  - 회원이 삭제되면 관련 real_money_log 이력도 자동 삭제됨
- **ref_type/ref_id**: 다양한 테이블(상품, 서비스 등)과의 연관을 위해 다형성 구조 사용
- **action**: 결제(pay), 환불(refund), 사용(spend) 등 구분
- **amount**: 실제 결제/사용/환불 금액
- **method**: 결제수단(카드, 계좌이체 등)

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장
