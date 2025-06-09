# onepy_charge

- 한평머니 충전 종류
- 충전명, 금액, 상태(사용중/중지), 상세정보 등

---

| 필드명                                                      | 타입          | 필수  | 기본값   | 설명        |
| -------------------------------------------------------- | ----------- | --- | ----- | --------- |
| [[Tags/model/payments/onepy_money_log\|onepy_charge_id]] | bigserial   | Y   |       | PK, 자동 증가 |
| charge_name                                              | varchar(64) | Y   |       | 충전명       |
| charge_price                                             | int4        | Y   | 0     | 충전 금액     |
| charge_status                                            | bool        | Y   | true  | 사용중/중지    |
| charge_meta                                              | jsonb       | N   | {}    | 상세 정보     |
| created_at                                               | timestamp   | Y   | now() | 생성 일시     |

---

## 테이블 관계 및 제약조건

- 한평머니 이력: [[money/onepy_money_log|onepy_money_log]]와 FK로 연결

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장

---

#### 예시

```json
{
  "onepy_charge_id": "bigserial",
  "charge_name": "회원 가입",
  "charge_price": 10000,
  "charge_status": true,
  "charge_meta": {
    "reason": "가입축하금 만원 드려요~"
  },
  "created_at": "2025-06-01T12:00:00Z"
}
```

---
