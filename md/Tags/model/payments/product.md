# product

- 판매 상품 정보 관리
- 상품명, 가격, 설명, 상태 등

---

| 필드명            | 타입          | 필수  | 기본값   | 설명        |
| -------------- | ----------- | --- | ----- | --------- |
| product_id     | bigserial   | Y   |       | PK, 자동 증가 |
| product_name   | varchar(64) | Y   |       | 상품명       |
| product_price  | int4        | Y   | 0     | 상품 가격     |
| product_status | bool        | Y   | true  | 판매중/중지    |
| product_meta   | jsonb       | N   | {}    | 상세 정보     |
| created_at     | timestamp   | Y   | now() | 생성 일시     |

---

## 테이블 관계 및 제약조건

- 리얼머니 이력: [[money/real_money_log|real_money_log]]와 FK로 연결
- 한평머니 이력: [[money/onepy_money_log|onepy_money_log]]와 FK로 연결
- **payment_id**: [[money/payment|payment]]와 FK로 연결

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장

---

#### 예시

```json
{
  "product_id": "bigserial",
  "product_name": "1개월 구독",
  "product_price": 10000,
  "product_status": true,
  "product_meta": {
    "reason": "1개월 구독권"
  },
  "created_at": "2025-06-01T12:00:00Z"
}
```

---
