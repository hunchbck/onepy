# onepy_money_log (한평머니 이력)

- **한평머니**의 충전/사용/잔액 이력 기록
- 충전/사용 사유, 금액, 잔액, 관련 테이블 등 상세 기록
- 변동 후 잔액(total_after) 기록
- meta에 관련 결제, 상품, 이벤트 등 상세 정보 기록 가능
- 예시: 회원 가입 축하 충전, 이벤트 충전, 한평머니로 상품 결제, 한평머니 환불 등
---

| 필드명                                            | 타입        | 필수  | 기본값   | 설명             |
| ---------------------------------------------- | --------- | --- | ----- | -------------- |
| onepy_money_log_id                             | bigserial | Y   |       | PK, 자동 증가      |
| [[Tags/model/users/user_onepy\|user_onepy_id]] | uuid      |     |       | FK             |
| price                                          | int4      | Y   | 0     | 충전 +, 결제(환불) - |
| meta                                           | jsonb     | N   | {}    | 상세 정보          |
| created_at                                     | timestamp | Y   | now() | 생성일시           |

---

## 제약조건

- 회원이 삭제되면 회원이 갖고 있던 onepy_money 차감 이력 기록, onepy_user_id 는 null 기록

---

## ERD 및 관계

- **user_onepy_id**: [[user_onepy]] 테이블의 user_onepy_id와 1:N 관계 (FK)
- **meta->'reason_id'->>'onepy_charge_id'**: [[onepy_charge]] 테이블의 onepy_charge_id와 1:N 관계 (FK)
- **meta->'reason_id'->>'product_id'**: [[money/product|product]] 테이블의 product_id와 1:N 관계 (FK)

---

#### 예시

```json
{
  "onepy_money_log_id": "bigserial",
  "user_onepy_id": "uuid",
  "price": 10000,
  "meta": {
    "reason": "가입축하금 만원 드려요~" or "1년 구독료",
    "reason_id": {
      "onepy_charge_id": 2,
      "prodeuc_id": 5
    },
    "total_onepy_money": {
      "charge": 100000,
      "use": 5000,
      "total": 5000
    }
  },
  "created_at": "2025-06-01T12:00:00Z"
}
```

---
### 옵시디언 표기

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장

---
