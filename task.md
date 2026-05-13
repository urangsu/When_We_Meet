# When We Meet Development Roadmap

## 0. Product North Star
When We Meet은 단순 날짜 투표 앱이 아니라, 친구들과 언제, 어디서, 몇 시에, 무엇을 할지까지 자연스럽게 정하는 모임 결정 플랫폼이다.

---

## 1. Current Status

### Completed
- React Router / HashRouter 기반 라우팅
- Host App / Guest Web 레이아웃 분리
- MeetingRepository contract
- localStorage-backed repository Prototype
- CreateMeetingDraft autosave
- GuestInviteContext implementation
- Guest-Host Draft dependency removal

### Prototype Level
The app now supports a single-browser localStorage bridge:
Host creates invite link → Guest opens link in same browser storage context → Guest response is saved locally → Dashboard reads local responses → ConfirmPlan saves local ConfirmedPlan → ConfirmedShare reads local ConfirmedPlan.

This is NOT real multi-user sync and NOT a production backend.

---

## 2. Known Limitations
- No production database (localStorage Prototype only)
- No real multi-user synchronization
- Invite links are not server-side validated
- No duplicate guard enforcement (client-side only)
- No server-side enforcement of expiresAt / isClosed / maxResponses
- BrowserRouter rewrite not implemented
- HashRouter-safe share URL is temporary
- No OG preview route
- No real Kakao SDK / Instagram DM automation
- No real push notification / calendar / map / AI integrations

---

## 3. Phase A — Foundation
- [x] Host / Guest route split
- [x] BottomNav structures
- [x] Common components (Cards, Avatars)

## 4. Phase B — Meeting Creation & Decision Flow
- [x] Host Create Meeting Flow (Place, Time, Activity)
- [x] Guest Preference Flow (Place, Activity)
- [x] Confirm Plan Flow

## 5. Phase C — Guest Experience
- [x] Invite Landing / RSVP Flow
- [x] Acceptance/Decline presets
- [x] Unopened invite letter UX

## 6. Phase D — Host Decision Dashboard
- [x] Aggregation logic
- [x] Ranking summaries
- [x] Participant list UI
- [x] ConfirmedShare screen

## 7. Phase E — Product Reliability & Local Persistence
Goal: Move from visual prototype to a minimally trustworthy local invite-link flow.

- [x] Make share URL HashRouter-safe
- [x] Add MeetingRepository contract
- [x] Add localStorage-backed repository Prototype
- [x] Persist MeetingRecord / InviteLink / GuestResponse / ConfirmedPlan locally
- [x] Add GuestInviteContext
- [x] Remove Host Draft dependency from Guest screens
- [x] Connect ConfirmedShare participants to responses
- [ ] Replace localStorage repository with backend repository
- [ ] Add real server-side invite token validation
- [ ] Add real multi-user sync
- [ ] Add BrowserRouter + hosting rewrite

## 8. Phase F — Backend Repository & Real Invite Link
- [ ] Backend choice (Supabase/Firebase)
- [ ] Schema definition
- [ ] Server-side validation

## 9. Phase G — Calendar / Recommendation
## 10. Phase H — Local Content / Discovery
## 11. Phase I — Monetization
## 12. Phase J — Global / i18n

---

## 13. Product Signature
When We Meet의 핵심 차별점:
- 초대장을 받는 감각
- 부담 없는 답장
- 날짜/시간/만날 곳/뭐 할지까지 이어지는 결정
- 확정 후 기다림을 만드는 카드와 알림
- 모임 데이터 기반 추천/콘텐츠/광고 확장성

## 14. Data Asset Strategy
- 익명화/집계 데이터 기반 콘텐츠 및 추천 전략 수립

## 15. Data Model Draft
## 16. Invite Link Response Flow
## 17. Confirmed Plan Persistence Plan
## 18. Server-only AI Policy
## 19. Dependency Audit

---

## 20. Immediate Next Tasks

1. Phase F-1 — Backend Repository Choice & Schema
   - Choose Supabase or Firebase
   - Define Meeting / InviteLink / MeetingResponse / ConfirmedPlan schema
   - Define indexes and security rules

2. Phase F-2 — Real Invite Link Validation
   - Replace local invite lookup with backend lookup
   - Validate meetingId/token server-side
   - Enforce expiresAt / isClosed / maxResponses
   - Add duplicateGuard strategy

3. Phase F-3 — BrowserRouter + Hosting Rewrite
   - Replace HashRouter with BrowserRouter
   - Add Vercel rewrite config
   - Verify direct invite link reload
   - Prepare OG preview route for invite links
