# 작업지시서 제목
When We Meet Phase H-0: Our Calendar 도메인 구축, 달력 메모, 공유 달력, 모임 생성 참고 레이어 설계

## 작업 결과

### 1. 수정 파일
- `src/types/calendar.ts`
- `src/data/mockOurCalendar.ts` (신규)
- `src/utils/ourCalendar.ts` (신규)
- `src/screens/host/CalendarTabScreen.tsx`
- `src/components/meeting/CalendarCandidatePicker.tsx`
- `src/screens/host/DatePickerScreen.tsx`
- `task.md`
- `result.md`

### 2. 주요 변경
- `OurCalendarEvent`, `OurCalendarMemo`, `OurCalendarSpace`, `OurCalendarShareLink`, `ExternalCalendarHint` 등 우리 달력과 관련된 타입들을 정의했습니다.
- `mockOurCalendar.ts`를 생성하여 우리 달력 기능(이벤트, 메모, 외부 힌트 등)을 검증할 수 있는 로컬 mock 데이터를 구축했습니다.
- DatePickerScreen 및 CalendarCandidatePicker에서 달력 메모(`mockOurCalendarMemos`), 외부 힌트(`mockExternalCalendarHints`)의 Context를 렌더링하도록 수정했습니다.
- CalendarTabScreen을 '우리 달력'과 '메모/외부 힌트/이벤트 목록' 중심으로 완전히 재구성하였으며 공유 링크 복사 버튼을 추가했습니다. (prototype)
- 외부 캘린더는 Our Calendar의 보조적인 참고 힌트로 역할을 명확히 분리했습니다.
- `task.md`의 `Phase H-0` 및 Next Task (`Phase H-1`) 에 진행 상황과 향후 스키마 계획을 작성했습니다.

### 3. 빌드
- npm run lint: 통과
- npm run build: 통과

### 4. 남은 이슈
- 아직 실제 백엔드 연동(Supabase 테이블 연결) 및 Google Calendar OAuth(실제 데이터 수집)는 구현되지 않은 UI prototype 상태입니다.
- '우리 달력' 공유 페이지로의 실제 라우팅 구현이 필요합니다.

### 5. 다음 작업
1. Phase F-4 — Backend Repository Implementation
2. Phase F-5 — Server-side Invite Validation
3. Phase H-1 — Our Calendar Persistence

### 6. 검증 검색 결과
- CalendarTabScreen: `src/App.tsx`, `src/screens/host/CalendarTabScreen.tsx`
- mockCalendar: `src/screens/host/DatePickerScreen.tsx`, `src/data/mockCalendar.ts`, `src/components/meeting/CalendarCandidatePicker.tsx`
- mockOurCalendar: `src/screens/host/CalendarTabScreen.tsx`, `src/screens/host/DatePickerScreen.tsx`
- OurCalendarEvent: `src/types/calendar.ts`, `src/data/mockOurCalendar.ts`, `src/utils/ourCalendar.ts`, `src/components/meeting/CalendarCandidatePicker.tsx`
- OurCalendarMemo: `src/types/calendar.ts`, `src/data/mockOurCalendar.ts`, `src/utils/ourCalendar.ts`, `src/components/meeting/CalendarCandidatePicker.tsx`
- CalendarCandidatePicker calendarMemos prop: `src/components/meeting/CalendarCandidatePicker.tsx`, `src/screens/host/DatePickerScreen.tsx`
- DatePickerScreen mockOurCalendar import: `src/screens/host/DatePickerScreen.tsx`