# user_company_map (회원-회사 매핑)

| 필드명              | 타입        | 필수 | 기본값 | min | max | 설명                          |
| ------------------- | ----------- | ---- | ------ | --- | --- | ----------------------------- |
| user_company_map_id | serial      | Y    |        | 1   |     | PK, 자동 증가                 |
| user_onepy_id       | uuid        | Y    |        |     |     | [[user_onepy.profile_id]], FK |
| company_id          | uuid        | Y    |        |     |     | [[company.company_id]], FK    |
| is_main             | bool        | N    | false  |     |     | 대표회사 여부                 |
| position            | varchar(32) | N    |        |     | 32  | 회사 내 직책                  |
| joined_at           | timestamptz | N    |        |     |     | 소속 시작일                   |
| created_at          | timestamptz | Y    | now()  |     |     | 생성일시                      |

## 제약조건

- user_company_map_id: PK, 자동 증가
- user_onepy_id: FK(user_onepy.profile_id), NOT NULL
- company_id: FK(company.company_id), NOT NULL
- user_onepy_id, company_id: 복합 UK
- is_main: 대표회사 여부
- created_at: NOT NULL, 기본값 now()

---

## 변경사항/주의사항

- company_id는 uuid로 변경되어, 모든 회사 관련 FK는 uuid로 연결해야 합니다.
- FK는 반드시 테이블명과 함께 명확히 표기하세요.
- 회사 그룹은 company_company_group_map을 통해 다대다로 연결합니다.
