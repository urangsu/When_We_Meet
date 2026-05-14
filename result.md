# 작업지시서 제목
When We Meet Phase H-3.6: 우리 달력 셀 미니멀화, 기본 기록 문구 제거, 아이콘 마커 중심 UX 정리

## 작업 결과

### 1. 수정 파일
- `src/components/meeting/CalendarDayCell.tsx`
- `src/screens/host/CalendarTabScreen.tsx`
- `task.md`
- `result.md`

### 2. 주요 변경
- `CalendarDayCell` 내에서 복잡하게 전달받던 `scheduleLabel`, `recordLabel`, `recordTone` 등의 프롭을 제거하고 날짜와 마커만 렌더링하는 미니멀한 UI로 전면 개편.
- `CalendarTabScreen` 하단에 모임, 기록, 일정 힌트의 마커 색상을 설명하는 작은 범례(Legend) 추가.
- `CalendarTabScreen` 선택 날짜 상세 패널에서 기록을 보여줄 때 각 메모 항목 우측에 "수정" 버튼을 별도로 렌더링하도록 변경.
- `CalendarTabScreen` 하단의 주요 버튼을 "기록 적기/기록 수정"에서 "새 기록 적기"로 고정 역할 부여 및 아이콘 변경.
- `task.md`에 `Phase H-3.6` 달성 내역을 체크하고 `Calendar Monthly Cell Rule` 가이드라인 추가.

### 3. 빌드
- npm run lint: 통과 (오류 없음)
- npm run build: 통과 (오류 없음)

### 4. 남은 이슈
- 달력 메모 저장이 여전히 로컬 스토리지에 의존.
- 카카오톡 이미지 공유가 Native SDK가 아니라 임시로 브라우저 동작 등을 사용하거나 보류 중.

### 5. 다음 작업
1. Phase H-4 — Calendar Records Backend & Privacy Model (calendar_memos 스키마 설계 및 백엔드 연동)
2. Phase F-4 — Backend Repository Implementation
3. Phase G-1 — BrowserRouter + Hosting Rewrite

### 6. 검증 검색 결과
- getRecordLabel usage: `CalendarTabScreen`에서 더 이상 사용하지 않음, `CalendarRecordDrawer` 등에선 쓰지 않는 유틸리티성 함수로 남음.
- recordLabel usage: `CalendarDayCell`에서 삭제, `CalendarTabScreen` 호출부에서도 제거 완료.
- CalendarTabScreen CalendarDayCell props: 미니멀 프롭 방식(날짜 + 마커카운트)으로 완벽하게 수정됨.
- "기록 적기" in monthly grid: "새 기록 적기" 등은 detail panel 이나 action drawer에서만 렌더링되며 empty cell에는 나타나지 않음.
- CalendarDayCell marker rendering: `eventCount`, `memoCount`, `externalHintCount`, `busyCount`에 따라 `gap-0.5`로 중앙정렬된 원형 마커 렌더링.
- scheduleLabel usage: `CalendarDayCell`에서 삭제됨.
- task.md Calendar Monthly Cell Rule: `Current Direction` 하위에 미니멀 렌더링 규칙 명시 완료.