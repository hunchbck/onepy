# real_money_log (실제머니 이력)

- 실제 현금 결제/환불/사용 등 모든 변동 이력 기록
- FK: user_onepy_id → [[user_onepy]].user_onepy_id
- FK: product_id → [[money/product]].product_id (상품 결제 시)

---

| 필드명            | 타입        | 필수 | 기본값 | 설명                  |
| ----------------- | ----------- | ---- | ------ | --------------------- |
| real_money_log_id | bigserial   | Y    |        | PK, 자동 증가         |
| user_onepy_id     | uuid        | Y    |        | [[user_onepy]], FK    |
| product_id        | int8        | N    |        | [[money/product]], FK |
| action            | varchar(16) | Y    |        | 결제/환불/사용 등     |
| amount            | int4        | Y    |        | 변동 금액(+, -)       |
| reason            | varchar(64) | N    |        | 사유                  |
| meta              | jsonb       | N    | {}     | 상세 정보             |
| created_at        | timestamptz | Y    | now()  | 생성일시              |

---

## 상세 설명

- 실제 현금 결제/환불/사용 등 모든 변동 이력 기록
- 상품 결제 시 product_id로 [[money/product]]와 연결
- meta에 결제수단, 결제내역 등 상세 정보 기록 가능

---

## 제약조건

- real_money_log_id: PK, BIGSERIAL
- user_onepy_id: FK([[user_onepy]].user_onepy_id), NOT NULL
- product_id: FK([[money/product]].product_id), NULL 허용
- action: NOT NULL, varchar(16)
- amount: NOT NULL
- created_at: NOT NULL, 기본값 now()

---

## ERD 및 관계

- [[user_onepy]] 1 : N [[real_money_log]] (user_onepy_id)
- [[money/product]] 1 : N [[real_money_log]] (product_id)

---

## 활용 시나리오

- 실제 결제/환불/사용 등 모든 변동 이력 기록
- 상품 결제 시 product_id로 상품과 연결
- meta에 결제수단, 결제내역 등 상세 정보 기록

---

## 예시

| real_money_log_id | user_onepy_id | product_id | action | amount | reason        | created_at           |
| ----------------- | ------------- | ---------- | ------ | ------ | ------------- | -------------------- |
| 1                 | uuid-1        | 1          | 결제   | 10000  | 프리미엄 상품 | 2024-06-01T12:00:00Z |
| 2                 | uuid-1        | 1          | 환불   | -10000 | 환불          | 2024-06-02T12:00:00Z |

---

## 삭제 정책

- 이력은 절대 삭제하지 않음(회계/감사 목적)
- 회원/상품 삭제 시에도 이력은 보존
