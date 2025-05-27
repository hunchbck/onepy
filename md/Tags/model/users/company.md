# company (회사)

| 필드명      | 타입         | 필수 | 기본값 | min | max | 설명                      |
| ----------- | ------------ | ---- | ------ | --- | --- | ------------------------- |
| company_id  | uuid         | Y    |        |     |     | PK, 자동 생성(UUID)       |
| name        | varchar(64)  | Y    |        | 2   | 64  | 회사명, 고유              |
| business_no | varchar(16)  | Y    |        | 5   | 16  | 사업자등록번호, 고유      |
| address     | varchar(128) | N    |        |     | 128 | 회사 주소                 |
| phone       | varchar(32)  | N    |        |     | 32  | 대표전화                  |
| email       | varchar(64)  | N    |        |     | 64  | 대표 이메일               |
| file_url    | varchar(255) | N    |        | 5   | 255 | 대표사업자등록증 파일 URL |
| created_at  | timestamptz  | Y    | now()  |     |     | 생성일시                  |
| updated_at  | timestamptz  | Y    | now()  |     |     | 수정일시                  |

## 제약조건

- company_id: PK, UUID, NOT NULL, 자동 생성 (예: gen_random_uuid())
- name: UNIQUE, NOT NULL, 2~64자
- business_no: UNIQUE, NOT NULL, 5~16자
- file_url: NULL 허용, 5~255자
- created_at, updated_at: NOT NULL, 기본값 now()

## 회사 파일 관리 구조 및 확장성 안내

- 한 회사에 여러 파일(사업자등록증, 사진, 문서 등)을 보관하려면 company_file 테이블을 별도로 설계하여 1:N 관계로 관리하세요.
- company.file_url은 대표사업자등록증(대표파일)만 저장하고, 상세 파일은 company_file에서 관리합니다.
- company_file 테이블에는 회사ID(uuid), 파일URL, 파일종류(사업자등록증, 사진, 계약서 등), 설명, 대표여부, 업로드일시 등을 저장할 수 있습니다.
- 파일은 S3 등 외부 스토리지에 저장하고, DB에는 URL만 보관하는 것이 일반적입니다.
- 파일 삭제/변경 시, company.file_url(대표파일)도 함께 관리해야 합니다.
- 확장: 회사 인증, 문서 OCR, 계약서 관리 등 다양한 서비스로 확장 가능
- 민감정보(사업자번호, 계약서 등) 노출에 주의하고, 접근권한을 엄격히 관리하세요.

## 실무/설계 주의사항 및 변경사항

- 회사 PK는 serial(숫자)에서 uuid로 변경되어, 모든 회사 관련 외래키는 uuid로 연결해야 합니다.
- 시행사, 시공사, 대행사, 대대행사, 은행, 인테리어 등 다양한 그룹을 group 필드(enum)로 관리합니다.
- 회사 그룹은 enum 또는 lookup 테이블로 관리할 수 있으며, 추후 그룹 추가/변경이 용이합니다.
- 기존 center_developer, center_contractor 등은 company 테이블의 group 필드로 통합 관리할 수 있습니다.
- 회사와 연결되는 모든 테이블(예: user_company_map, center_developer_map, center_contractor_map 등)의 company_id는 uuid 타입으로 변경해야 합니다.
- 회사 정보는 위키피디아처럼 사용자 직접 입력/수정이 가능하므로, company_history(이력) 테이블을 추가해 변경 추적 및 롤백이 가능하도록 설계하는 것이 좋습니다.
- 회사 파일(company_file)도 company_id(uuid)로 연결해야 하며, 파일 삭제/변경 시 대표파일 동기화에 주의하세요.
- 회사 정보는 실명, 사업자번호 등 민감정보가 포함되므로, 접근권한 및 개인정보보호에 각별히 신경써야 합니다.
- 회사 그룹별로 입력/수정/검증 정책을 다르게 둘 수 있습니다(예: 은행/시행사/시공사 등).
- 회사 정보의 신뢰성 확보를 위해 관리자 승인, 인증서류 첨부, 이력관리 등 추가 정책을 도입할 수 있습니다.
