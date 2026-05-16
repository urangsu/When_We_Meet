# 작업지시서 제목
When We Meet Phase L-1.1: 홈 하단 CTA 중복 제거, BottomNav 겹침 수정, 탭/생성 플로우 하단 정책 확정

## 작업 결과

### 1. 수정 파일
- /src/screens/host/HomeScreen.tsx
- /src/layouts/HostAppLayout.tsx
- /src/components/layout/ScreenShell.tsx
- /src/components/onboarding/TutorialHint.tsx
- /src/components/layout/BottomCTA.tsx
- /src/screens/host/CategoryScreen.tsx
- /src/screens/host/MeetingInfoScreen.tsx
- /src/screens/host/PlaceSetupScreen.tsx

### 2. 기존 문제
- Home fixed BottomCTA: 홈 화면 최하단에 BottomCTA가 고정되어 BottomNav와 겹침
- Empty state CTA duplication: 홈 빈 화면 카드 속 버튼과 하단 고정 CTA가 중복됨
- BottomNav overlap: 화면 하단 UI 레이아웃 충돌
- ScreenShell bottom padding: 레이어별 패딩 계산 복잡

### 3. HomeScreen 수정
- BottomCTA 컴포넌트 및 import 제거
- ScreenShell bottomInset="nav" 적용 완료
- 빈 홈 화면 카드 속 "첫 초대장 만들기" 버튼 유지

### 4. Layout 정책
- tab root screens: BottomNav 표시
- create flow: BottomNav 숨김, 각 화면에 적절한 BottomCTA 사용

### 5. ScreenShell 수정
- bottomInset Prop 추가: 'none' | 'nav' | 'cta' | 'ctaWithHint' 설정으로 레이아웃 패딩 자동 계산 로직 적용

### 6. Create Flow 검색 결과
- withBottomNav: create flow에서 모두 제거
- hasBottomCTA: create flow에서 모두 제거
- BottomCTA withBottomNav: create flow에서 모두 제거

### 7. 빌드
- npm run lint: 성공
- npm run build: 성공

### 8. 런타임 확인
- /app mobile: BottomNav만 노출, 클릭 영역 정상
- /app desktop: 중앙 프레임 정렬, BottomNav 정상
- empty state CTA clickable: 클릭 가능
- BottomNav overlap: 완전 해결
- /app/create/category: BottomNav 노출 안됨, BottomCTA만 노출
- Mobile: /app/create/category 하단 safe area 확인

### 9. 남은 이슈
- 없음

### 10. 다음 작업
1. Phase L-1.2 — Create Flow Layout Sweep
2. Phase V-1.5 — Screenshot-Based Envelope Visual QA
3. Phase G-1 — BrowserRouter + Vercel Rewrite Regression

### 11. 검증 검색 결과
- withBottomNav: 완전히 제거됨
- hasBottomCTA: 완전히 제거됨
- BottomCTA: 수정 후 정상 동작
- bottom-[80px]: 홈 하단 고정값 제거됨
- fixed bottom-0: BottomNav 전용으로 정리됨
- 첫 초대장 만들기: 홈 empty 카드에 유지
- 새 초대장 만들기: create flow 전용 CTA로 정리됨
