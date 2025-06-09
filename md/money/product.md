# product (상품)

- 결제/머니 이력과 연결되는 상품 정보 테이블

---

| 필드명     | 타입        | 필수 | 기본값 | 설명                   |
| ---------- | ----------- | ---- | ------ | ---------------------- |
| product_id | bigserial   | Y    |        | PK, 자동 증가          |
| name       | varchar(64) | Y    |        | 상품명                 |
| price      | int4        | Y    |        | 상품 가격              |
| meta       | jsonb       | N    | {}     | 상세 정보              |
| created_at | timestamptz | Y    | now()  | 생성일시               |
| updated_at | timestamptz | Y    | now()  | 수정일시               |
| deleted    | bool        | N    | false  | 삭제 여부(soft delete) |

---

## 상세 설명

- 결제/머니 이력과 연결되는 상품 정보 관리
- meta에 상품 상세 정보, 옵션 등 기록 가능
- deleted=true로 soft delete 지원

---

## 제약조건

- product_id: PK, BIGSERIAL
- name: NOT NULL, 최대 64자
- price: NOT NULL
- deleted: 기본값 false, soft delete 용
- created_at, updated_at: NOT NULL, 기본값 now()

---

## ERD 및 관계

- [[money/product]] 1 : N [[real_money_log]] (product_id)

---

## 활용 시나리오

- 상품 결제 시 [[real_money_log]]와 연결
- 상품 정보 관리, 옵션/상세 정보 meta에 기록

---

## 예시

| product_id | name          | price | created_at           | updated_at           | deleted |
| ---------- | ------------- | ----- | -------------------- | -------------------- | ------- |
| 1          | 프리미엄 상품 | 10000 | 2024-06-01T12:00:00Z | 2024-06-01T12:00:00Z | false   |

---

## 삭제 정책

- 상품 삭제 시 deleted=true로 soft delete 처리
- 이력([[real_money_log]])은 절대 삭제하지 않음
