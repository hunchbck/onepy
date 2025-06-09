# user_onepy

| 필드명           | 타입           | 필수  | 기본값   | min | max | 설명                                    |
| ------------- | ------------ | --- | ----- | --- | --- | ------------------------------------- |
| user_onepy_id | uuid         | Y   |       |     |     | PK, [[user_supabase.id]], FK, CASCADE |
| name          | varchar(32)  | Y   |       | 2   | 32  | 이름, 최소 2자, 최대 32자                     |
| nickname      | varchar(32)  | Y   |       | 2   | 32  | 닉네임, 고유, 최소 2자, 최대 32자                |
| phone         | varchar(14)  | Y   |       | 10  | 14  | 전화번호,고유, 최소 10자, 최대 14자               |
| avatar        | varchar(255) | N   |       |     | 255 | 프로필 이미지 URL                           |
| certification | jsonb        | N   | {}    |     |     | 인증 정보 (이메일, 휴대폰 등)                    |
| stats         | jsonb        | N   | {}    |     |     | 통계 정보 (팔로워, 팔로잉 등)                    |
| created_at    | timestamp  | Y   | now() |     |     | 생성일시                                  |
| updated_at    | timestamp  | Y   | now() |     |     | 수정일시                                  |

## 제약 조건

1. 필드 조건
- id: PK, FK(user_supabase.id), ON DELETE CASCADE
- nickname: UNIQUE, NOT NULL, LENGTH 2~32
- avatar: NULL 허용, 최대 255자
- created_at, updated_at: NOT NULL, 기본값 now()

1. 연결 테이블
- **[[Tags/model/payments/real_money_log|real_money_log]]**
- **[[Tags/model/payments/onepy_money_log|onepy_money_log]]**
- **[[payment]]**


---

#### certification 예시

```json
{
  "email": false,
  "mobile": false,
  "추가인증": false
}
```

- 이메일, 모바일 등 다양한 인증 항목을 자유롭게 추가할 수 있습니다.

#### stats 초기값

```json
{
  "money": {
    "onepy_money": 10000,
    "real_money": 0
  },
  "follower": {
    "sale": 0,
    "buy": 0
  },
  "following": {
    "sale": 0,
    "buy": 0
  },
  "like": {
    "user": 0,
    "product": 0,
    "community": 0
  },
  "dislike": {
    "user": 0,
    "product": 0,
    "community": 0
  }
}
```

- money: 한평/리얼얼머니 잔액
- like/dislike: 각각 user(회원), product(상품), community(커뮤니티 글)별로 분류하여 집계
- follower/following: 기존과 동일하게 판매/구매 회원별로 분류

---

## 주요 포인트 (drizzle-orm 기준)

- PK: user_onepy_id (uuid, [[user_supabase.id]] 참조, ON DELETE CASCADE)
- name: varchar(32)
- nickname: varchar(32), 고유(unique)
- phone: varchar(14), 고유(unique)
- profile_image: varchar(255)
- certification: jsonb, default {}
- stats: jsonb, default {}
- created_at, updated_at: timestamp, default now()
- user_supabase는 외부 인증 테이블로, 참조만 명시

---

## 실무 팁

- FK, PK, unique 등 모든 제약조건을 코드와 문서에 명확히 반영하세요.
- user_supabase는 외부 인증 테이블이므로, user_onepy_id는 항상 user_supabase.id와 1:1로 연결되어야 합니다.
- certification, stats 등 jsonb 필드는 구조가 바뀔 수 있으니, 프론트/백엔드에서 타입 체크를 엄격히 하세요.
- 닉네임은 unique 인덱스로 중복 방지, 최소/최대 길이도 프론트/백엔드에서 검증 필요
- created_at, updated_at은 자동 now()로 관리, 수정 시 updated_at도 자동 갱신되도록 구현
- 추가 확장(아바타, 명함, 회사 등) 시에도 FK는 항상 테이블명+id로 명확히 표기
- ERD, 쿼리, 코드, 문서 모두에서 일관성 있게 관리하면 협업/유지보수에 매우 유리합니다.
