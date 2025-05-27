# center_history (건물 이력)

| 필드명            | 타입         | 필수 | 기본값 | min | max | 설명                            |
| ----------------- | ------------ | ---- | ------ | --- | --- | ------------------------------- |
| center_history_id | serial       | Y    |        | 1   |     | PK, 자동 증가                   |
| center_id         | int4         | Y    |        | 1   |     | [[center.id]], FK               |
| version           | int4         | Y    |        | 1   |     | 이력 버전(1부터 증가)           |
| data_before       | jsonb        | N    |        |     |     | 변경 전 center 데이터           |
| data_after        | jsonb        | Y    |        |     |     | 변경 후 center 데이터           |
| changed_by        | uuid         | Y    |        |     |     | 변경자ID, [[user_onepy.id]], FK |
| reason            | varchar(128) | N    |        |     | 128 | 변경사유(선택)                  |
| created_at        | timestamptz  | Y    | now()  |     |     | 변경일시                        |

## 제약조건

- center_id: FK(center.id), NOT NULL
- version: NOT NULL, center_id별 1부터 증가
- data_after: NOT NULL
- changed_by: FK(user_onepy.id), NOT NULL
- created_at: NOT NULL, 기본값 now()
