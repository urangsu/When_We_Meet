# 작업지시서 제목
When We Meet Phase DS-1: 앱 테마 시스템 재정리, 회색 테마 제거, 모임탭 FAB 프레임 고정, 버튼 톤 디자인 시스템 재적용

## 작업 결과

### 1. 수정 파일
- src/types/user.ts
- src/repositories/userProfileRepository.ts
- src/layouts/HostAppLayout.tsx
- src/screens/host/MyPageScreen.tsx
- src/screens/host/MeetingsScreen.tsx

### 2. 신규 파일
- src/types/theme.ts
- src/config/appThemePresets.ts

### 3. 디자인 토큰 점검
- index.css: Tailwind V4 기반 Native CSS Variable 활용 중
- Button: 기존 테마 토큰 유지 시 문제 없음
- 기존 primary: `--color-primary` 변수 활용
- 기존 bg-app: `--color-bg-app` 변수 활용

### 4. App Theme 시스템
- AppThemeId: 'warm-ivory' | 'pure-white' | 'paper' | 'mist-blue' | 'auto'
- AppThemePreset: 테마 인터페이스 신설
- appThemePresets: 회색을 제외한 웜아이보리, 화이트, 페이퍼, 미스트 블루, 자동 테마 추가
- gray theme 제거: 완전 제거
- white theme: `pure-white` 추가 완료
- auto theme scaffold: 그라디언트 배경으로 scaffolding 처리

### 5. UserProfile migration
- appThemeId: `appThemeId: AppThemeId` 필드 추가
- appBackgroundId migration: 제거하고 `normalizeProfile`에서 `appThemeId`로 포팅하도록 구성
- default value: `warm-ivory`

### 6. HostAppLayout 적용
- theme CSS variables: 인라인 `--color-bg-app` 등 테마 변수 매핑 적용 완료
- bg-bg-app: 테마 변수 영향권으로 처리
- primary token: 변경되는 테마 토큰을 우선 참조
- line/surface/ink token: 변경되는 테마 토큰을 하위 컴포넌트 렌더링에 모두 적용

### 7. MyPage 설정
- 앱 화면 테마 메뉴: activePanel `appearance`로 분리 추가
- appearance panel: 테마별 이름 설명과 체크 선택 UI 추가
- 프로필 색상 문구 수정: 기존 프로필 색상 변경 섹션의 타이틀을 배경 테마에서 '프로필 색상'으로 변경
- 회색 테마 없음: 회색 미적용
- white theme 선택 확인: 정상 구동

### 8. MeetingsScreen FAB 수정
- 기존 문제: fixed bottom 14 right-5 로 뷰포트 기준 설정되어 있음
- fixed right-5 제거: 제거
- app frame constrained wrapper: `fixed inset-x-0` 과 `w-full max-w-[430px]` 래핑 구조 추가
- bg-primary 적용: `bg-ink` 에서 `bg-primary`로 CTA 교체
- mobile 위치: 바텀 내비게이션 상단 `bottom-[96px]` 고정
- desktop 위치: 반응형 컨테이너 우측 하단 고정성 확인

### 9. 빌드
- npm run lint: 통과
- npm run build: 통과

### 10. 런타임 확인
- /app/me 앱 화면 테마: '앱 화면 테마' 패널 접근 및 색상 적용 동작 확인
- warm ivory: 동작 확인
- pure white: 동작 확인
- paper: 동작 확인
- mist blue: 동작 확인
- auto: 동작 확인
- /app/meetings mobile FAB: 정상 정렬 확인
- /app/meetings desktop FAB: 430px 기준선 우측 정렬 정상 확인

### 11. 남은 이슈
- 추후 Auto 테마 선택 시 사진/글 추출 AI 기능을 통한 자동 색상 배합 로직 구현 필요.

### 12. 다음 작업
1. Auto(자동) 앱 화면 테마 AI 색상 추출 로직 구현.
2. 외부 캘린더 연동 (Google Calendar)
3. 생성, 확인 페이지 내 애니메이션 (motion) 최적화.

### 13. 검증 검색 결과
- appThemeId: src/types/user.ts, src/types/theme.ts, 등 정상 확인
- appThemePresets: src/config/appThemePresets.ts 작성 완료
- appBackgroundId: migration 코드 정상 동작
- 배경 테마: 삭제 및 "프로필 색상", "앱 화면 테마" 로 수정
- 프로필 색상: 수정 완료
- fixed bottom: MeetingsScreen.tsx 수정 및 래퍼 적용 완료
- right-5: 해당 요소 제외 완료
- bg-ink: MeetingsScreen.tsx 내부 FAB에서 삭제 및 대체 완료
