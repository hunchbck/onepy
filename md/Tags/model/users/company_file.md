# company_file (회사 파일)

| 필드명          | 타입         | 필수 | 기본값 | min | max | 설명                            |
| --------------- | ------------ | ---- | ------ | --- | --- | ------------------------------- |
| company_file_id | serial       | Y    |        | 1   |     | PK, 자동 증가                   |
| company_id      | int4         | Y    |        | 1   |     | [[company.id]], FK              |
| url             | varchar(255) | Y    |        | 5   | 255 | 파일 URL                        |
| file_type       | varchar(32)  | Y    |        | 2   | 32  | 파일종류(사업자등록증, 사진 등) |
| is_main         | bool         | N    | false  |     |     | 대표파일 여부                   |
| description     | varchar(64)  | N    |        |     | 64  | 파일 설명                       |
| created_at      | timestamptz  | Y    | now()  |     |     | 업로드일시                      |

## 제약조건

- company_id: FK(company.id), NOT NULL
- url: NOT NULL, 5~255자
- file_type: NOT NULL, 2~32자
- is_main: 대표파일 여부
- created_at: NOT NULL, 기본값 now()

---

## 관리/확장 주의사항

- 한 회사에 여러 파일(사업자등록증, 사진, 계약서 등) 저장 가능, 대표파일은 is_main으로 구분
- 파일은 S3 등 외부 스토리지에 저장, DB에는 URL만 보관
- 파일 삭제/변경 시 company.file_url(대표파일)도 함께 관리
- 회사 인증, 문서 OCR, 계약서 관리 등 확장 가능
- 민감정보(사업자번호, 계약서 등) 노출 주의, 접근권한 엄격 관리
