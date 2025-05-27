# center_photo (지식산업센터 사진)

| 필드명          | 타입         | 필수 | 기본값 | min | max | 설명              |
| --------------- | ------------ | ---- | ------ | --- | --- | ----------------- |
| center_photo_id | serial       | Y    |        | 1   |     | PK, 자동 증가     |
| center_id       | int4         | Y    |        | 1   |     | [[center.id]], FK |
| url             | varchar(255) | Y    |        | 5   | 255 | 사진 URL          |
| is_main         | bool         | N    | false  |     |     | 대표사진 여부     |
| created_at      | timestamptz  | Y    | now()  |     |     | 생성일시          |

## 제약조건

- center_id: FK(center.id), NOT NULL
- url: NOT NULL, 5~255자
- is_main: 대표사진 여부
- created_at: NOT NULL, 기본값 now()
