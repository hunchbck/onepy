# center (건물)

| 필드명         | 타입          | 필수 | 기본값 | min | max | 설명                            |
| -------------- | ------------- | ---- | ------ | --- | --- | ------------------------------- |
| center_id      | serial        | Y    |        | 1   |     | PK, 자동 증가                   |
| type           | varchar(16)   | Y    |        |     | 16  | 건물유형(enum)                  |
| name           | varchar(64)   | Y    |        | 2   | 64  | 건물명                          |
| address_city   | varchar(32)   | Y    |        | 2   | 32  | 시/도                           |
| address_gu     | varchar(32)   | Y    |        | 2   | 32  | 구/군                           |
| address_dong   | varchar(32)   | N    |        |     | 32  | 동/읍/면                        |
| address_detail | varchar(128)  | N    |        |     | 128 | 상세주소                        |
| zipcode        | varchar(8)    | N    |        |     | 8   | 우편번호                        |
| lat            | numeric(9,6)  | N    |        |     |     | 위도                            |
| lng            | numeric(9,6)  | N    |        |     |     | 경도                            |
| area_info      | jsonb         | N    | {}     |     |     | 대지/건축/용적률산정면적        |
| total_area     | numeric(12,2) | N    |        | 0   |     | 연면적(㎡)                      |
| rate_info      | jsonb         | N    | {}     |     |     | 비율 정보                       |
| elevator       | jsonb         | N    | {}     |     |     | 승강기 정보                     |
| building_meta  | jsonb         | N    | {}     |     |     | 지역지구, 도로현황 등 메타정보  |
| memo           | text          | N    |        |     |     | 비고                            |
| view_count     | int4          | N    | 0      | 0   |     | 조회수                          |
| created_by     | uuid          | Y    |        |     |     | 기록자ID, [[user_onepy.id]], FK |
| created_at     | timestamptz   | Y    | now()  |     |     | 생성일시                        |
| updated_at     | timestamptz   | Y    | now()  |     |     | 수정일시                        |

## 제약조건

- type: NOT NULL, [지식산업센터, 오피스빌딩, 프라자상가, 오피스텔, 생활형숙박, 콘도/호텔] 중 하나
- code: UNIQUE, NOT NULL, 2~32자
- name: NOT NULL, 2~64자
- region, address_city, address_gu: NOT NULL, 2~32자
- created_by: FK(user_onepy.id), NOT NULL
- created_at, updated_at: NOT NULL, 기본값 now()

---

### 주요 jsonb 예시

- area_info: { "land_area": 5000.0, "building_area": 2500.0, "gr_area": 18000.0 }
- rate_info: { "cur_coverage_rate": 49.5, "law_coverage_rate": 60.0, "cur_floorrate": 399.0, "law_floorrate": 400.0, "exclusive_rate": 65.0 }
- elevator: { "passenger": 4, "emergency": 1, "cargo": 2 }
- building_meta: { "district": "준공업지역", "road_status": "8m도로", "usage": "업무시설", "structure": "철근콘크리트", "scale": "지하2~지상10", "max_height": 45.5, "cur_parking": 200, "law_parking": 180, "open_space": "공개공지 500㎡" }

---

### 관계 테이블

- 시행사: [[center_developer]] (N:M)
- 시공사: [[center_contractor]] (N:M)
- 사진: [[center_photo]] (1:N)
- 분양가: [[center_unit_price]] (1:N)
- 도면: [[center_floorplan]] (1:N)

---

## 커서(cursor)에게 한 질문

- 위키피디아 처럼 사용자들이 직접 건물에 대한 사항을 직접 입력, 수정하도록 할꺼야
- 다만 악의적인 사람들이 있어서 데이터가 엉망으로 변할 수 있어
- 기록/수정 이력 테이블을 만들어서 악의적인 유저가 기록한 사항을 이전으로 되돌릴 수 있게 이력 테이블을 추가해주고 이전으로 되돌리는 방법을 자세히 기록해줘

## 롤백(되돌리기) 방법

### 1. 이력 조회

- center_history에서 해당 center_id의 version별 이력 목록을 조회합니다.
- 최신 이력(version 내림차순)에서 원하는 시점의 data_after를 확인합니다.

### 2. 되돌릴 버전 선택

- 되돌리고 싶은 버전(version N)의 data_after를 선택합니다.

### 3. center 테이블에 복원

- center 테이블의 해당 row를 version N의 data_after 값으로 전체 업데이트합니다.
- 복원 작업도 새로운 이력(version N+1)으로 기록(변경 전/후, 복원자, 사유: "롤백")합니다.

#### 예시 쿼리 (PostgreSQL)

```sql
-- 1. 되돌릴 데이터 조회
SELECT data_after
  FROM center_history
 WHERE center_id = 1 AND version = 3;

-- 2. 복원 (jsonb에서 필요한 필드만 추출하여 update)
UPDATE center
   SET name = data_after->>'name',
       -- ... (모든 필드)
       updated_at = now()
 WHERE id = 1;

-- 3. 복원 이력 추가
INSERT INTO center_history (center_id, version, data_before, data_after, changed_by, reason, created_at)
VALUES (1, 4, '{...}', '{...}', '복원자 uuid', '롤백', now());
```

### 4. UI/UX

- 관리자/유저가 이력 목록에서 "이전 버전으로 되돌리기" 버튼 클릭 → 복원 및 이력 자동 추가

---

## 추가 설명

- 모든 변경(추가/수정/삭제)은 반드시 center_history에 기록해야 하며,
  data_after는 center 테이블의 전체 row를 jsonb로 저장하는 것이 안전합니다.
- 악의적/실수로 인한 데이터 훼손 시, **이전 버전으로 손쉽게 복원**할 수 있습니다.
- 이력 테이블은 감사(감사로그), 변경 추적, 롤백, 통계 등 다양한 용도로 활용 가능합니다.

---

## 실무 팁 및 주의사항

- 이력 테이블의 version은 center_id별로 1부터 증가하도록 관리하세요.
- 복원 시에도 반드시 이력 테이블에 새로운 이력(version+1)로 기록해야 추적이 완벽합니다.
- 삭제(soft delete)도 이력 테이블에 기록 후, 실제 삭제는 soft delete(예: is_deleted 플래그)로 관리하는 것이 안전합니다.
- data_after에는 center 테이블의 모든 필드(확장 포함)를 jsonb로 저장해야 하며, 필드 추가/삭제 시에도 이력 구조가 깨지지 않도록 주의하세요.
- 롤백 시, 외래키(FK) 제약조건이나 unique 제약조건 위반이 발생하지 않도록 주의해야 합니다.
- 대량의 이력 데이터가 쌓일 수 있으므로, 주기적으로 백업/아카이빙 정책을 마련하는 것이 좋습니다.
- 이력 테이블은 민감한 정보(예: 개인정보)가 포함될 수 있으니 접근 권한을 엄격히 관리하세요.
