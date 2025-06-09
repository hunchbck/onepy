# user_onepy (회원)

- 한평머니/실제머니/상품/이력 등 모든 머니 관리의 기준이 되는 회원 테이블

---

| 필드명        | 타입        | 필수 | 기본값 | 설명                   |
| ------------- | ----------- | ---- | ------ | ---------------------- |
| user_onepy_id | uuid        | Y    |        | PK, UUID               |
| nickname      | varchar(32) | Y    |        | 닉네임                 |
| name          | varchar(32) | Y    |        | 이름                   |
| phone         | varchar(32) | N    |        | 전화번호               |
| email         | varchar(64) | N    |        | 이메일                 |
| created_at    | timestamptz | Y    | now()  | 생성일시               |
| updated_at    | timestamptz | Y    | now()  | 수정일시               |
| deleted       | bool        | N    | false  | 삭제 여부(soft delete) |

---

## 상세 설명

- 한평머니, 실제머니, 상품, 이력 등 모든 머니 관리의 기준이 되는 회원 테이블
- 회원 삭제 시 deleted=true로 soft delete 처리, 이력/머니/상품 등은 보존

---

## 제약조건

- user_onepy_id: PK, UUID
- nickname, name: NOT NULL, 최대 32자
- deleted: 기본값 false, soft delete 용
- created_at, updated_at: NOT NULL, 기본값 now()

---

## ERD 및 관계

- [[user_onepy]] 1 : 1 [[onepy_money]] (user_onepy_id)
- [[user_onepy]] 1 : N [[onepy_money_log]] (user_onepy_id)
- [[user_onepy]] 1 : N [[real_money_log]] (user_onepy_id)

---

## 활용 시나리오

- 회원가입 시 [[onepy_money]] 계정 자동 생성
- 회원 삭제 시 deleted=true 처리, 이력/머니/상품 등은 보존

---

## 예시

| user_onepy_id | nickname | name | phone         | email          | created_at           | updated_at           | deleted |
| ------------- | -------- | ---- | ------------- | -------------- | -------------------- | -------------------- | ------- |
| uuid-1        | 홍길동   | 길동 | 010-1234-5678 | test@onepy.com | 2024-06-01T12:00:00Z | 2024-06-01T12:00:00Z | false   |

---

## 삭제 정책

- 회원 삭제 시 deleted=true로 soft delete 처리
- 이력/머니/상품 등은 절대 삭제하지 않음
