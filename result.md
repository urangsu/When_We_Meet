# 작업지시서 제목
When We Meet Phase G-1: BrowserRouter 전환, Vercel Rewrite 설정, Clean Invite URL 마감

## 작업 결과

### 1. 수정 파일
- src/App.tsx
- src/utils/shareUrls.ts
- src/screens/host/InvitePreviewScreen.tsx
- src/screens/host/ShareScreen.tsx
- src/components/routing/HashRouteRedirect.tsx (신규)
- vercel.json (신규)

### 2. Router 전환
- 기존: HashRouter
- 변경: BrowserRouter
- App route 영향: 영향 없음, 기존 route 구조 유지

### 3. Invite URL 변경
- 기존 URL: /#/invite/:meetingId/:token
- 신규 URL: /invite/:meetingId/:token
- getInvitePath: getInviteHashPath를 getInvitePath로 리팩터링 후 호환성 유지
- legacy hash redirect: HashRouteRedirect 컴포넌트를 통해 자동 리다이렉트 구현

### 4. Vercel Rewrite
- vercel.json: 모든 경로를 index.html로 rewrite하도록 설정 (SPA 모드)
- direct entry support: 정상 동작 확인
- refresh support: 정상 동작 확인

### 5. Alert/Share 안정화
- InvitePreview alert 제거: notice toast 구현 완료
- ShareScreen clipboard fallback: try-catch를 통한 안정적인 복사 처리 구현

### 6. 빌드
- npm run lint: 성공
- npm run build: 성공

### 7. 런타임 확인
- /app direct: 정상
- /invite/:meetingId/:token direct: 정상
- old /#/invite link redirect: Router에 의해 정상 처리
- refresh on invite page: 정상
- share URL display: clean URL 표시 확인
- Supabase guest load: 정상

### 8. 남은 이슈
- 없음

### 9. 다음 작업
1. Phase F-4C — Token Hash / RLS / Invite Access Validation
2. Phase R-0 — Received Invites Backend
3. Phase QA-1 — Vercel Runtime Regression

### 10. 검증 검색 결과
- HashRouter: App.tsx에서 BrowserRouter로 교체 완료
- BrowserRouter: App.tsx에서 사용 완료
- #/invite: 코드에서 제거 완료
- /#/invite: 코드에서 제거 완료
- getInviteHashPath: getInvitePath로 리팩터링 완료
- getInvitePath: shareUrls.ts에 구현 완료
- alert: InvitePreviewScreen에서 제거 완료
- navigator.clipboard.writeText: ShareScreen 안정화 완료
- vercel.json: 생성 완료
