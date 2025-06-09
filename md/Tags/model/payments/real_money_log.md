# real_money_log (리얼머니 이력)

- **실제 현금 결제/환불** 등 모든 이력 기록
- 결제/환불 사유, 금액, 결제수단(TossPayment) 관련 테이블 등 상세 기록
- FK: user_onepy_id → [[user_onepy|user_onepy_id]]
- 예시: 카드 결제, 계좌이체 결제, 현금 환불, 현금 사용 등

---

| 필드명                                            | 타입        | 필수  | 기본값   | min | max | 설명        |     |
| ---------------------------------------------- | --------- | --- | ----- | --- | --- | --------- | --- |
| real_money_log_id                              | bigserial | Y   |       | 1   |     | PK, 자동 증가 |     |
| tosspayment_id                                 | bigserial | Y   |       |     |     | FK        |     |
| [[Tags/model/users/user_onepy\|user_onepy_id]] | uuid      | Y   |       |     |     | FK        |     |
| [[product                     \| product_id]]  | enum()    | Y   |       |     |     | FK        |     |
| price                                          | int4      | Y   | 0     |     |     | 환불 -      |     |
| meta                                           | jsonb     | N   | {}    |     |     | 상세 정보     |     |
| created_at                                     | timestamp | Y   | now() |     |     | 생성일시      |     |

### 테이블 관계 및 제약조건

- **tossPayment_id**: tossPayment 테이블의 tossPayment_id와 1:1 관계 (FK)
- **user_onepy_id**: [[user_onepy]] 테이블의 user_onepy_id와 1:N 관계 (FK)
- **product_id**: [[money/product|product]] 테이블의 product_id와 1:N 관계 (FK)
- **payment_id**: [[money/payment|payment]] 테이블의 payment_id와 1:N 관계 (FK)
- 회원이 삭제되면 회원이 갖고 있던 real_money 차감 이력 기록

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장

---

#### 예시

```json
{
  "real_money_log_id": "bigserial",
  "tossPayment_id": "bigserial",
  "user_onepy_id": "uuid",
  "product_id": "bigserial",
  "price": 5000,
  "meta": {
    "reason": "결제/환불 사유",
    "total_real_money": {
      "payment": 100000,
      "refund": 5000,
      "total": 5000
    }
  },
  "created_at": "2024-06-01T12:00:00Z"
}
```

---
