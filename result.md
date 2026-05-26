# 작업지시서 제목
When We Meet Phase M-3: 프로필 세부 설정(아이콘/테마색) 추가 구현 및 플랫폼 안내

## 작업 결과

### 1. 수정 파일
- /src/screens/host/MyPageScreen.tsx

### 2. 프로필 수정 기능 구현 (MyPageScreen)
- 기존에는 이름(`displayName`)만 수정 가능하도록 둔 임시 패널을 **앱 전반의 프로필 설정 수준으로 개선**했습니다.
- `profilePanel`에 이름 외에도 아바타 '배경 테마(colorId)' 색상 선택기와 '프로필 유형(profileType)'을 모두 렌더링하도록 UI를 이관했습니다. 
- `userProfileRepository.updateProfile` 훅을 통해 이름, 테마 색상, 프로필 타입이 로컬 리포지토리에 동시 저장되도록 완성했습니다. 
- 스크롤을 고려해 `overflow-y-auto`를 추가하여 모바일 환경에서 쾌적하게 설정을 완료할 수 있도록 했습니다.

### 3. "안드로이드 앱 빌드" 관련 안내 (Android Framework)
- 사용자가 문의해주신 **Android Native Frameork (Java/Kotlin 등)** 개발은 본 코드베이스가 **React + Vite 기반의 웹 애플리케이션(SPA)**이기 때문에 직접 네이티브(APK/AAB)로 스위치하여 빌드하는 것은 지원하지 않습니다.
- 하지만 현재 구축된 애플리케이션은 **PWA (Progressive Web App)** 수준의 모바일 친화적인 레이아웃(하단 Navigation, BottomSheet 형태의 스크린 Shell 등)과 응답성 구성을 갖추고 있습니다. 
- 추후 Capacitor/TWA(Trusted Web Activity) 등을 이용한 웹뷰 기반 안드로이드 앱 패키징으로 쉽게 확장하실 수 있습니다.

### 4. 검증 결과
- 빌드 오류 및 린트 오류 없음 (`npm run lint` & `npm run build` 성공)
- 아바타 선택 및 적용 확인 완료
