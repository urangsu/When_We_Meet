# 작업지시서 제목
When We Meet Phase H-3 Super Sprint: 우리 달력 기록 엔진, 모임 생성 컨텍스트, 추천 문구/장소/활동 자동 반영

## 작업 결과

### 1. 수정 파일
- `src/types/meeting.ts`
- `src/state/CreateMeetingDraftContext.tsx`
- `src/screens/host/DatePickerScreen.tsx`
- `src/utils/calendarMemoRecommendations.ts` (신규 파일)
- `src/screens/host/MeetingInfoScreen.tsx`
- `src/screens/host/PlaceSetupScreen.tsx`
- `src/screens/host/ActivitySetupScreen.tsx`
- `src/screens/host/InvitePreviewScreen.tsx`
- `src/utils/ourCalendar.ts`
- `task.md`
- `result.md`

### 2. 주요 변경
- `CreateMeetingDraft` 타입에 `attachedCalendarMemoTags`, `attachedCalendarMemoDateKeys` 필드 추가 및 상태 연동.
- 룰베이스의 로컬 달력 기록 기반 추천 유틸리티(`getCalendarMemoRecommendations`) 신규 추가. 한강, 카페, 식사 등 조건에 따른 장소/활동/초대 문구 힌트 반환.
- `DatePickerScreen`에서 `attachedCalendarMemoTags`, `attachedCalendarMemoDateKeys` 업데이트 연동.
- `MeetingInfoScreen`에 첨부된 달력 기록 표시 뷰 강화.
- `PlaceSetupScreen`에서 달력 기록 기반 장소 힌트 칩셋 UI 제공 및 선택 기능 적용.
- `ActivitySetupScreen`에서 달력 기록 기반 활동 힌트 영역 제공 및 custom input 연동.
- `InvitePreviewScreen`에 달력 기록으로 추천된 초대 문구 목록 제공, 바로 클릭해서 모임 메시지에 덮어쓸 수 있도록 연계.
- 기존의 임시 `getMemoSuggestionText` 제거 후 컨텍스트 기반 추천으로 완전 통합.

### 3. 빌드
- npm run lint: 통과 (코드 내 tsc --noEmit 에러 없음)
- npm run build: 통과 (번들 생성 완료)

### 4. 남은 이슈
- 달력 기록(Calendar Memo)은 여전히 브라우저의 `localStorage` 기반.
- 백엔드(Supabase 등) `calendar_memos` 테이블 구성 및 API 연결, 인증 정보 연동은 다음 단계에서 진행해야 함.
- Native Kakao SDK를 통한 공유 카드, OG tag 구성 구현 대기.

### 5. 다음 작업
1. Phase H-4 — Calendar Records Backend & Privacy Model (calendar_memos 스키마, calendar_memo_links 연결, 백엔드 리포지토리 인터페이스 구성 방안 마련)
2. Phase F-4 — Backend Repository Implementation
3. Phase F-5 — Server-side Invite Validation (초대장/아이디 중복 검증 서버 연동)

### 6. 검증 검색 결과
- alert 기반 기록 적기: 검색 결과 발견되지 않음.
- CalendarRecordDrawer: 존재하며 CRUD 이벤트 정상 연결 확정.
- createCalendarMemo: `ourCalendarRepository` 인터페이스 및 `localOurCalendarRepository`에서 확인.
- updateCalendarMemo: 포함.
- deleteCalendarMemo: 포함.
- localStorage calendar memo key: `wwm:our-calendar:memos:v1` 사용 확인됨.
- opacity-0 in share capture: CalendarTabScreen에서 `opacity-0` 제거되어 화면 밖 `left-[-10000px]`로 숨기는 캡처 전용 DOM 확정됨.
- calendar/shared references: 존재하지 않음.
- SharedCalendarScreen references: 존재하지 않음.
- localOurCalendarRepository direct imports in screens: 0건. (의존성 주입 패턴 준수)
- attachedCalendarMemoIds: `CreateMeetingDraft`에서 사용 중.
- attachedCalendarMemoNotes: 추천 엔진 및 `MeetingInfoScreen` 등에서 정상 표출.
- attachedCalendarMemoTags: DatePickerScreen에서 추가하며 `Place`, `Activity` 파싱 등에 재료로 사용.
- memo recommendation utility: `src/utils/calendarMemoRecommendations.ts`에 생성.
- PlaceSetupScreen calendar memo hints: `placeRecommendations` 변수 및 UI 확인.
- ActivitySetupScreen calendar memo hints: `activityRecommendations` 변수 및 UI 확인.
- InvitePreviewScreen copy recommendations: `copyRecommendations` 변수 확인 및 클릭 시 `updateDraft({ hostMessage: item.label })` 호출부 확인.