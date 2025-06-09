# payment (결제 집계)

- 한 결제에 여러 머니 로그(onepy_money_log, real_money_log)가 연결될 수 있음
- meta에 머니별 상세내역(한평머니 얼마, 리얼머니 얼마 등) 기록
- 머니 로그 연결은 payment.meta에 id 로 관리

---

| 필드명                                            | 타입        | 필수  | 기본값   | min | max | 설명                |     |
| ---------------------------------------------- | --------- | --- | ----- | --- | --- | ----------------- | --- |
| payment_id                                     | bigserial | Y   |       | 1   |     | PK, 자동 증가         |     |
| [[Tags/model/users/user_onepy\|user_onepy_id]] | uuid      | Y   |       |     |     | user_onepy_id, FK |     |
| [[product                     \| product_id]]  | enum()    | Y   |       |     |     | FK                |     |
| price                                          | int4      | Y   |       |     |     | 결제 +, 취소 -        |     |
| meta                                           | jsonb     | N   | {}    |     |     | 머니별 상세내역 등        |     |
| created_at                                     | timestamp | Y   | now() |     |     | 생성일시              |     |

---

### 테이블 관계 및 제약조건

- **user_onepy_id**: [[user_onepy]] 테이블의 id와 1:N 관계 (FK)
- **product_id**: [[money/product|product]] 테이블의 product_id와 1:N 관계 (FK)
- **price**: + 는 결제, - 는 취소
- **meta**: 한평머니로그 id, 리얼머니로그 id 표시

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 리얼 DB 설계 시 반드시 적용 권장

---

#### 예시

```json
{
  "payment_id": 1,
  "user_onepy_id": "uuid",
  "product_id": "bigserial",
  "price": -10000,
  "meta": {
    "reason": "상품 결제 취소",
    "money_id": {
      "onepy_money_log_id": 1,
      "real_money_log_id": 5
    }
  },
  "created_at": "2024-06-01T12:00:00Z"
}
```

---

### 정리

- **onepy_charge**: 한평머니 충전 종류(충전명, 금액, 상태(사용중/중지), 상세정보 등)
- **product**: 판매 상품 정보 관리(상품명, 가격, 설명, 상태 등)
- **onepy_money_log**: 한평머니의 모든 변동(충전, 사용, 환불 등) 이력
- **real_money_log**: 리얼머니의 모든 변동(결제, 환불 등) 이력
- **payment**: 결제(한평머니/리얼머니 모두 포함)의 집계 및 상태 관리

#### 시나리오 예시

- 한평머니 충전/사용/환불: → onepy_money_log
- 리얼 결제/환불/사용: → real_money_log
- 결제/취소 등 전체 결제 흐름: → payment + product + onepy_money_log + real_money_log
- 한 결제(payment)에서 한평머니와 리얼머니를 복합적으로 사용할 경우, 각각의 log(onepy_money_log, real_money_log)에 별도 이력 남기고, payment에는 전체 결제 집계 및 상태 관리

#### 추가 팁

- 한 결제에서 한평머니와 리얼머니를 동시에 사용할 경우, payment의 meta에 상세 내역(한평머니 id, 리얼머니 id)을 json으로 기록하면 추적이 용이합니다.
- 모든 이력은 user_onepy_id로 회원과 연결, payment_id로 결제와 연결, ref_type/ref_id로 상품/서비스 등과 다형성 연결이 가능합니다.

**결론:**
이 5개 테이블만으로 한평머니와 리얼머니의 충전, 결제, 사용, 환불 등 모든 이력과 상태를 완벽하게 관리할 수 있습니다.
추가로 필요한 시나리오나 예외가 있다면 말씀해 주세요!
