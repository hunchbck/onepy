# business_card_image (명함 이미지)

| 필드명                 | 타입         | 필수 | 기본값 | min | max | 설명                     |
| ---------------------- | ------------ | ---- | ------ | --- | --- | ------------------------ |
| business_card_image_id | serial       | Y    |        | 1   |     | PK, 자동 증가            |
| business_card_id       | int4         | Y    |        | 1   |     | [[business_card.id]], FK |
| url                    | varchar(255) | Y    |        | 5   | 255 | 명함 이미지 URL          |
| is_main                | bool         | N    | false  |     |     | 대표이미지 여부          |
| description            | varchar(64)  | N    |        |     | 64  | 이미지 설명              |
| created_at             | timestamptz  | Y    | now()  |     |     | 업로드일시               |

## 제약조건

- business_card_id: FK(business_card.id), NOT NULL
- url: NOT NULL, 5~255자
- is_main: 대표이미지 여부
- created_at: NOT NULL, 기본값 now()

---

## 관리/확장 주의사항

- 한 명함에 여러 이미지(앞/뒤, 증명 등) 저장 가능, 대표이미지는 is_main으로 구분
- 파일은 S3 등 외부 스토리지에 저장, DB에는 URL만 보관
- 이미지 삭제/변경 시 business_card.image_url(대표이미지)도 함께 관리
- OCR, 명함정보 자동추출 등 확장 가능
- 개인정보 노출 주의, 접근권한 엄격 관리
