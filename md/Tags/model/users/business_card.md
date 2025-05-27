# business_card (회원 명함)

| 필드명           | 타입         | 필수 | 기본값 | min | max | 설명                          |
| ---------------- | ------------ | ---- | ------ | --- | --- | ----------------------------- |
| business_card_id | serial       | Y    |        | 1   |     | PK, 자동 증가                 |
| user_id          | uuid         | Y    |        |     |     | [[user_onepy.profile_id]], FK |
| name             | varchar(64)  | Y    |        | 2   | 64  | 명함 이름                     |
| company          | varchar(64)  | N    |        |     | 64  | 회사명(텍스트)                |
| position         | varchar(32)  | N    |        |     | 32  | 직책                          |
| phone            | varchar(32)  | N    |        |     | 32  | 연락처                        |
| email            | varchar(64)  | N    |        |     | 64  | 이메일                        |
| image_url        | varchar(255) | N    |        | 5   | 255 | 대표명함 이미지 URL           |
| is_main          | bool         | N    | false  |     |     | 대표명함 여부                 |
| created_at       | timestamptz  | Y    | now()  |     |     | 생성일시                      |

## 제약조건

- user_id: FK(user_onepy.profile_id), NOT NULL
- name: NOT NULL, 2~64자
- image_url: NULL 허용, 5~255자
- is_main: 대표명함 여부
- created_at: NOT NULL, 기본값 now()

## 명함 이미지 관리 구조 및 확장성 안내

- 한 명함에 여러 이미지(앞/뒤, 스캔본, 증명 등)를 보관하려면 business_card_image 테이블을 별도로 설계하여 1:N 관계로 관리하세요.
- business_card.image_url은 대표이미지(썸네일/대표명함)만 저장하고, 상세 이미지는 business_card_image에서 관리합니다.
- business_card_image 테이블에는 명함ID, 이미지URL, 설명, 대표여부, 업로드일시 등을 저장할 수 있습니다.
- 명함 이미지 파일은 S3 등 외부 스토리지에 저장하고, DB에는 URL만 보관하는 것이 일반적입니다.
- 명함 이미지가 삭제/변경될 때, business_card.image_url(대표이미지)도 함께 관리해야 합니다.
- 확장: OCR, 명함정보 자동추출, 명함 공유 등 다양한 서비스로 확장 가능
- 개인정보(연락처, 이메일 등) 노출에 주의하고, 접근권한을 엄격히 관리하세요.
