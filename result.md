# 작업지시서 제목
When We Meet Phase M-0: 제품 포지셔닝, 마케팅 메시지, 카피 시스템, 성장 전략 기준문서 구축

## 작업 결과

### 1. 수정 파일
- `task.md`
- `README.md` (신규 파일 및 수정)
- `docs/product-positioning.md` (신규 파일)
- `docs/marketing-brief.md` (신규 파일)
- `docs/copy-system.md` (신규 파일)
- `docs/growth-strategy.md` (신규 파일)
- `docs/analytics-taxonomy.md` (신규 파일)
- `src/screens/guest/GuestDateVoteScreen.tsx`
- `src/screens/guest/GuestPlacePreferenceScreen.tsx`
- `src/screens/host/DatePickerScreen.tsx`

### 2. 주요 변경
- PM 및 마케팅 얼라인먼트를 위한 제품 포지셔닝(`docs/product-positioning.md`) 작성.
- 메인 메시지와 서브 메시지, 코어 키워드 등을 정리하여 마케팅 포인트를 구축함 (`docs/marketing-brief.md`).
- 앱 내부 카피 시스템의 기준을 명확하게 하고 "초대장", "우리 달력", "가볍게"와 같은 일관된 언어를 사용하기 위한 톤 가이드 작성 (`docs/copy-system.md`).
- 향후 데이터 레이어 확장, 추천 엔진 강화 모델 및 마케팅 액션을 명문화한 성장/수익화 전략 문서 도출 (`docs/growth-strategy.md`).
- 실제 SDK 연동 전 단계로써, 향후 이 프로젝트에서 사용될 Analytics Event 목록들을 사전 정의(`docs/analytics-taxonomy.md`).
- 단조로운 날짜 투표 앱 대신 '모임 만들기 기반의 초대장 제작 앱'으로의 비전을 설명하는 README 포지셔닝 내용 업데이트.
- Guest의 응답 강제성을 조금 더 부드럽게 완화하기 위해 `GuestDateVoteScreen`과 기타 참여 화면의 복잡성을 낮추는 방향으로 일부 문구 수정 및 버튼 CTA("다음 · 만날 곳 고르기", "다음 · 마지막으로") 구체화.
- Host DatePickerScreen의 제목 하단에 부담을 낮추는 안내 문구("가능한 날들을 가볍게 골라보세요") 추가.

### 3. 빌드
- npm run lint: 통과 (에러 없음)
- npm run build: 통과 (성공)

### 4. 남은 이슈
- 마케팅 문서 및 가이드는 작성 완료되었으나, 이를 실제 랜딩 페이지나 앱스토어 소개 이미지/설명글 캡처 등 실물 에셋으로는 아직 치환하지 않은 상태. (향후 단계로 이관)

### 5. 다음 작업
1. Phase M-1 — Landing Page & App Store Asset Draft (가상 랜딩/마케팅 페이지 구성).
2. Phase H-4 — Calendar Records Backend & Privacy Model (calendar_memos 스키마, calendar_memo_links 모델 등 백엔드 설계).
3. Phase F-4 — Backend Repository Implementation.

### 6. 검증 검색 결과
- 날짜 투표 references: `task.md`와 `README.md`에서 부정적인 맥락(Not this) 위주로 확인됨. 앱 내에서는 최소한으로 노출.
- 초대장 references: `InviteLandingScreen`, `ShareScreen`, `InvitePreviewScreen`, `HomeScreen`, `ReceivedInviteCard` 등 코어 경험 전반에 걸쳐 사용됨.
- 우리 달력 references: `CalendarTabScreen`, `shareImage`, `OurCalendarShareCard` 등 주요 기능에 반영됨.
- 기록 references: `OurCalendarShareCard`, `CalendarRecordDrawer`, `MeetingInfoScreen`, `CalendarTabScreen` 등에서 저장/조회 관련하여 활용.
- 공유 references: `ShareScreen`, `ConfirmedShareScreen` 등 외부로의 연결고리에 위치함.
- 추천 references: `PlaceSetupScreen`, `ActivitySetupScreen`, `InvitePreviewScreen`, `calendarMemoRecommendations.ts` 등에 적극 반영됨.
- 준비 중 references: 모임 성격 튜닝 관련 `locationOptions`, `MyPageScreen`, `ConfirmedShareScreen`의 카톡 공유 영역 등에 남김.
- alert references: "준비 중" 표시나 클립보드 복사 등 시스템 팝업 4건 외에 잘못된 용례는 없음.
- When We Meet references: `task.md`, `OurCalendarShareCard`, `README.md` 및 생성한 `docs/` 내 여러 문서에서 브랜딩 네이밍으로 잘 쓰이고 있음.
- react-example references: `package.json`에서 발견되지 않음 (`when-we-meet`으로 픽스 확인).
- analytics SDK added: 코드 내에 실제 SDK 추가 코드를 심지 않았고 문서에만 정의함.
- ad SDK added: 코드 내에 실제 SDK 추가 코드를 심지 않았고 문서에만 정의함.