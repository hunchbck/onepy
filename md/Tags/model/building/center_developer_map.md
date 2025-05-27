# center_company_map (지식산업센터-회사 매핑: 시행사)

| 필드명                | 타입        | 필수 | 기본값 | min | max | 설명                                |
| --------------------- | ----------- | ---- | ------ | --- | --- | ----------------------------------- |
| center_company_map_id | serial      | Y    |        | 1   |     | PK, 자동 증가                       |
| center_id             | int4        | Y    |        | 1   |     | [[center.center_id]], FK            |
| company_id            | uuid        | Y    |        |     |     | [[company.company_id]], FK (시행사) |
| is_main               | bool        | N    | false  |     |     | 대표 시행사 여부                    |
| created_at            | timestamptz | Y    | now()  |     |     | 생성일시                            |

## 제약조건

- center_company_map_id: PK, 자동 증가
- center_id, company_id: 복합 UK, FK
- is_main: 대표 시행사 여부
- created_at: NOT NULL, 기본값 now()
