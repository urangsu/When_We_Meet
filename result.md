# When We Meet Phase E-1: Production Route 전환, 데이터 계약 분리, Demo 격리, 패키지/의존성 정리

## 작업 결과

### 1. 수정 파일
- package.json
- src/types/meeting.ts
- src/utils/inviteRoutes.ts
- src/App.tsx
- src/screens/guest/InviteLandingScreen.tsx
- src/screens/host/DashboardScreen.tsx
- result.md

### 2. 주요 변경
- 패키지명 `react-example`에서 `when-we-meet`으로 변경
- ID 타입 계약(MeetingId, InviteToken, ResponseId, ConfirmedPlanId, UserId) 추가
- `InviteLink`, `MeetingRecord`, `ConfirmedPlan` 등 실제 데이터 모델 인터페이스 추가
- Guest 및 Host 생산 환경용 Production Route (/invite/:meetingId/:token, /app/meetings/:meetingId/...) 설계 및 구현
- Route generation용 utility(`getInviteRoute`) 생성
- `DashboardScreen`에서 `useParams`를 통해 `meetingId` 읽기 로직 준비
- App.tsx에 Production Routes와 Demo Routes(fallback) 공존 구성

### 3. 빌드
- npm run lint: 성공
- npm run build: 성공

### 4. 남은 이슈
- 응답 데이터의 실제 DB persisting 기능 미구현
- 모임 데이터의 실제 DB 저장 및 invite validation 미구현
- Guest response idempotency 정책 문서화 필요 (Server-side 정책)
- Demo 라우트 완전 격리 필요 (Phase E-2 작업 목표)

### 5. 다음 작업
1. task.md 로드맵 정리 (Phase E-1 완료 기록)
2. Demo route /demo 하위 완전 격리 (Phase E-2)
3. 실제 DB 기반 Invite lookup 및 응답 검증 구현 (Phase E-2)
4. ConfirmedPlan 및 Guest response persistence 구현

---
보고 명시:
- production route는 계약 준비 단계입니다.
- 실제 DB lookup이나 데이터 관리는 이루어지지 않습니다.
- 실제 invite token validation이나 guest response persistence 기능은 포함되어 있지 않습니다.
- AI 추천 기능은 추후 server-only 방침에 따라 분리될 예정입니다.
- task.md와 result.md 내용을 확인하였습니다.
