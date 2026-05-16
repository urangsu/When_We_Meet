# When We Meet

When We Meet은 친구와의 약속을 더 쉽게 만들고, 더 예쁘게 초대하고, 더 부담 없이 응답하게 하는 초대장 기반 모임 플랫폼입니다.

## Product Direction
- 초대장 기반 모임 만들기
- 우리 달력 기록
- 날짜/장소/활동/문구 추천
- 부담 없는 게스트 응답
- 사진 카드 공유

## Current Prototype
- React / Vite
- localStorage repository bridge
- Supabase client boundary 준비
- Our Calendar local record prototype

## Official Testing URL

The current official testing URL is:

https://whenwm.vercel.app

### Vercel Environment Variables

Set these variables in Vercel Project Settings → Environment Variables:

```text
VITE_REPOSITORY_MODE=backend
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_PUBLIC_APP_URL=https://whenwm.vercel.app
```

After changing Vercel environment variables, redeploy the production deployment.

### Current Invite URL Format

The app currently uses HashRouter.

Invite links are generated as:

https://whenwm.vercel.app/#/invite/:meetingId/:token

Clean URLs without /#/ will be handled in Phase G-1.

## Not Production Yet
- No real backend sync
- No server-side invite validation
- No real calendar OAuth
- No Kakao SDK
- No analytics SDK
