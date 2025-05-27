# company_company_group_map (회사-회사그룹 매핑)

| 필드명                       | 타입        | 필수 | 기본값 | min | max | 설명                                   |
| ---------------------------- | ----------- | ---- | ------ | --- | --- | -------------------------------------- |
| company_company_group_map_id | serial      | Y    |        | 1   |     | PK, 자동 증가                          |
| company_id                   | uuid        | Y    |        |     |     | [[company.company_id]], FK             |
| company_group_id             | uuid        | Y    |        |     |     | [[company_group.company_group_id]], FK |
| is_main                      | bool        | N    | false  |     |     | 대표그룹 여부                          |
| created_at                   | timestamptz | Y    | now()  |     |     | 생성일시                               |

## 제약조건

- company_company_group_map_id: PK, 자동 증가
- company_id, company_group_id: 복합 UK, FK
- is_main: 대표그룹 여부
- created_at: NOT NULL, 기본값 now()
