# When We Meet Development Roadmap

## 0. Product North Star

When We Meet은 단순 날짜 투표 앱이 아니라,
친구들과 언제, 어디서, 몇 시에, 무엇을 할지까지 자연스럽게 정하는 모임 결정 플랫폼이다.

장기적으로는 로컬 장소/축제/콘텐츠 추천, 초대장 기반 공유, 광고/제휴, 글로벌 영어판까지 확장한다.

---

## 1. Current Status

### Completed
- React Router / HashRouter 기반 라우팅
- Host App / Guest Web 레이아웃 분리
- BottomNav 4탭 구조
- 플러스 버튼 제거
- Home / Meetings / Calendar / My Page 기본 탭
- MeetingSummaryCard 공통화
- InitialAvatar / InitialAvatarGroup 공통화
- Profile color options
- Guest RSVP 기본 플로우
- Date candidate picker mock
- Debug overlay 기본 숨김
- Response aggregation logic
- Host dashboard ranking summaries

### Known Limitations
- 실제 DB 저장 없음
- 실제 캘린더 연동 없음
- 장소/시간/활동 선택은 프론트엔드 메모리 기반 프로토타입
- 실제 확정 plan 저장은 추후 구현
- 홈/모임 콘텐츠 피드 미구현
- 지도/GPS/자동완성 없음
- i18n 미구현

---

## 2. Phase A — Foundation

Goal:
앱의 기본 구조, 라우팅, 하단 탭, 카드 시스템, 타입 구조를 안정화한다.

Tasks:
- [x] Host / Guest route split
- [x] BottomNav remove create plus button
- [x] Add Home / Meetings / Calendar / My Page tabs
- [x] Unify meeting cards
- [x] Simplify initial avatar system
- [x] Separate Meeting types from mock data
- [x] Clean Card accessibility
- [x] Stabilize CalendarTab date data

Exit Criteria:
- 모든 기본 탭이 동작한다.
- Home과 Meetings가 같은 카드 시스템을 사용한다.
- mock data와 domain type이 분리된다.
- B단계 기능 추가 전에 구조 부채가 없다.

---

## 3. Phase B — Meeting Decision Flow

Goal:
날짜만 정하는 앱이 아니라, 장소/시간/하고 싶은 것까지 정하는 모임 결정 플로우를 만든다.

Tasks:
- [x] Add PlaceSetupScreen
- [x] Add LocationMode type
- [x] Add place modes:
  - 장소 미정
  - 내가 정해둘게요
  - 친구들에게 후보 받기
  - 나중에 추천받기
- [x] Add activity options
- [x] Add guest place/activity preference screen
- [x] Add time candidate step
- [x] Add ConfirmPlanScreen
- [x] Add ConfirmedShareScreen
- [x] Stop routing Dashboard confirmation directly to PostMeeting

Prototype Note:
현재 CreateMeetingDraft와 GuestResponseDraft는 프론트엔드 메모리 상태만 사용한다. 새로고침 시 초기화되며, 실제 DB 저장 기능은 추후 연동 시 반영한다.

---

## 4. Phase C — Guest Experience

Goal:
게스트가 앱 설치 없이 초대장을 받고, 쉽고 재미있게 응답하게 만든다.

Tasks:
- [x] Improve invite landing animation placeholder
- [x] Add acceptance message presets
- [x] Add decline message presets
- [x] Add place candidate suggestion
- [x] Add activity preference vote
- [x] Add response completion card
- [x] Add app-save/create-own-meeting CTA
- [x] Add unopened received invite letter UX
- [x] Add simple sealed-invite tap feedback
- [x] Add received invite delete/manage mode

---

## 5. Phase D — Host Decision Dashboard

Goal:
호스트가 받은 응답을 집계하고 약속을 실제 확정할 수 있는 대시보드를 만든다.

Tasks:
- [x] Define MeetingResponse data model
- [x] Add mock response dataset
- [x] Add response aggregation utility
- [x] Improve Host Dashboard with ranking summaries
- [x] Add recommended plan card
- [x] Add participant list popup from +N avatar group
- [x] Keep participant popup read-only
- [ ] Persist responses in DB
- [ ] Connect real invite link responses
- [ ] Save confirmed plan to DB

---

## Meeting Response Data Model

MeetingResponse는 Guest Web 또는 App에서 들어온 응답을 저장하기 위한 기본 단위다.

Fields:
- attendance
- attendanceMessage
- dateLabels
- suggestedDateLabels
- timeLabels
- placeCandidate
- activityIds
- customActivity
- requestNote
- source
- createdAt / updatedAt

Prototype:
현재는 mockResponses 기반이다.
실제 DB 저장은 추후 Supabase/Firebase 연동 단계에서 구현한다.

## Aggregation Strategy

Principle:
- yes 응답은 1점
- maybe 응답은 0.5점
- no 응답은 날짜/시간/장소/활동 집계에서 제외
- suggestedDateLabels도 날짜 후보로 포함한다
- 최종 추천안은 score가 가장 높은 날짜/시간/장소/활동 조합으로 만든다

Future:
- 인원 가중치
- 호스트 우선순위
- 일정 충돌
- 캘린더 busy 상태
- 장소 거리
- 날씨
- 광고/추천 가능성

---
... (The rest of the document remains unchanged, keeping 10-11 for historical reference)

---

### Phase B 2nd QA — Draft Integrity
- [x] Connect category / recurring to CreateMeetingDraft
- [x] Connect guest nickname to GuestResponseDraft
- [x] Fix invalid hostColorId default
- [x] Map activity IDs to labels in confirmation screens
- [x] Remove remaining loose any types
- [x] Add guest complete summary

### Phase B Final QA
- [x] Add host activity selection step
- [x] Connect ConfirmPlan edit buttons
- [x] Fix B-stage draft integrity issues
- [x] Persist host custom activity
- [x] Display custom activity in preview/confirm/share
- [x] Display guest custom activity in complete screen

## Invite Link Policy

MVP sharing principle:
초대 링크는 카카오톡 단톡방, 인스타 DM, 문자 등 어디에나 공유될 수 있다.
링크를 가진 사람은 앱 설치 없이 Guest Web에서 응답할 수 있다.

Access modes:
- link_anyone: 링크를 가진 사람은 누구나 응답 가능
- approval_required: 호스트 승인 후 참여 가능, 추후 구현

Safety limits:
- maxResponses: 링크당 최대 응답 수
- expiresAt: 링크 만료일
- isClosed: 호스트가 링크 닫기 가능
- duplicateGuard: 닉네임/기기/브라우저 기준 중복 응답 방지
- hostCanDeleteResponse: 호스트가 잘못된 응답 삭제 가능

Prototype:
현재는 link_anyone 정책을 가정하되, 실제 제한 로직은 DB 연동 후 구현한다.

## Share Channel Policy

MVP:
- Copy link
- OS share sheet
- KakaoTalk share via user action
- Instagram DM copy text

Important:
MVP에서는 앱이 자동으로 카톡방이나 인스타 DM에 메시지를 발송하지 않는다.
사용자가 직접 공유 대상을 선택하거나 링크를 복사해 보낸다.

Kakao:
카카오톡 공유는 Kakao Share SDK로 구현한다.
사용자가 직접 공유 대상 채팅방을 선택한다.

Instagram:
인스타그램 DM은 MVP에서 자동 발송하지 않고, 공유 문구 복사/OS share 중심으로 처리한다.

## Notification Policy

Notification types:
- 새 초대장을 받았어요
- 친구가 응답했어요
- 모두 응답했어요
- 모임이 확정됐어요
- 오늘은 모임이 있는 날이에요
- 모임 1시간 전이에요
- 아직 응답하지 않은 초대장이 있어요
- 추천/이벤트 알림

Settings:
- 전체 알림
- 초대장 알림
- 응답 알림
- 확정 알림
- 모임 당일 알림
- 추천/이벤트 알림

Principle:
사용자가 불편하지 않도록 추천/이벤트 알림은 별도 토글로 분리한다.
전체 알림을 끄면 모든 알림이 꺼진다.
중요 알림과 마케팅성 알림은 분리한다.

## 4. Phase C — Guest Experience

Goal:
게스트가 앱 설치 없이 초대장을 받고, 쉽고 재미있게 응답하게 만든다.

Tasks:
- [ ] Improve invite landing animation placeholder
- [x] Add acceptance message presets
- [x] Add decline message presets
- [x] Add place candidate suggestion
- [x] Add activity preference vote
- [ ] Add response completion card
- [ ] Add app-save/create-own-meeting CTA
- [x] Add unopened received invite letter UX
- [x] Add simple sealed-invite tap feedback
- [ ] Add full open-envelope motion after mobile QA
- [x] Add received invite delete/manage mode
- [ ] Consider swipe-to-delete after mobile QA

---

## 5. Phase D — Local Content / Discovery

Goal:
홈 또는 모임 탭을 로컬 콘텐츠와 장소 발견 영역으로 확장한다.

Ideas:
- 요즘 어디서 만나?
- 요즘 만나서 뭐해?
- 뭐 먹지?
- 주변 핫한 모임 장소
- 이번 주 팝업/축제
- 친구랑 가기 좋은 장소
- 블로그형 추천 글
- AD / 제휴 콘텐츠
- curated board

Important:
초기에는 자유 게시판이 아니라 운영자/큐레이션 콘텐츠로 시작한다.
유저 게시판, 소모임, 동네 커뮤니티는 후기 단계에서 검토한다.
Local Content / Discovery는 당장 구현하지 않는다.
홈/모임 탭에 콘텐츠 피드를 넣는 방향은 추후 콘텐츠 운영 구조가 생긴 뒤 검토한다.

---

## 6. Phase E — Map / GPS / Recommendation

Goal:
위치 기반으로 장소 후보와 주변 행사를 추천한다.

Ideas:
- GPS 기반 동네 자동 인식
- 지도에서 좌표 찍기
- 장소 자동완성
- 주변 행사 추천
- “이 근처에서 이런 건 어때요?”
- Naver Map / Google Places 연동
- 추천받기 기능

Do Not Build Yet:
- 실제 지도 API
- 자동완성
- GPS permission flow
- 추천 알고리즘

---

## 7. Phase F — Fun / Viral Features

Ideas:
- 뭐 먹지 룰렛
- 초대장 안에서 랜덤 선택
- 친구들이 후보 넣고 룰렛 돌리기
- 결과를 확정 카드에 반영
- 공유용 이미지 카드

---

## 8. Phase G — Monetization

Ideas:
- 장소 추천 AD
- 팝업/축제 홍보 글
- 제휴 식당/카페
- 예약 링크
- 쿠팡/준비물 추천
- 프리미엄 초대장 테마
- B2B 워크숍/팀빌딩

Principle:
광고는 배너가 아니라 “모임 준비에 자연스럽게 필요한 정보”처럼 보여야 한다.

---

## 9. Phase H — Global / i18n

Goal:
한국어 버전 이후 영어판 social planning app으로 확장할 수 있게 준비한다.

Tasks:
- [ ] Extract copy into i18n files
- [ ] Add language toggle
- [ ] Korean / English invite copy
- [ ] Guest response localization
- [ ] Activity/location option localization

---

## Product Signature

When We Meet의 핵심 차별점:
- 초대장을 받는 감각
- 부담 없는 답장
- 날짜/시간/만날 곳/뭐 할지까지 이어지는 결정
- 확정 후 기다림을 만드는 카드와 알림
- 모임 데이터 기반 추천/콘텐츠/광고 확장성

## Data Asset Strategy

Future aggregate data:
- 많이 선택된 모임 카테고리
- 인기 활동
- 선호 시간대
- 선호 날짜 유형
- 만날 곳 후보 유형
- 지역/장소 추천 클릭
- 확정률
- 응답 완료율

Principle:
개인 메시지나 민감한 응답을 직접 광고 타깃팅에 사용하지 않는다.
초기에는 익명화/집계 데이터 기반으로 콘텐츠, SEO, 추천, 광고 전략을 만든다.

## SEO / Ads Potential
향후 로컬 모임/장소/축제 데이터를 기반으로 로컬 검색 SEO 확보.
확정된 모임 정보의 일부를 익명화하여 콘텐츠 자산화.
제휴 장소, 예약 서비스 등과 연결하여 B2B 모델 확장.

---

## Contextual Invite Copy

Principle:
초대 문구는 날짜, 시간대, 만날 곳, 활동에 따라 달라질 수 있다.
단, 받는 사람이 부담을 느끼지 않도록 “가볍게”, “괜찮으면”, “편한 날” 톤을 유지한다.

Examples:
- 한강 + 산책: 괜찮으면 한강에서 가볍게 바람 쐬러 갈까요?
- 한강 + 식사: 한강에서 라면이나 치킨 먹으면서 쉬어가도 좋아요.
- 카페 + 수다: 편한 날 카페에서 가볍게 이야기 나눠요.
- 평일 후보만 있음: 이번 주 중에 편한 날 골라주세요.
- 주말 후보 있음: 이번 주말, 같이 시간 맞춰볼까요?

Prototype:
현재는 규칙 기반 추천만 사용한다.
실제 AI/LLM 문구 생성은 추후 검토한다.

## Product Signature

When We Meet의 핵심 차별점:
- 초대장을 받는 감각
- 부담 없는 답장
- 날짜/시간/만날 곳/뭐 할지까지 이어지는 결정
- 확정 후 기다림을 만드는 카드와 알림
- 모임 데이터 기반 추천/콘텐츠/광고 확장성

## Data Asset Strategy

Future aggregate data:
- 많이 선택된 모임 카테고리
- 인기 활동
- 선호 시간대
- 선호 날짜 유형
- 만날 곳 후보 유형
- 지역/장소 추천 클릭
- 확정률
- 응답 완료율

Principle:
개인 메시지나 민감한 응답을 직접 광고 타깃팅에 사용하지 않는다.
초기에는 익명화/집계 데이터 기반으로 콘텐츠, SEO, 추천, 광고 전략을 만든다.

---

## 10. Theme Roadmap

### Default — Soft Social
- Warm ivory background
- Muted rose primary
- Soft card shadows
- Friendly Korean copy
- Target: 20-35 social planning users

### Future — Calm Utility
- Lower saturation green/blue-gray primary
- More neutral copy
- Less decorative motion
- Stronger information hierarchy
- Target: users who prefer practical, low-emotion planning UX

### Future — Editorial Mono
- Black and white editorial invitation style
- Strong typography
- Thin borders
- Minimal shadows
- Reduced radius
- Target: premium / gender-neutral / formal invite use cases

Implementation note:
현재는 테마 로드맵만 기록한다.
실제 theme switching, dark mode, user preference 저장은 추후 구현한다.

---

## 11. Immediate Next Tasks

1. Start Phase C — Guest Experience
   - Improve invite landing animation placeholder
   - Add stronger response completion card
   - Add app-save/create-own-meeting CTA
   - QA guest yes / maybe / no branch flows

2. Phase B/C Watchlist
   - Small-screen layout QA
   - BottomCTA overlap QA
   - Preview sync QA
   - Verify guest draft persistence through the complete flow
   - Keep Phase D Discovery as roadmap only

## Phase E — Product Reliability P0 Recovery

Goal:
Move from visual prototype to minimally trustworthy invite-link product flow.

Tasks:
- [x] Make share URL HashRouter-safe
- [x] Preserve meetingId/token through all Guest routes
- [x] Remove Guest screen /invite/demo hardcoded navigation
- [x] Add MeetingRepository contract
- [x] Add localStorage-backed repository Prototype
- [x] Persist MeetingRecord locally
- [x] Persist InviteLink locally
- [x] Persist GuestResponse locally
- [x] Persist ConfirmedPlan locally
- [x] Add CreateMeetingDraft autosave
- [x] Make Dashboard read responses by meetingId
- [x] Remove Guest screen /invite/demo hardcoded navigation
- [ ] Replace local repository with Supabase/Firebase repository
- [ ] Add server-side invite token validation
- [x] Remove mock repository usage from DashboardScreen
- [x] Remove mock repository usage from GuestCompleteScreen
- [x] Remove mock repository usage from ConfirmPlanScreen
- [x] Remove mockResponses direct import from ConfirmPlanScreen
- [x] Connect ConfirmedShareScreen to saved ConfirmedPlan
- [x] Add idempotency guard to localMeetingRepository
- [x] Make confirmPlan upsert by meetingId
- [x] Remove /app/meetings/demo/confirm hardcode from DashboardScreen
- [x] Fix ConfirmedShareScreen participants empty array
- [x] Add GuestInviteContext
- [x] Remove useCreateMeetingDraft from GuestDateVoteScreen
