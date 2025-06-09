# onepy_money_log (한평머니 이력)

- 한평머니 지급/차감/충전/환불 등 모든 변동 이력 기록
- FK: onepy_money_id → [[onepy_money]].onepy_money_id
- FK: user_onepy_id → [[user_onepy]].user_onepy_id

---

| 필드명             | 타입        | 필수 | 기본값 | 설명                   |
| ------------------ | ----------- | ---- | ------ | ---------------------- |
| onepy_money_log_id | bigserial   | Y    |        | PK, 자동 증가          |
| onepy_money_id     | int8        | Y    |        | [[onepy_money]], FK    |
| user_onepy_id      | uuid        | Y    |        | [[user_onepy]], FK     |
| action             | varchar(16) | Y    |        | 지급/차감/충전/환불 등 |
| amount             | int4        | Y    |        | 변동 금액(+, -)        |
| reason             | varchar(64) | N    |        | 사유                   |
| meta               | jsonb       | N    | {}     | 상세 정보              |
| total_after        | int4        | Y    | 0      | 변동 후 잔액           |
| created_at         | timestamptz | Y    | now()  | 생성일시               |

---

## 상세 설명

- 한평머니 지급/차감/충전/환불 등 모든 변동 이력 기록
- 지급/차감/충전/환불 등 action 값으로 구분
- 변동 후 잔액(total_after) 기록
- meta에 관련 결제, 상품, 이벤트 등 상세 정보 기록 가능

---

## 제약조건

- onepy_money_log_id: PK, BIGSERIAL
- onepy_money_id: FK([[onepy_money]].onepy_money_id), NOT NULL
- user_onepy_id: FK([[user_onepy]].user_onepy_id), NOT NULL
- action: NOT NULL, varchar(16)
- amount: NOT NULL
- total_after: NOT NULL
- created_at: NOT NULL, 기본값 now()

---

## ERD 및 관계

- [[onepy_money]] 1 : N [[onepy_money_log]] (onepy_money_id)
- [[user_onepy]] 1 : N [[onepy_money_log]] (user_onepy_id)

---

## 활용 시나리오

- 한평머니 지급/차감/충전/환불 등 모든 변동 이력 기록
- 결제, 이벤트, 환불 등 다양한 상황에서 meta에 상세 정보 기록
- 잔액은 [[onepy_money]]에서 관리, 이력은 이 테이블에서 관리

---

## 예시

| onepy_money_log_id | onepy_money_id | user_onepy_id | action | amount | reason        | total_after | created_at           |
| ------------------ | -------------- | ------------- | ------ | ------ | ------------- | ----------- | -------------------- |
| 1                  | 1              | uuid-1        | 지급   | 1000   | 회원가입 보상 | 1000        | 2024-06-01T12:00:00Z |
| 2                  | 1              | uuid-1        | 차감   | -500   | 상품 결제     | 500         | 2024-06-02T12:00:00Z |

---

## 삭제 정책

- 이력은 절대 삭제하지 않음(회계/감사 목적)
- 회원/머니 계정 삭제 시에도 이력은 보존
