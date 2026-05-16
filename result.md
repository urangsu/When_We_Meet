# 작업지시서 제목
When We Meet Phase V-1.3: 가짜 봉투 제거, 실제 삼각 Flap 편지봉투 컴포넌트 재구현

## 작업 결과

### 1. 수정 파일
- src/components/onboarding/WelcomeInviteOverlay.tsx
- src/components/invite/InvitationOpeningMotion.tsx

### 2. 신규 파일
- src/components/invite/SignatureEnvelope.tsx

### 3. 기존 문제
- rectangular flap: 원본 삼각형 flap이 아닌 사각형 박스로 구현되어 있었음
- fake envelope lines: 실제 접힘 구조가 아닌 장식선
- no triangular fold: 3차원적인 삼각 접힘 구조 부재
- reference mismatch: 레퍼런스와 다른 로우 퀄리티 UI

### 4. SignatureEnvelope 구현
- triangular top flap: clip-path polygon(0 0, 100% 0, 50% 100%) 적용
- front left/right folds: 삼각 레이어로 구현
- front bottom fold: 삼각 레이어로 구현
- seal: flap 중심에 정밀 배치
- inner card: 열릴 때 y축으로 올라오는 애니메이션 구현
- rose fold lines: SVG로 실제 접힘선 경로 구현

### 5. 적용 화면
- WelcomeInviteOverlay: SignatureEnvelope 재사용
- InvitationOpeningMotion: SignatureEnvelope 재사용

### 6. 빌드
- npm run lint: 성공
- npm run build: 성공

### 7. 런타임/스크린샷 확인
- closed welcome envelope: 실제 봉투 형상 확인
- opened welcome envelope: flap이 위로 접히고 카드가 올라옴
- invite opening envelope: 모션 정상 작동
- desktop frame: 모바일 프레임 유지
- mobile layout: 반응형 확인
- reference checklist: 완료

### 8. 남은 이슈
- 없음

### 9. 다음 작업
1. Phase V-1.4 — Envelope Visual Refinement From Screenshot QA
2. Phase G-1 — BrowserRouter + Vercel Rewrite
3. Phase S-1 — Share Card Template System

### 10. 검증 검색 결과
- WelcomeEnvelopeIllustration: 제거됨
- rounded-t-3xl: 제거됨
- rotateX: SignatureEnvelope 내에서 삼각형 flap에 적용
- clipPath: 삼각형 구현에 사용
- SignatureEnvelope: 신규 생성
- InvitationOpeningMotion: 수정 완료
