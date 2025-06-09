# onepy_money (한평머니)

- 한평머니(적립금) 지급/차감/잔액 관리 테이블
- 지급/충전/차감 등 모든 변동 이력은 [[onepy_money_log]]에 기록
- FK: user_onepy_id → [[user_onepy]].user_onepy_id

---

| 필드명         | 타입        | 필수 | 기본값 | 설명                   |
| -------------- | ----------- | ---- | ------ | ---------------------- |
| onepy_money_id | bigserial   | Y    |        | PK, 자동 증가          |
| user_onepy_id  | uuid        | Y    |        | [[user_onepy]], FK     |
| total_amount   | int4        | Y    | 0      | 현재 한평머니 잔액     |
| created_at     | timestamptz | Y    | now()  | 생성일시               |
| updated_at     | timestamptz | Y    | now()  | 수정일시               |
| deleted        | bool        | N    | false  | 삭제 여부(soft delete) |

---

## 상세 설명

- 한 회원의 한평머니(적립금) 잔액을 관리
- 지급/차감/충전 등 변동 이력은 [[onepy_money_log]]에 기록
- 회원 삭제 시에도 이력은 보존, deleted=true로 soft delete 처리
- 지급/차감/충전 등은 별도 이력 테이블에서 관리하며, 이 테이블은 잔액만 관리

---

## 제약조건

- onepy_money_id: PK, BIGSERIAL
- user_onepy_id: FK([[user_onepy]].user_onepy_id), UNIQUE, ON DELETE SET NULL
- total_amount: NOT NULL, 기본값 0
- deleted: 기본값 false, soft delete 용
- created_at, updated_at: NOT NULL, 기본값 now()

---

## ERD 및 관계

- [[user_onepy]] 1 : 1 [[onepy_money]] (user_onepy_id)
- [[onepy_money]] 1 : N [[onepy_money_log]] (onepy_money_id)

---

## 활용 시나리오

- 회원가입 시 한평머니 계정 자동 생성
- 한평머니 지급/차감/충전 시 [[onepy_money_log]]에 이력 기록 후 잔액 갱신
- 회원 삭제 시 deleted=true 처리, 이력은 보존

---

## 예시

| onepy_money_id | user_onepy_id | total_amount | created_at | updated_at | deleted |
| 1 | uuid-1 | 10000 | 2024-06-01T12:00:00Z | 2024-06-01T12:00:00Z | false |

---

## 삭제 정책

- 회원 삭제 시 한평머니 계정은 deleted=true로 soft delete 처리
- 이력([[onepy_money_log]])은 절대 삭제하지 않음
- 필요시 관리자에 의해 잔액 차감 및 이력 남김
