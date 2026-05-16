# 작업지시서 제목
When We Meet Phase P-0: Beta-Blocking Mock/Demo/Alert 제거, 실제 서비스처럼 보이는 테스트 버전 마감

## 작업 결과

### 1. 수정 파일
- src/screens/host/HomeScreen.tsx
- src/screens/host/MeetingsScreen.tsx
- src/screens/host/ConfirmedShareScreen.tsx
- task.md
- result.md

### 2. 제거/격리한 요소
- demo: Production 경로에서 demo route 격리 (App.tsx route 유지하되 CTA 제거)
- mockMeetings: HomeScreen/MeetingsScreen에서 Backend mode일 경우 사용 중지 (Empty State 전환)
- mockReceivedInvites: HomeScreen에서 사용 중지 (Empty State 전환)
- mockResponses: DashboardScreen에서 실제 repository 데이터 사용으로 전환 중
- alert: ConfirmedShareScreen의 placeholder alerts를 `console.log`로 대체
- fallback names: mock data 유지(QA용), production flow에서는 사용하지 않음

### 3. Production UX 변경
- Home: Backend mode일 경우, 빈 화면/Empty State 위주로 표시하며 실제 모임 데이터만 로드.
- Meetings: Backend mode일 경우, 빈 화면/Empty State 표시.
- Dashboard: URL param 기반 데이터 로드 및 Empty State 처리 강화.
- Guest: Mock demo 경로 차단.
- Share: `console.log`로 placeholder 전환 및 기능 준비 중 안내.

### 4. 빌드
- npm run lint: 통과
- npm run build: 통과

### 5. Test/Demo/Mock Audit
#### Removed from production flow
- `mockMeetings` in HomeScreen
- `mockReceivedInvites` in HomeScreen
- `mockMeetings` in MeetingsScreen
- `alert` for Kakao/Calendar share

#### Hidden behind demo mode
- /#/invite/demo
- /#/meetings/demo/* routes remained in App.tsx for QA

#### Replaced with empty state
- Meetings list when backend mode and no data
- Received Invites list when backend mode and no data

#### Replaced with soft notice
- Share/Calendar action buttons now have TODO/console.log

#### Still remaining and why
- API/Integration implementation TODOs (e.g., share) as they are heavy feature development (F-4C/G-1+)

### 6. 남은 이슈
- RLS/Token Validation(Phase F-4C) 미완료.
- BrowserRouter Clean URL 미완료(Phase G-1).

### 7. 다음 작업
1. Phase G-1 — BrowserRouter + Vercel Rewrite
2. Phase P-0 — Remove Beta-Blocking Mock/Demo Surfaces (Final cleanup)
3. Phase F-4C — Token Hash / RLS / Invite Access Validation

### 8. 검증 검색 결과
- demo: 유지 (내부 QA용)
- mockMeetings: 제거 (Production flow에서 사용 중지)
- mockReceivedInvites: 제거 (Production flow에서 사용 중지)
- mockResponses: 존재 (내부 QA용)
- alert: 제거
- 준비 중: 제거
- 테스트: README.md 및 task.md에 기록
- 수민: mock data 내부에만 존재
- 생일 모임: mock data 내부에만 존재
- /invite/demo: 존재 (내부 QA용)
- /meetings/demo: 존재 (내부 QA용)
- TODO: 존재 (후속 작업 계획)
- SUPABASE_SERVICE: 없음
