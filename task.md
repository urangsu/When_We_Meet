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

### Known Limitations
- 실제 DB 저장 없음
- 실제 캘린더 연동 없음
- 장소/시간/활동 선택은 프론트엔드 메모리 기반 프로토타입
- 장소 후보/시간 후보의 실제 집계 미구현
- 확정 카드 공유는 placeholder alert
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

## 10. Immediate Next Tasks

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
