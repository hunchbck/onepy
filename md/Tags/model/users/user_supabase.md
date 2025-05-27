# user_supabase

| 필드명     | 타입         | 필수 | 기본값 | min | max | 설명             |
| ---------- | ------------ | ---- | ------ | --- | --- | ---------------- |
| id         | uuid         | Y    |        |     |     | PK, Supabase UID |
| email      | varchar(255) | Y    |        | 5   | 255 | 이메일           |
| created_at | timestamptz  | Y    | now()  |     |     | 생성일시         |
| updated_at | timestamptz  | Y    | now()  |     |     | 수정일시         |

## 제약조건

- id: PK, UUID, NOT NULL
- email: UNIQUE, NOT NULL, 5~255자
- created_at, updated_at: NOT NULL, 기본값 now()
