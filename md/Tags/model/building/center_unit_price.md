# center_unit_price (호실별 분양가)

| 필드명                 | 타입          | 필수 | 기본값 | min | max | 설명                            |
| ---------------------- | ------------- | ---- | ------ | --- | --- | ------------------------------- |
| center_unit_price_id   | serial        | Y    |        | 1   |     | PK, 자동 증가                   |
| center_id              | int4          | Y    |        | 1   |     | [[center.id]], FK               |
| code                   | varchar(32)   | Y    |        | 2   | 32  | 호실별분양가코드, 고유          |
| usage                  | varchar(32)   | N    |        |     | 32  | 용도                            |
| dong                   | varchar(16)   | N    |        |     | 16  | 동명                            |
| floor                  | int4          | N    |        | 1   |     | 층                              |
| unit_order             | int4          | N    |        | 1   |     | 호실순서                        |
| height                 | numeric(5,2)  | N    |        | 0   |     | 높이(m)                         |
| unit                   | varchar(16)   | N    |        |     | 16  | 호실                            |
| status                 | varchar(16)   | N    |        |     | 16  | 상태                            |
| land_area              | numeric(10,2) | N    |        | 0   |     | 대지면적(㎡)                    |
| parking_area           | numeric(10,2) | N    |        | 0   |     | 주차장면적(㎡)                  |
| common_area            | numeric(10,2) | N    |        | 0   |     | 공용면적(㎡)                    |
| balcony_area           | numeric(10,2) | N    |        | 0   |     | 발코니면적(㎡)                  |
| exclusive_area         | numeric(10,2) | N    |        | 0   |     | 전용면적(㎡)                    |
| supply_area            | numeric(10,2) | N    |        | 0   |     | 분양면적(㎡)                    |
| price_per_py           | int4          | N    |        | 0   |     | 평단가(원)                      |
| price                  | int8          | N    |        | 0   |     | 분양가(원)                      |
| land_price             | int8          | N    |        | 0   |     | 토지분(원)                      |
| building_price         | int8          | N    |        | 0   |     | 건물분(원)                      |
| final_price_per_py     | int4          | N    |        | 0   |     | 최종평단가(원)                  |
| final_price            | int8          | N    |        | 0   |     | 최종분양가(원)                  |
| exclusive_price_per_py | int4          | N    |        | 0   |     | 전용평단가(원)                  |
| resale_price           | int8          | N    |        | 0   |     | 전매가(원)                      |
| record_date            | date          | Y    | now()  |     |     | 기록일                          |
| updated_at             | timestamptz   | Y    | now()  |     |     | 수정일                          |
| created_by             | uuid          | Y    |        |     |     | 기록자ID, [[user_onepy.id]], FK |

## 제약조건

- code: UNIQUE, NOT NULL, 2~32자
- center_id: FK(center.id), NOT NULL
- record_date, updated_at: NOT NULL, 기본값 now()
- created_by: FK(user_onepy.id), NOT NULL
