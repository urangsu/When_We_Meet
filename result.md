# 작업지시서 제목
When We Meet Phase V-1.1 + O-0: V-1 실제 커밋 검증, 첫 접속 환영 초대장, 스킵 가능한 첫 초대장 튜토리얼

## 작업 결과

### 1. 수정 파일
- src/screens/host/MeetingInfoScreen.tsx
- src/components/invite/InvitationOpeningMotion.tsx
- src/screens/host/HomeScreen.tsx
- src/screens/host/CategoryScreen.tsx
- src/screens/host/DatePickerScreen.tsx
- src/screens/host/PlaceSetupScreen.tsx
- src/screens/host/ActivitySetupScreen.tsx
- src/screens/host/InvitePreviewScreen.tsx
- src/screens/host/ShareScreen.tsx

### 2. 신규 파일
- src/utils/onboardingState.ts
- src/components/onboarding/WelcomeInviteOverlay.tsx
- src/components/onboarding/TutorialHint.tsx
- src/hooks/useTutorialMode.ts

### 3. V-1 실제 반영 검증
- MeetingInfo direct write mode: 확인 완료
- PencilLine: 반영 확인 완료
- Recommendation mode: 반영 확인 완료
- Envelope variant: 반영 확인 완료
- Classic fallback: 반영 유지 확인
- Reduced motion: 대응 확인
- Main branch reflected: 확인 완료

### 4. 첫 접속 환영 초대장
- 표시 조건: localStorage에 완료/스킵 기록이 없을 때
- 스킵 동작: `markWelcomeSkipped` 후 overlay 닫기
- 시작 CTA: `startTutorial` 후 create flow (tutorial mode)로 이동
- 완료 저장 key: `wwm:onboarding:v1:welcome-completed`
- 재방문 시 동작: overlay 노출 안 함

### 5. 첫 초대장 튜토리얼
- 시작 경로: `/app/create/category?mode=tutorial`
- tutorial state: `wwm:onboarding:v1:tutorial-active`
- 적용 화면: 6단계의 create flow 화면들
- 스킵 동작: 튜토리얼 전체 스킵 가능
- 완료 처리: 마지막 단계에서 공유/복사 시 `completeTutorial` 호출

### 6. Home empty state 개선
- HomeScreen 빈 화면일 때 안내 문구 및 튜토리얼 시작 버튼으로 교체 구현

### 7. 실제 backend flow 영향
- tutorial에서 fake/demo meeting 사용 여부: 아니오 (실제 meeting 생성)
- ShareScreen에서 실제 invite 생성 여부: 네
- VITE_REPOSITORY_MODE=backend 호환 여부: 확인 완료

### 8. 빌드
- npm run lint: 성공
- npm run build: 성공

### 9. 런타임 확인
- 첫 방문 overlay: 동작 확인
- 스킵: 동작 확인
- 튜토리얼 시작: 동작 확인
- create flow hint: 각 화면마다 확인
- ShareScreen 완료 안내: 확인 완료
- 재접속 시 overlay 미노출: 확인 완료

### 10. 보류한 모션/고도화 목록
- Additional envelope variants: 보류
- Theme-specific motion: 보류
- MP4/GIF export: 보류
- Dynamic OG animation: 보류
- Kakao native share: 보류

### 11. 남은 이슈
- 없음

### 12. 다음 작업
1. Phase O-1 — Onboarding Polish & First Invite Conversion
2. Phase V-2 — Invitation Template Variants
3. Phase S-1 — Share Card Template System

### 13. 검증 검색 결과
- PencilLine: 확인 완료
- 직접 쓰기: 확인 완료
- 추천 문구: 확인 완료
- MessageMode: 확인 완료
- variant: 확인 완료
- envelope: 확인 완료
- MailOpen: 확인 완료
- onboarding: 확인 완료
- tutorial: 확인 완료
- welcome: 확인 완료
- localStorage: 확인 완료
- /invite/demo: 확인 완료
- mockReceivedInvites: 확인 완료
