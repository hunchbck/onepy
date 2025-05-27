# payment

| 필드명       | 타입          | 필수 | 기본값 | min  | max | 설명                  |
| ------------ | ------------- | ---- | ------ | ---- | --- | --------------------- |
| payment_id   | bigserial     | Y    |        | 1    |     | PK, 자동 증가         |
| user_id      | uuid          | Y    |        |      |     | [[user_onepy.id]], FK |
| status       | varchar(16)   | Y    |        |      | 16  | 결제 상태             |
| total_amount | numeric(12,2) | Y    |        | 0.01 |     | 총 결제 금액          |
| paid_amount  | numeric(12,2) | Y    | 0      | 0    |     | 실제 결제된 금액      |
| money_amount | int4          | Y    | 0      | 0    |     | 한평머니 사용 금액    |
| meta         | jsonb         | N    | {}     |      |     | 상세 정보             |
| created_at   | timestamptz   | Y    | now()  |      |     | 생성일시              |
| updated_at   | timestamptz   | Y    | now()  |      |     | 수정일시              |

## 제약조건

- id: PK, BIGSERIAL
- user_id: FK(user_onepy.id), ON DELETE CASCADE
- status: NOT NULL, 최대 16자
- total_amount: NOT NULL, 0.01 이상 (CHECK (total_amount >= 0.01))
- paid_amount: NOT NULL, 0 이상 (CHECK (paid_amount >= 0))
- money_amount: NOT NULL, 0 이상 (CHECK (money_amount >= 0))
- created_at, updated_at: NOT NULL, 기본값 now()

---

#### 예시

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "method": "card",
  "amount": 10000,
  "status": "success",
  "meta": {
    "card_company": "신한카드",
    "installment": 3
  },
  "created_at": "2024-06-01T12:00:00Z",
  "updated_at": "2024-06-01T12:00:00Z"
}
```

---

### 테이블 관계 및 제약조건

- **user_id**: [[user_onepy]] 테이블의 id와 1:N 관계 (FK, ON DELETE CASCADE)
  - 회원이 삭제되면 관련 payment 이력도 자동 삭제됨
- **status**: 결제 상태(성공, 실패, 환불 등)
- **meta**: 결제 관련 추가 정보(카드사, 할부 등)

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장

---

## 한평머니/실제머니 지급, 결제, 사용, 환불 이력 관리 구조 설명

아래 4개의 테이블만으로 "한평머니"와 "실제머니"의 지급, 결제, 사용, 환불 등 모든 이력을 충분히 표현할 수 있습니다.

### 1. [[onepy_money_log]]

- **한평머니**의 지급/사용/환불 등 모든 이력 기록
- 지급/사용 사유, 금액, 잔액, 관련 테이블 등 상세 기록
- FK: user_id → [[user_onepy]]
- 예시: 회원가입 축하 지급, 이벤트 지급, 한평머니로 상품 결제, 한평머니 환불 등

### 2. [[real_money_log]]

- **실제 현금 결제/환불/사용** 등 모든 이력 기록
- 결제/사용/환불 사유, 금액, 결제수단, 관련 테이블 등 상세 기록
- FK: user_id → [[user_onepy]]
- 예시: 카드 결제, 계좌이체 결제, 현금 환불, 현금 사용 등

### 3. [[payment]]

- 실제 결제(카드, 계좌이체, 한평머니 등) 집계 및 상태 관리
- 결제수단, 금액, 상태, 추가 정보 등 기록
- FK: user_id → [[user_onepy]]
- 예시: 결제 요청, 결제 성공/실패/환불 등 전체 결제의 집계 및 상태 관리

### 4. [[payment_log]]

- payment의 상태 변경 이력(성공, 실패, 환불 등) 기록
- FK: payment_id → [[payment]]
- 예시: 결제 요청 → 결제 성공 → 환불 요청 → 환불 완료 등 결제 상태의 모든 변경 이력

---

### 정리

- **onepy_money_log**: 한평머니의 모든 변동(지급, 사용, 환불 등) 이력
- **real_money_log**: 실제 현금의 모든 변동(결제, 사용, 환불 등) 이력
- **payment**: 결제(한평머니/실제머니 모두 포함)의 집계 및 상태 관리
- **payment_log**: payment의 상태 변경 이력

#### 시나리오 예시

- 한평머니 지급/사용/환불: → onepy_money_log
- 실제 결제/환불/사용: → real_money_log
- 결제 요청/성공/실패/환불 등 전체 결제 흐름: → payment + payment_log
- 한 결제(payment)에서 한평머니와 실제머니를 복합적으로 사용할 경우, 각각의 log(onepy_money_log, real_money_log)에 별도 이력 남기고, payment에는 전체 결제 집계 및 상태 관리

#### 추가 팁

- 한 결제에서 한평머니와 실제머니를 동시에 사용할 경우, payment의 meta에 상세 내역(한평머니 얼마, 실제머니 얼마)을 json으로 기록하면 추적이 용이합니다.
- 모든 이력은 user_id로 회원과 연결, payment_id로 결제와 연결, ref_type/ref_id로 상품/서비스 등과 다형성 연결이 가능합니다.

**결론:**
이 4개 테이블만으로 한평머니와 실제머니의 지급, 결제, 사용, 환불 등 모든 이력과 상태를 완벽하게 관리할 수 있습니다.
추가로 필요한 시나리오나 예외가 있다면 말씀해 주세요!
