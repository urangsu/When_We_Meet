# 작업지시서 제목
When We Meet Phase H-2 Mega: 달력 기록 CRUD, 모임 생성 연결, 초대장 컨텍스트 자동 반영, 이미지 공유 안정화

## 작업 결과

### 1. 수정 파일
- `src/components/calendar/CalendarRecordDrawer.tsx` (기존 작업)
- `src/screens/host/CalendarTabScreen.tsx`
- `src/components/meeting/CalendarDayCell.tsx`
- `src/repositories/ourCalendarRepository.ts`
- `src/repositories/localOurCalendarRepository.ts`
- `src/types/meeting.ts`
- `src/state/CreateMeetingDraftContext.tsx`
- `src/components/meeting/CalendarCandidatePicker.tsx`
- `src/screens/host/DatePickerScreen.tsx`
- `src/screens/host/MeetingInfoScreen.tsx`
- `src/screens/host/InvitePreviewScreen.tsx`
- `src/utils/ourCalendar.ts`
- `task.md`
- `result.md`

### 2. 주요 변경
- `CalendarRecordDrawer` 구현 및 달력 월간 뷰 `CalendarTabScreen` 연동 기능 확립.
- `OurCalendarRepository` 및 `localOurCalendarRepository` (localStorage)를 통한 CRUD API 구현.
- `CalendarDayCell` 구조를 `button` 내 `div`/`event.stopPropagation()`에서 분리된 `<div>` absolute z-index 오버레이 구조로 개선.
- 이미지 공유 시 캡처되는 컴포넌트를 `opacity-0`가 아닌 화면 바깥(left-[-10000px])으로 보내 랜더링 및 사용자 클릭 미스 방지.
- `CreateMeetingDraft` 타입에 `attachedCalendarMemoIds`, `attachedCalendarMemoNotes` 상태 추가 및 CreateMeetingDraftContext 연계.
- 일시 결정 화면 (`DatePickerScreen`, `CalendarCandidatePicker`)에서 날짜 선택시 달력 메모 조회와 그 기록을 '이번 모임에 참고'할 수 있는 기능 추가.
- `MeetingInfoScreen`에 추가한 메모의 내용(notes) 표시 및 태그 정보 기반 추천 문구(`getMemoSuggestionText`) 반영.
- `InvitePreviewScreen`에 모임원들에게 '참고한 달력 기록'이라는 항목으로 메모 컨텍스트 요약 카드 표시 추가.

### 3. 빌드
- npm run lint: 통과
- npm run build: 통과

### 4. 남은 이슈
- 달력 기록(Calendar Memo)은 여전히 브라우저의 `localStorage` 기반으로 돌아가는 상태이므로 실제 서버의 사용자 계정 연동이나 모임 간 공유에는 백엔드 작업이 수반되어야 합니다.
- KakaoTalk 브라우저 연동 기능 및 서버에서 제공하는 OG Image 형태의 링크공유 지원 여부 확인(추후 G, H 단계).

### 5. 다음 작업
1. Phase H-3 — Calendar Records Backend & Recommendation Layer (calendar_memos 스키마 생성 및 백엔드 Repositoy 이관, 추천 매핑)
2. Phase F-4 — Backend Repository Implementation
3. Phase F-5 — Server-side Invite Validation (초대장/아이디 중복 검증 서버 연동)

### 6. 검증 검색 결과
- `alert('기록 작성`: 발견되지 않음 (성공적으로 제거)
- `CalendarRecordDrawer`: `src/components/calendar/CalendarRecordDrawer.tsx`, `src/screens/host/CalendarTabScreen.tsx` 등에서 존재
- `createCalendarMemo`: `ourCalendarRepository` 인터페이스 및 `localOurCalendarRepository`에 정의/호출 성공
- `updateCalendarMemo`: 포함됨 (수정 API)
- `deleteCalendarMemo`: 포함됨 (삭제 API)
- `localStorage calendar memo key`: `wwm:our-calendar:memos:v1` 사용 확인
- `opacity-0 in share capture`: 없음 (성공적으로 코드에서 제거됨)
- `calendar/shared` references: 없음
- `SharedCalendarScreen` references: 없음
- `localOurCalendarRepository` direct imports in screens: 직접 참조 없음 (`getOurCalendarRepository`를 통해 의존성 주입)
- `attachedCalendarMemoIds`: `CreateMeetingDraft` 및 컴포넌트 렌더링 조건문에 원활히 추가 및 활용 중
- `attachedCalendarMemoNotes`: 문구 추천 로직과 `MeetingInfoScreen`, `InvitePreviewScreen` 모두 확인
- `memo suggestion helper`: `getMemoSuggestionText`가 `src/utils/ourCalendar.ts`에 추가되어 `MeetingInfoScreen.tsx`에서 추천 문구 제공