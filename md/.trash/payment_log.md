# payment_log (결제 상태 이력)

- [[payment]]의 상태 변경 이력(성공, 실패, 환불 등) 기록
- FK: payment_id → [[payment]]
- 예시: 결제 요청 → 결제 성공 → 환불 요청 → 환불 완료 등 결제 상태의 모든 변경 이력

---

| 필드명         | 타입        | 필수 | 기본값 | min | max | 설명               |
| -------------- | ----------- | ---- | ------ | --- | --- | ------------------ |
| payment_log_id | bigserial   | Y    |        | 1   |     | PK, 자동 증가      |
| payment_id     | bigint      | Y    |        | 1   |     | [[payment.id]], FK |
| status         | varchar(16) | Y    |        |     | 16  | 결제 상태          |
| reason         | varchar(64) | N    |        |     | 64  | 상태 변경 사유     |
| meta           | jsonb       | N    | {}     |     |     | 상세 정보          |
| created_at     | timestamptz | Y    | now()  |     |     | 생성일시           |

## 제약조건

- id: PK, BIGSERIAL
- payment_id: FK(payment.id), ON DELETE CASCADE
- status: NOT NULL, 최대 16자
- reason: 최대 64자, NULL 허용
- created_at: NOT NULL, 기본값 now()

---

#### 예시

```json
{
  "id": "uuid",
  "payment_id": "uuid",
  "status": "success",
  "message": "결제 완료",
  "created_at": "2024-06-01T12:00:00Z"
}
```

---

### 테이블 관계 및 제약조건

- **payment_id**: [[payment]] 테이블의 id와 1:N 관계 (FK, ON DELETE CASCADE)
  - 결제 정보가 삭제되면 관련 payment_log 이력도 자동 삭제됨
- **status**: 결제 상태(성공, 실패, 환불 등)
- **reason**: 상태 변경 사유

> ※ 외래키(FK)는 옵시디언 문서 내에서 `[[테이블명]]` 링크로 표기
> ※ ON DELETE CASCADE 등 제약조건은 실제 DB 설계 시 반드시 적용 권장
