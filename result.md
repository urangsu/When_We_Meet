# When We Meet Phase F-2: Backend Repository Adapter 구조 도입, Supabase 전환 준비, Repository Factory 분리

## 작업 결과

### 1. 수정 파일
- src/repositories/meetingRepository.ts
- src/repositories/localMeetingRepository.ts
- src/repositories/repositoryMode.ts (신규)
- src/repositories/backendMeetingRepository.ts (신규)
- src/repositories/getMeetingRepository.ts (신규)
- src/screens/host/ShareScreen.tsx
- src/screens/host/DashboardScreen.tsx
- src/screens/host/ConfirmPlanScreen.tsx
- src/screens/host/ConfirmedShareScreen.tsx
- src/screens/guest/GuestCompleteScreen.tsx
- src/state/GuestInviteContext.tsx
- task.md
- result.md

### 2. 주요 변경
- Repository Mode (`local` | `backend`) 도입
- Backend Repository 스켈레톤 작성 (명시적으로 예외 처리)
- 화면과 상태 파일에서 `localMeetingRepository` 직접 import 제거 후 Factory(`getMeetingRepository()`) 사용으로 교체
- `meetingRepository` 인터페이스에 `getMeetingById` 추가 및 `localMeetingRepository`에 구현
- `task.md` Phase F 달성도 및 Dependency Audit 결과 갱신

### 3. 빌드
- npm run lint: 통과
- npm run build: 통과

### 4. 남은 이슈
- 아직 실제 Supabase/Firebase 연동을 수행하지 않았으므로, Backend 모드로 구동 시 에러를 던지도록 설계됨.

### 5. 다음 작업
1. Supabase SDK 설치 및 실제 DB 연동
2. Backend Repository 인터페이스 구현 교체
3. 서버사이드 검증 로직 구현

### 6. 검증 검색 결과
- localMeetingRepository references in screens/state/layouts: 없음 (수정 후 검색 결과 없음)
- mockMeetingRepository references: 없음
- mockResponses direct import in screens: 없음
- MeetingRepository references: src/repositories 내 코드 제외하고는 정상적으로 인터페이스가 import 되고 사용됨.
- GEMINI_API_KEY references: `./task.md`, `./.env.example`
- @google/genai imports: `./package.json`, `./package-lock.json`
- VITE_SUPABASE references: 없음
