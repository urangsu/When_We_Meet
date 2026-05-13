# When We Meet Development Roadmap

## 0. Product North Star
When We Meet은 단순 날짜 투표 앱이 아니라, 친구들과 언제, 어디서, 몇 시에, 무엇을 할지까지 자연스럽게 정하는 모임 결정 플랫폼이다.

---

## 1. Current Status

### Completed
- React Router / HashRouter 기반 Host / Guest routing
- Host App / Guest Web layout split
- Host create flow prototype
- Guest RSVP flow prototype
- MeetingResponse aggregation utility
- Host Dashboard ranking summaries
- Manual confirmation panel
- MeetingRepository contract
- localStorage-backed repository Prototype
- MeetingRecord local persistence
- InviteLink local persistence
- GuestResponse local persistence
- ConfirmedPlan local persistence
- CreateMeetingDraft autosave
- GuestInviteContext
- Guest route meetingId/token preservation
- GuestDateVoteScreen no longer depends on Host Draft
- ConfirmedShareScreen reads saved ConfirmedPlan
- ConfirmedShareScreen displays response-based participant summary
- GEMINI_API_KEY client define removed

### Current Prototype Level
The app now supports a single-browser localStorage bridge:
Host creates invite link → Guest opens link in the same browser storage context → response is saved locally → Dashboard reads local responses → ConfirmPlan saves local ConfirmedPlan → ConfirmedShare reads local ConfirmedPlan.

This is not real multi-user sync.

---

## 2. Known Limitations
- No real backend database
- No real multi-user sync
- localStorage repository is a Prototype bridge only
- Invite links are not server-validated
- Duplicate guard is local-only
- maxResponses / expiresAt / isClosed are not enforced server-side
- BrowserRouter rewrite not implemented
- HashRouter-safe share URL is temporary
- No OG preview route
- No real Kakao SDK
- No real Instagram DM automation
- No real push notification
- No real calendar integration
- No real map/GPS/place autocomplete
- No real AI/LLM server endpoint
- No i18n
- No monetization system

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
- [x] Preserve meetingId/token through Guest routes
- [x] Remove Guest screen hardcoded /invite/demo navigation
- [x] Add MeetingRepository contract
- [x] Add localStorage-backed repository Prototype
- [x] Persist MeetingRecord locally
- [x] Persist InviteLink locally
- [x] Persist GuestResponse locally
- [x] Persist ConfirmedPlan locally
- [x] Add CreateMeetingDraft autosave
- [x] Make Dashboard read responses by meetingId
- [x] Make GuestComplete submit through local repository
- [x] Make ConfirmPlan save ConfirmedPlan through local repository
- [x] Make ConfirmedShare read saved ConfirmedPlan
- [x] Add GuestInviteContext
- [x] Remove Host Draft dependency from GuestDateVoteScreen
- [x] Connect ConfirmedShare participants to responses
- [x] Remove GEMINI_API_KEY client define
- [ ] Replace localStorage repository with backend repository
- [ ] Add real server-side invite token validation
- [ ] Add real multi-user sync
- [ ] Add BrowserRouter + hosting rewrite
- [ ] Add OG preview route for invite links
- [ ] Add server-side duplicate guard
- [ ] Enforce maxResponses / expiresAt / isClosed on server

## 8. Phase F — Backend Repository & Real Invite Link

Completed:
- [x] Document backend choice
- [x] Define Meeting schema
- [x] Define InviteLink schema
- [x] Define MeetingResponse schema
- [x] Define ConfirmedPlan schema
- [x] Define derived Participant view
- [x] Add repository mode selector
- [x] Add backend repository skeleton
- [x] Add repository factory
- [x] Remove direct localMeetingRepository imports from screens/state

Not Completed:
- [ ] Install backend SDK
- [ ] Implement backend repository interface
- [ ] Replace backend skeleton with real adapter
- [ ] Add server-side invite token validation
- [ ] Add response idempotency on server
- [ ] Add maxResponses / expiresAt / isClosed enforcement

---

## Repository Mode

Current:
- Default repository mode is `local`.
- `local` uses localStorage-backed localMeetingRepository.
- `backend` is reserved for the future backend adapter.

Environment:
- VITE_REPOSITORY_MODE=local
- VITE_REPOSITORY_MODE=backend

Policy:
- Screens must not import localMeetingRepository directly.
- Screens must use meetingRepository or getMeetingRepository.
- Backend mode currently throws explicit not-implemented errors.
- Real backend implementation will be added in Phase F-3.

## 9. Phase G — BrowserRouter / Hosting / OG Preview
- [ ] Replace HashRouter with BrowserRouter
- [ ] Add Vercel rewrite config
- [ ] Verify direct invite link reload
- [ ] Add invalid/expired/closed invite routes
- [ ] Prepare OG preview route

## 10. Phase H — Calendar / Map / Recommendation
## 11. Phase I — Local Content / Discovery
## 12. Phase J — Monetization
## 13. Phase K — Global / i18n

---

## 14. Product Signature
When We Meet의 핵심 차별점:
- 초대장을 받는 감각
- 부담 없는 답장
- 날짜/시간/만날 곳/뭐 할지까지 이어지는 결정
- 확정 후 기다림을 만드는 카드와 알림
- 모임 데이터 기반 추천/콘텐츠/광고 확장성

## 15. Data Asset Strategy
- 익명화/집계 데이터 기반 콘텐츠 및 추천 전략 수립

## 16. Data Model Draft
## 17. Invite Link Response Flow
## 18. Confirmed Plan Persistence Plan
## 19. Server-only AI Policy
## 20. Dependency Audit

Current risk:
- @google/genai appears in package dependencies.
- dotenv appears in package dependencies.
- express appears in package dependencies.
- These are server/AI related and should not be used by browser screens.

Current mitigation:
- GEMINI_API_KEY is not injected through Vite define.
- Client screens should not import @google/genai.

Next:
- Search for actual imports.
- If unused, remove from client package.
- If needed, split server package or move to API route.
- Add CI check to prevent AI API key exposure.

Audit search:
- @google/genai imports: ./package.json, ./package-lock.json
- dotenv imports: No imports found
- express imports: No imports found
- GEMINI_API_KEY references: ./task.md, ./.env.example
- VITE_SUPABASE references: No references found

---

## 21. Immediate Next Tasks

1. Phase F-1 — Backend Repository Choice & Schema
   - Choose Supabase or Firebase
   - Define Meeting / InviteLink / MeetingResponse / ConfirmedPlan schema
   - Define indexes and security rules
   - Define migration path from localStorage repository to backend repository

2. Phase F-2 — Real Invite Link Validation
   - Replace local invite lookup with backend lookup
   - Validate meetingId/token server-side
   - Enforce expiresAt / isClosed / maxResponses
   - Add duplicateGuard strategy

3. Phase G-1 — BrowserRouter + Hosting Rewrite
   - Replace HashRouter with BrowserRouter
   - Add Vercel rewrite config
   - Verify direct invite link reload
   - Prepare OG preview route for invite links

4. Phase F-3 — ConfirmedPlan Server Persistence
   - Save confirmed plan to backend
   - Load ConfirmedPlan in ConfirmedShareScreen from backend
   - Add confirmed plan edit/history model
