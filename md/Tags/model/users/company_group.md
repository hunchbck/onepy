# company_group (회사 그룹)

| 필드명           | 타입         | 필수 | 기본값 | min | max | 설명                |
| ---------------- | ------------ | ---- | ------ | --- | --- | ------------------- |
| company_group_id | uuid         | Y    |        |     |     | PK, 자동 생성(UUID) |
| name             | varchar(32)  | Y    |        | 2   | 32  | 그룹명, 고유        |
| description      | varchar(128) | N    |        |     | 128 | 그룹 설명           |
| created_at       | timestamptz  | Y    | now()  |     |     | 생성일시            |

## 제약조건

- company_group_id: PK, UUID, NOT NULL, 자동 생성
- name: UNIQUE, NOT NULL, 2~32자
- created_at: NOT NULL, 기본값 now()
