# center_floorplan (층별 도면)

| 필드명              | 타입         | 필수 | 기본값 | min | max | 설명              |
| ------------------- | ------------ | ---- | ------ | --- | --- | ----------------- |
| center_floorplan_id | serial       | Y    |        | 1   |     | PK, 자동 증가     |
| center_id           | int4         | Y    |        | 1   |     | [[center.id]], FK |
| floor               | int4         | Y    |        | 1   |     | 층                |
| url                 | varchar(255) | Y    |        | 5   | 255 | 도면 이미지 URL   |
| created_at          | timestamptz  | Y    | now()  |     |     | 생성일시          |

## 제약조건

- center_id: FK(center.id), NOT NULL
- floor: NOT NULL
- url: NOT NULL, 5~255자
- created_at: NOT NULL, 기본값 now()
