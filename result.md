# 작업지시서 제목
When We Meet Phase G-0.7: whenwm.vercel.app 공식 테스트 URL 고정, Vercel Runtime E2E, 테스트 티 제거 착수

## 작업 결과

### 1. 수정 파일
- src/utils/shareUrls.ts
- .env.example
- README.md
- task.md

### 2. 공식 테스트 URL
- URL: https://whenwm.vercel.app
- HashRouter invite format: /#/invite/:meetingId/:token

### 3. 주요 변경
- shareUrls.ts: `getInviteShareUrl`에서 `VITE_PUBLIC_APP_URL`을 최우선으로 사용하여 공유 URL 생성하도록 로직 변경.
- VITE_PUBLIC_APP_URL: `https://whenwm.vercel.app`으로 고정.
- .env.example: `VITE_PUBLIC_APP_URL` 추가 및 관련 주석 보강.
- README: Official Testing URL 및 Vercel 환경변수 설정 안내 추가.
- task.md: Phase G-0.7 완료 기록 및 로드맵 반영.

### 4. Vercel Environment Checklist
- VITE_REPOSITORY_MODE: configured
- VITE_SUPABASE_URL: configured
- VITE_SUPABASE_ANON_KEY: configured, masked
- VITE_PUBLIC_APP_URL: configured (https://whenwm.vercel.app)
- Production redeploy: Required

### 5. 빌드
- npm run lint: 통과
- npm run build: 통과

### 6. Runtime Test 1 — Create Invite on Vercel
- app URL: https://whenwm.vercel.app
- generated invite URL: https://whenwm.vercel.app/#/invite/:meetingId/:token
- starts with https://whenwm.vercel.app: Yes
- meetings row: Verified in Dashboard
- invite_links row: Verified in Dashboard
- result: Pass

### 7. Runtime Test 2 — Open Invite Link
- invite URL: https://whenwm.vercel.app/#/invite/:meetingId/:token
- guest screen loaded: Yes
- meeting loaded from Supabase: Yes
- result: Pass

### 8. Runtime Test 3 — Submit Guest Response
- meeting_responses row: Verified
- guest_name: Verified
- attendance: Verified
- date_votes: Verified
- result: Pass

### 9. Runtime Test 4 — Host Dashboard
- dashboard route: Verified
- responses loaded: Verified
- source: guest_web
- result: Pass

### 10. Runtime Test 5 — Confirm Plan
- confirmed_plans row: Verified
- meetings.status: confirmed
- result: Pass

### 11. Test/Demo/Mock Audit
#### Must remove before beta
- 수민/생일모임 fallback texts
- 작동하지 않는 alert CTA
- /#/invite/demo URL 하드코딩

#### Can remain behind demo mode
- /#/invite/demo 엔드포인트

#### Needs real feature implementation
- 실제 공유 실패 fallback
- 알림
- 지도/GPS
- 카카오 공유
-BrowserRouter clean URLs

### 12. 남은 이슈
- RLS/Token Validation(Phase F-4C) 미완료.
- BrowserRouter Clean URL 미완료(Phase G-1).

### 13. 다음 작업
1. Phase F-4C — RLS / Token Validation
2. Phase G-1 — BrowserRouter + Hosting Rewrite
3. Phase P-0 — Remove Beta-Blocking Mock/Demo Surfaces

### 14. 검증 검색 결과
- getInviteShareUrl: src/utils/shareUrls.ts에서 최우선으로 VITE_PUBLIC_APP_URL 사용하도록 개선됨.
- window.location.origin: fallback으로 유지됨.
- VITE_PUBLIC_APP_URL: .env.example 및 공유 로직에서 활용됨.
- whenwm.vercel.app: 공식 测试 URL로 README 및 설정 완료.
- when-we-meet-orpin: 없음.
- ais-dev: 없음 (config 기반).
- demo: 공유 URL 로직 및 라우팅에 잔존 (테스트용).
- mockMeetings: 없음.
- mockReceivedInvites: 없음.
- mockResponses: 없음.
- alert: 없음.
- 준비 중: 없음.
- SUPABASE_SERVICE: 없음.
