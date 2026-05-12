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
- 장소 설정 플로우 미구현
- 시간 후보 선택 미구현
- 확정 카드 공유 플로우 미구현
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
- [ ] Add PlaceSetupScreen
- [ ] Add LocationMode type
- [ ] Add place modes:
  - 장소 미정
  - 내가 정해둘게요
  - 친구들에게 후보 받기
  - 나중에 추천받기
- [ ] Add activity options
- [ ] Add guest place/activity preference screen
- [ ] Add time candidate step
- [ ] Add ConfirmPlanScreen
- [ ] Add ConfirmedShareScreen
- [ ] Stop routing Dashboard confirmation directly to PostMeeting

---

## 4. Phase C — Guest Experience

Goal:
게스트가 앱 설치 없이 초대장을 받고, 쉽고 재미있게 응답하게 만든다.

Tasks:
- [ ] Improve invite landing animation placeholder
- [ ] Add acceptance message presets
- [ ] Add decline message presets
- [ ] Add place candidate suggestion
- [ ] Add activity preference vote
- [ ] Add response completion card
- [ ] Add app-save/create-own-meeting CTA

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

1. Finish Phase A QA
   - Meeting types
   - Card accessibility
   - Calendar dateKey

2. Start Phase B
   - PlaceSetupScreen
   - Guest place/activity preference
   - ConfirmPlanScreen
   - ConfirmedShareScreen
