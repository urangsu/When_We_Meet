# 작업지시서 제목
When We Meet Phase L-1: Desktop Layout 붕괴 수정, Create Flow 모바일 프레임 정렬, TutorialHint/BottomCTA/BottomNav 재배치

## 작업 결과

### 1. 수정 파일
- /src/layouts/HostAppLayout.tsx
- /src/components/layout/ScreenShell.tsx
- /src/components/layout/BottomCTA.tsx
- /src/components/onboarding/TutorialHint.tsx
- /src/screens/host/CategoryScreen.tsx
- /src/screens/host/MeetingInfoScreen.tsx
- /src/screens/host/PlaceSetupScreen.tsx

### 2. 기존 문제
- TutorialHint viewport fixed: 브라우저 viewport를 기준으로 fixed되어 데스크톱에서 화면 전체 폭으로 퍼짐
- BottomCTA/BottomNav stacking: 레이어들이 겹쳐서 UI가 깨짐
- create flow withBottomNav: create flow에서도 nav가 보여 UI 공간 부족
- desktop frame: 중앙 정렬되지 않음

### 3. HostAppLayout 수정
- desktop app frame: 중앙 집중형 max-w-[430px] 프레임 적용
- BottomNav 표시 조건: 루트 탭 화면에서만 보이도록 로직 수정
- create flow 영향: create flow 화면에서 nav가 숨겨짐

### 4. ScreenShell 수정
- bottomInset: 'none' | 'nav' | 'cta' | 'ctaWithHint' 설정으로 레이아웃 패딩 자동 계산
- padding policy: 명확한 하단 여백 정책 확립

### 5. TutorialHint 수정
- inline default: fixed bottom에서 일반 inline 컴포넌트로 변경
- floating optional: `placement` prop으로 선택 시에만 화면 프레임에 고정

### 6. BottomCTA 수정
- max width: 430px 앱 프레임폭에 맞춤
- safe area: 하단 safe area 대응
- withBottomNav 처리: Nav 대응 없이 단일 CTA 전용으로 간소화

### 7. Create Flow 화면 수정 (Category, MeetingInfo, PlaceSetup)
- 컴포넌트: `ScreenShell`, `BottomCTA`, `TutorialHint` 적용 완료

### 8. 빌드
- npm run lint: 성공
- npm run build: 성공

### 9. 런타임 확인
- desktop 1365px /app/create/category: 앱 프레임 내부 중앙 정렬 확인
- mobile 390px /app/create/category: 정상
- /app BottomNav: 표시됨
- /app/create/* BottomNav: 숨겨짐
- CTA overflow: 없음
- TutorialHint width: 앱 프레임 내부폭에 맞춤

### 10. 남은 이슈
- 없음

### 11. 다음 작업
1. Phase V-1.5 — Screenshot-Based Envelope Visual QA
2. Phase G-1 — BrowserRouter + Vercel Rewrite Regression
3. Phase S-1 — Share Card Template System

### 12. 검증 검색 결과
- withBottomNav: 제거 및 수정됨
- hasBottomCTA: 제거 및 수정됨
- BottomCTA: 수정됨
- TutorialHint: 수정됨
- fixed bottom: 제거됨
- bottom-20: 제거됨
- left-4 right-4: 제거됨
- max-w-md: 430px로 변경/확정됨
- BottomNav: 로직 수정됨
