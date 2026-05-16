# When We Meet Phase O-0.5: 온보딩 첫인상 폴리싱, Welcome Overlay 구조 정리, Home Empty State 강화, Alert 제거

## 작업 결과

### 1. 수정 파일
- src/components/invite/InvitationOpeningMotion.tsx
- src/components/onboarding/WelcomeInviteOverlay.tsx
- src/screens/host/HomeScreen.tsx
- src/screens/host/ShareScreen.tsx

### 2. Welcome overlay 구조 개선
- 기존 문제: InvitationOpeningMotion(fixed)와 WelcomeInviteOverlay(fixed)가 중첩됨
- 변경 내용: WelcomeInviteOverlay를 독립적인 전체 화면 컴포넌트로 재구현
- 스킵 동작: 우상단 스킵 버튼 유지
- 시작 CTA: 버튼 두 개로 분리 (첫 초대장 만들기, 스킵하기)

### 3. Envelope motion 수정
- SVG line: 기존 CSS 클래스 기반 `border-*`에서 `stroke={style.lineColor}` / `stroke={style.lineStrongColor}`로 변경
- classic fallback: `ClassicOpeningMotion`를 별도 컴포넌트로 구현하여 정상 표시되도록 수정
- reduced motion: 기존 설정 유지됨
- 추가 variant 보류: V-2로 보류

### 4. Home empty state 개선
- 기존 문제: 빈 화면 문구가 허무함
- 개선 내용: 카드형 카드 컴포넌트로 "첫 초대장 만들기" 및 "1분 튜토리얼 보기" CTA 추가

### 5. ShareScreen 수정
- alert 제거: 내장된 `alert()` 호출 제거
- notice UI: `AnimatePresence` + `motion.div`를 사용한 toast notice 구현
- 표시 URL: `replace(/^https?:\/\//, '')`를 사용하여 정규화
- copy/share fallback: 복사 및 공유 성공/실패 시 toast notice 노출

### 6. 빌드
- npm run lint: 성공
- npm run build: 성공

### 7. 런타임 확인
- 첫 방문 welcome: 중첩 레이어 없이 정상 동작
- 스킵: 정상 동작
- 튜토리얼 시작: 정상 동작
- Home empty state: 새 CTA 카드 정상 노출
- envelope line: 선이 명확하게 stroke로 표시됨
- ShareScreen notice: alert 없이 상단 toast/notice 노출
- 표시 URL: 정규화됨 (whenwm.vercel.app 형태로 표시)

### 8. 보류 목록
- Additional envelope variants: 보류
- Theme-specific motion: 보류
- MP4/GIF export: 보류
- Dynamic OG: 보류
- Kakao native share: 보류

### 9. 남은 이슈
- 없음

### 10. 다음 작업
1. Phase O-1 — First Invite Conversion Polish
2. Phase V-2 — Invitation Template Variants
3. Phase S-1 — Share Card Template System

### 11. 검증 검색 결과
- Classic opening motion: 0 (구현 완료)
- border-rose in invite svg: 0
- lineStrong: 확인 완료
- alert: 0 (제거 완료)
- whenwemeet.app: 0 (제거 완료)
- 아직 진행 중인 모임이 없어요: 0 (개선 완료)
- WelcomeInviteOverlay: 확인 완료
- InvitationOpeningMotion: 확인 완료
- wwm:onboarding: 확인 완료
- tutorial: 확인 완료
