# 작업지시서 제목
When We Meet Phase C-2 QA Fix: Guest Draft 타입 오류, Landing 문구, Time 직접 입력 저장 정리

## 작업 결과

### 1. 수정 파일
- src/screens/guest/GuestCompleteScreen.tsx
- src/state/GuestResponseDraftContext.tsx
- src/screens/host/MeetingInfoScreen.tsx
- src/screens/guest/InviteLandingScreen.tsx
- src/screens/host/TimeSetupScreen.tsx
- src/screens/guest/GuestAttendanceScreen.tsx
- result.md

### 2. 주요 변경
- GuestCompleteScreen 타입 오류 수정 (guestName -> nickname)
- GuestResponseDraftContext 미사용 import 제거
- MeetingInfoScreen 미사용 state 제거
- InviteLandingScreen 하드코딩 문구 수정
- TimeSetupScreen 직접 입력 및 모드별 저장 로직 정리
- GuestAttendanceScreen CTA 카피 수정 (응답 -> 답장)

### 3. 빌드
- npm run lint: 성공
- npm run build: 성공

### 4. 남은 이슈
- 없음

### 5. 다음 작업
- 없음
