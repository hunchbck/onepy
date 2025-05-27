# avatar (회원 아바타)

| 필드명     | 타입         | 필수 | 기본값 | min | max | 설명                          |
| ---------- | ------------ | ---- | ------ | --- | --- | ----------------------------- |
| avatar_id  | serial       | Y    |        | 1   |     | PK, 자동 증가                 |
| user_id    | uuid         | Y    |        |     |     | [[user_onepy.profile_id]], FK |
| url        | varchar(255) | Y    |        | 5   | 255 | 아바타 이미지 URL             |
| is_main    | bool         | N    | false  |     |     | 대표아바타 여부               |
| created_at | timestamptz  | Y    | now()  |     |     | 생성일시                      |

## 제약조건

- user_id: FK(user_onepy.profile_id), NOT NULL
- url: NOT NULL, 5~255자
- is_main: 대표아바타 여부
- created_at: NOT NULL, 기본값 now()
