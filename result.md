# 작업지시서 제목
When We Meet Phase O-0.7: 첫 접속 Welcome UX 전면 재정렬, 모바일 프레임 고정, CTA 폭 붕괴 수정

## 작업 결과

### 1. 수정 파일
- src/components/onboarding/WelcomeInviteOverlay.tsx

### 2. 문제 원인
- full viewport layout: Welcome overlay의 전체 viewport 사용으로 데스크톱에서 어색함 발생
- Button size="full": 버튼의 w-full 사용으로 데스크톱에서 과도하게 넓어짐
- desktop max-width 부재: 프레임 제한 부재
- envelope scale: 일러스트가 작고 평면적이었음

### 3. Welcome layout 수정
- desktop frame: 중앙 집중형 모바일 앱 프레임(430px) 추가
- mobile layout: 전체 화면에서 프레임 내 레이아웃으로 전환
- CTA width: 360px 이하로 제한
- skip position: 프레임 내 우상단으로 이동

### 4. Welcome interaction 수정
- closed state: 봉투 일러스트+열기 버튼
- opened state: 소개 문구 + 주요 CTA
- open motion: 자연스러운 봉투 열림 인터랙션 구현
- skip behavior: 일관되게 유지

### 5. Envelope illustration 수정
- size: 280x190으로 확대
- flap: 열림/닫힘 RotateX 전환 적용
- seal: 열림 시 투명도/크기 전환
- inner card: 열림 시 부드러운 위치/크기 전환
- infinite animation 제거: 제거 완료

### 6. 빌드
- npm run lint: 성공
- npm run build: 성공

### 7. 런타임 확인
- desktop 1365px: 중앙 정렬 프레임 확인, CTA 폭 제어 정상
- mobile 390px: safe area 및 반응형 레이아웃 정상 작동
- CTA overflow: 해결됨
- skip: 프레임 내 우상단에서 정상 작동
- open state: 인터랙션 정상
- reopened behavior: 정상 (상태 유지됨)

### 8. 남은 이슈
- 없음

### 9. 다음 작업
1. Phase G-1 — BrowserRouter + Vercel Rewrite
2. Phase F-4C — Token Hash / RLS / Invite Access Validation
3. Phase R-0 — Received Invites Backend

### 10. 검증 검색 결과
- WelcomeInviteOverlay: 수정 완료
- size="full": CTA container로 폭 제어 이동
- fixed inset-0: 중앙 집중 레이아웃으로 변경
- repeat: Infinity: 제거 완료
- 첫 초대장 만들어보기: 열린 상태에서 정상 노출
- 스킵: 프레임 내 상단으로 이동
