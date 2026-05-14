# When We Meet Development Roadmap

## 0. Product North Star
When We Meet은 친구와의 약속을 더 쉽게 만들고, 더 예쁘게 초대하고, 더 부담 없이 응답하게 하는 초대장 기반 모임 플랫폼입니다.

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
- Our Calendar is currently mock/local prototype only
- Calendar share URL is prototype only
- External calendar integration is not implemented
- No real map/GPS/place autocomplete
- No real AI/LLM server endpoint
- No i18n
- No monetization system
- Our Calendar image share is client-side only
- Image share uses browser Web Share API when available and PNG download fallback otherwise
- Shared calendar album route was intentionally removed from the MVP direction

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
- [x] Install Supabase SDK
- [x] Add Supabase client boundary
- [x] Add VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY env typing
- [x] Keep service role key server-only
- [x] Connect backend repository skeleton to Supabase client boundary

Not Completed:
- [ ] Implement backend repository queries
- [ ] Replace backend skeleton with real Supabase adapter
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

### Current Direction
Our Calendar is a monthly planning calendar.
It supports records, memo-based meeting context, image-card sharing, and rule-based recommendations.

### Calendar Monthly Cell Rule
Monthly calendar cells should stay lightweight.

Rules:
- Do not show default text like "기록 적기" in every empty date cell.
- Show only date number and compact markers in the monthly grid.
- Show event/memo/external hint details in the selected date detail panel.
- Record creation/editing CTA belongs in the detail panel, not every date cell.
- Calendar must feel calm and scannable, not like a dense text table.

### Phase H-3.6 — Calendar Cell Minimal UX

Completed:
- [x] Remove default record text from monthly date cells
- [x] Keep compact event/memo/external markers
- [x] Keep record creation in selected date detail panel
- [x] Add or keep marker legend
- [x] Prevent monthly calendar from becoming a dense text grid

Not Completed:
- [ ] Backend calendar memo persistence
- [ ] Native Kakao image share
- [ ] Calendar memo privacy model

### Completed
- [x] Our Calendar domain types
- [x] Calendar record CRUD
- [x] localStorage memo persistence
- [x] Calendar memo attachment to meeting draft
- [x] Rule-based memo recommendations
- [x] Calendar image-card sharing

### Deprecated
- [x] Shared calendar album/page direction
- [x] /calendar/shared/:token as MVP sharing model
- [x] Clipboard link sharing as calendar MVP sharing

### Next
- [ ] Backend calendar_memos table
- [ ] Backend OurCalendarRepository
- [ ] Calendar memo privacy model
- [ ] Native Kakao image share
- [ ] Server-rendered calendar card

## 11. Phase I — Local Content / Discovery
## 12. Phase J — Monetization
## 13. Phase K — Global / i18n
## 14. Phase M — Product Positioning & Marketing Foundation

Goal:
Make When We Meet understandable to PM, marketing, design, and engineering as one product.

Completed:
- [x] Add product positioning document
- [x] Add marketing brief
- [x] Add copy system
- [x] Add growth strategy
- [x] Add analytics taxonomy draft
- [x] Update README product direction
- [x] Audit app copy for positioning consistency
- [x] Keep analytics/ad SDK out of product code

Not Completed:
- [ ] Real landing page
- [ ] App Store screenshots
- [ ] App Store description localization
- [ ] Actual analytics SDK
- [ ] Actual ad platform integration
- [ ] Real SEO pages

---

## 15. Product Signature
When We Meet의 핵심 차별점:
- 초대장을 받는 감각
- 부담 없는 답장
- 날짜/시간/만날 곳/뭐 할지까지 이어지는 결정
- 확정 후 기다림을 만드는 카드와 알림
- 모임 데이터 기반 추천/콘텐츠/광고 확장성

## 16. Data Asset Strategy
- 익명화/집계 데이터 기반 콘텐츠 및 추천 전략 수립

## Backend Choice

Recommended MVP backend: Supabase

Reason:
- When We Meet data is relational: Meeting → InviteLink → MeetingResponse → ConfirmedPlan.
- Unique constraints are important for invite token and confirmed plan.
- Indexes are important for meeting dashboard queries.
- Row Level Security can later separate host access and guest link access.
- Realtime can later update Host Dashboard as friends respond.
- Edge Functions can later host server-only AI copy/recommendation endpoints.

Firebase alternative:
- Good for realtime-first use cases.
- Less natural for relational joins and unique constraints in this product.
- Can work later if the product becomes chat/community-first.

Decision:
Use Supabase as the recommended backend for Phase F unless deployment constraints force Firebase.

## 17. Data Model Draft

### meetings

Purpose:
Host-created meeting record.

Fields:
- id: uuid primary key
- host_user_id: uuid nullable
- title: text not null
- host_message: text nullable
- category: text nullable
- theme_id: text nullable
- location_mode: text not null
- fixed_place_name: text nullable
- date_labels: text[] not null default '{}'
- time_mode: text not null
- time_labels: text[] not null default '{}'
- activity_ids: text[] not null default '{}'
- custom_activity: text nullable
- status: draft | collecting | confirming | confirmed | closed
- created_at: timestamptz not null
- updated_at: timestamptz not null

Indexes:
- host_user_id
- status
- created_at

### invite_links

Purpose:
Shareable guest entry point.

Fields:
- id: uuid primary key
- meeting_id: uuid references meetings(id)
- token_hash: text unique not null
- access_mode: link_anyone | approval_required
- max_responses: int nullable
- expires_at: timestamptz nullable
- is_closed: boolean not null default false
- duplicate_guard_mode: nickname | browser | device | none
- created_at: timestamptz not null
- updated_at: timestamptz not null

Indexes:
- meeting_id
- token_hash unique
- expires_at
- is_closed

### meeting_responses

Purpose:
Guest response record.

Fields:
- id: uuid primary key
- meeting_id: uuid references meetings(id)
- invite_link_id: uuid references invite_links(id)
- nickname: text not null
- attendance: yes | maybe | no
- attendance_message: text nullable
- date_labels: text[] not null default '{}'
- suggested_date_labels: text[] not null default '{}'
- time_labels: text[] not null default '{}'
- place_candidate: text nullable
- activity_ids: text[] not null default '{}'
- custom_activity: text nullable
- request_note: text nullable
- source: guest_web | app
- idempotency_key: text not null
- created_at: timestamptz not null
- updated_at: timestamptz not null

Indexes:
- meeting_id
- invite_link_id
- idempotency_key unique
- attendance
- created_at

### confirmed_plans

Purpose:
Final confirmed plan for a meeting.

Fields:
- id: uuid primary key
- meeting_id: uuid references meetings(id) unique
- date_label: text nullable
- time_label: text nullable
- place_name: text nullable
- activity_labels: text[] not null default '{}'
- confirmed_by: uuid nullable
- confirm_source: recommended | manual
- reason: text nullable
- created_at: timestamptz not null
- updated_at: timestamptz not null

Indexes:
- meeting_id unique
- confirm_source

### participants view

Purpose:
Derived participant list for cards and confirmed share.

Source:
meeting_responses where attendance in ('yes', 'maybe').

Fields:
- response_id
- meeting_id
- name
- attendance
- created_at

## 18. Invite Link Response Flow

1. Host completes create flow.
2. App creates meeting.
3. App creates invite_link with raw token.
4. Backend stores only token_hash.
5. ShareScreen generates public invite URL.
6. Guest opens /invite/:meetingId/:token.
7. Backend validates meeting exists.
8. Backend validates invite link exists.
9. Backend compares token hash.
10. Backend checks is_closed is false.
11. Backend checks expires_at is not passed.
12. Backend checks max_responses is not exceeded.
13. Guest submits response.
14. Backend checks idempotency_key.
15. If duplicate, existing response is returned.
16. If new, meeting_response is inserted.
17. Dashboard fetches responses by meeting_id.
18. Host confirms selected plan.
19. ConfirmedPlan is upserted by meeting_id.
20. ConfirmedShareScreen loads confirmed plan by meeting_id.

Prototype today:
- localMeetingRepository simulates this flow in one browser.
- There is no server validation.
- There is no cross-device sync.

## 19. Confirmed Plan Persistence Plan

Current:
- ConfirmPlanScreen calls repository.confirmPlan.
- localMeetingRepository stores ConfirmedPlan in localStorage.
- ConfirmedShareScreen reads ConfirmedPlan by meetingId.

Backend target:
- confirmed_plans.meeting_id must be unique.
- confirmPlan should upsert by meeting_id.
- confirming a plan should update meetings.status to confirmed.
- ConfirmedShareScreen should never depend on route state.
- ConfirmedShareScreen should load ConfirmedPlan by meetingId.
- Future edit/history can store plan revisions separately.

Failure states:
- No confirmed plan found
- Meeting not found
- Permission denied
- Network error
- Confirmed plan conflict

## 20. Server-only AI Policy

Principle:
AI copy/recommendation features must never expose API keys to the browser bundle.

Current:
- GEMINI_API_KEY client define was removed from vite.config.ts.
- package.json still includes AI/server-related dependencies that need audit.
- Rule-based invite copy remains the local fallback.

Allowed:
- Client may request recommendations from a backend endpoint.
- Backend may call AI providers.
- Backend owns API keys.
- Client may render AI-generated copy returned by trusted backend.

Forbidden:
- Importing @google/genai in client screens/components.
- Injecting AI API keys through Vite define.
- Storing AI API keys in public env variables.
- Calling AI provider directly from browser code.

Future:
- Move AI features to server-only route or Supabase Edge Function.
- Add request/response contract for contextual invite copy.
- Keep rule-based invite copy as offline fallback.

## 21. Dependency Audit

Current risk:
- @google/genai appears in package dependencies.
- dotenv appears in package dependencies.
- express appears in package dependencies.
- These are server/AI related and should not be used by browser screens.

Current mitigation:
- GEMINI_API_KEY is not injected through Vite define.
- Client screens should not import @google/genai.
- Backend repository skeleton does not create a Supabase client yet.

Next:
- Search for actual imports.
- If unused, remove from client package.
- If needed, split server package or move to API route.
- Add CI check to prevent AI API key exposure.

Audit search:
- @google/genai imports: package.json, package-lock.json only
- dotenv imports: package.json, package-lock.json only
- express imports: package.json, package-lock.json only
- GEMINI_API_KEY references: .env.example, task.md, result.md only
- VITE_SUPABASE references: src/vite-env.d.ts, src/lib/supabaseClient.ts, task.md, result.md
- createClient references: src/lib/supabaseClient.ts only
- SUPABASE_SERVICE / SERVICE_ROLE references: documentation only, no client env definition

Audit update:
- @supabase/supabase-js is installed for the upcoming backend adapter.
- createClient is allowed only in src/lib/supabaseClient.ts.
- service role keys must never be exposed to client code.

---

## Backend Repository Query Mapping

### createMeetingWithInviteLink

Input:
- CreateMeetingDraft

Writes:
- meetings
- invite_links

Output:
- MeetingRecord
- InviteLink
- inviteUrlPath

Important:
- Raw invite token is returned to client once for share URL.
- Backend should store token_hash, not raw token.
- Current client-only Supabase adapter cannot safely hash/verify secrets server-side. Server/edge function is required for production-grade token validation.

### getMeetingByInvite

Input:
- meetingId
- raw token

Reads:
- invite_links by meeting_id
- meetings by id

Checks:
- token hash match
- is_closed false
- expires_at not passed

Output:
- MeetingRecord
- InviteLink

### getMeetingResponses

Input:
- meetingId

Reads:
- meeting_responses where meeting_id = meetingId

Output:
- MeetingResponse[]

### submitGuestResponse

Input:
- meetingId
- inviteToken
- response draft
- idempotencyKey

Writes:
- meeting_responses

Checks:
- invite link validity
- idempotency_key duplicate
- maxResponses
- duplicateGuard

Output:
- responseId
- saved

### confirmPlan

Input:
- meetingId
- selectedPlan
- confirmSource

Writes:
- confirmed_plans upsert by meeting_id
- meetings.status = confirmed

Output:
- ConfirmedPlan

### getConfirmedPlan

Input:
- meetingId

Reads:
- confirmed_plans where meeting_id = meetingId

Output:
- ConfirmedPlan | null

---

## 22. Phase V — Invitation Motion & Viral Share Core

Goal:
Make the invitation itself the product's strongest viral asset.

Current Product Truth:
When We Meet's strongest differentiator is not calendar records alone.
The core strength is a short invitation-opening motion plus a polished response UI.

Completed:
- [x] Define invitation motion as P0 product signature
- [x] Add static OG metadata
- [x] Add invitation opening motion component
- [x] Connect invitation motion to guest landing
- [x] Add invitation motion preview to host preview
- [x] Add invite share card / image share flow
- [x] Add guest complete "create my own invite" CTA

Not Completed:
- [ ] Dynamic meeting-specific OG image
- [ ] Kakao SDK share
- [ ] Real backend invite/response sync
- [ ] Invite video MP4 export
- [ ] Native app share sheet polish

---

## P0 Launch Blockers

1. Backend sync for guest responses
2. Static OG tags and og.jpg
3. Invite share card image export
4. Guest complete → create my own invite CTA
5. Home/Meetings mock data removal
6. ConfirmedShare real share / .ics fallback

**Note:** Our Calendar is a retention and data asset layer. Invitation Motion is the acquisition and viral layer. Do not position calendar records as the first marketing hook before invite motion is polished.

## 23. Immediate Next Tasks

### Product & Acquisition Track (P0)
1. Phase F-4 — Backend Repository Implementation
2. Phase V-1 — Invite Video/OG Polish
3. Phase G-1 — BrowserRouter + Hosting Rewrite

### GTM Track
1. Phase M-1 — Landing Page & App Store Asset Draft
2. Phase M-2 — App Onboarding Copy & Screens
3. Phase M-3 — Share Card Template System

### Retention & Calendar Track
1. Phase H-4 — Calendar Records Backend & Privacy Model
2. Phase H-5 — Memo Recommendation Refinement
