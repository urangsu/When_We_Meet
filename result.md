# 작업지시서 제목
When We Meet Phase V-0.5: 초대장 모션/공유 마감, OG 실이미지, Preview Export, Share Session 안정화

## 작업 결과

### 1. 수정 파일
- `index.html`
- `public/og.jpg` (및 `og.svg` 템플릿)
- `src/components/invite/InviteShareCard.tsx`
- `src/screens/host/ShareScreen.tsx`
- `src/screens/host/InvitePreviewScreen.tsx`
- `src/components/invite/InvitationOpeningMotion.tsx`
- `src/screens/guest/InviteLandingScreen.tsx`
- `src/screens/host/HomeScreen.tsx`
- `src/screens/host/MyPageScreen.tsx`
- `src/screens/host/MeetingInfoScreen.tsx`

### 2. 주요 변경
- `index.html` 내 `og:image` URL을 절대경로(`https://whenwemeet.app/og.jpg`)로 수정함.
- `public/og.jpg` 파일을 Sharp를 이용해 1200x630 크기의 깔끔한 실제 이미지가 포함되도록 생성 및 교체.
- `InviteShareCard` 컴포넌트 자체에 있던 `left-[-9999px]` `top-[-9999px]` 코드를 제거하여 언제든 visible하게 재사용할 수 있도록 변경함.
- 대신 `ShareScreen`, `InvitePreviewScreen`의 상위 컴포넌트 레벨에서 `InviteShareCard`를 호출할 때 offscreen wrapper(`<div className="fixed left-[-10000px] top-0 pointer-events-none">`)로 감쌈.
- `InvitePreviewScreen`에 "초대장 사진으로 미리 공유" CTA 버튼을 추가하여, 저장 전에도 미리 이미지를 생성(`createPngFileFromElement`)하고 공유(`shareImageFile`)할 수 있게 기능 추가 완료.
- `InvitationOpeningMotion` 컴포넌트에 테마별 색상과 배경값을 정의(`themeStyles`)하고 `themeId`를 넘겨받아 동적으로 컬러와 그라데이션이 적용되도록 수정.
- 코드 여러 곳에 남겨져있던 과도한 프로토타입 하드코딩("수민", "수민이의 생일 모임" 등)을 "새로운 초대장", "호스트" 등의 중립적인 이름으로 변경하여 실제 사용시 어색함 제거.
- `ShareScreen`의 초대장 재사용 로직을 기존 `draftTitle` 단독 검사에서 전체 폼 데이트를 담은 `draftFingerprint` 검사로 변경해 동일 제목이더라도 내용이 다르면 새로운 토큰을 주도록 세션 재사용 규칙 강화.

### 3. 빌드
- npm run lint: 통과 (오류 없음)
- npm run build: 통과 (오류 없음)

### 4. 남은 이슈
- 개별 모임의 `og:image`를 동적으로 생성해내는 기능(`Dynamic meeting-specific OG`)은 아직 추가되지 않음.
- 카카오톡 인앱 브라우저 및 메신저 등에서 `navigator.share`의 호환성 제약 때문에 완벽한 카드 형태를 위해서는 Kakao SDK 네이티브 공유 도입이 필요함.

### 5. 다음 작업
1. Phase V-1 — Invite Video/OG Polish (동적 OG 이미지 및 완성도 높은 카카오 공유 링크 등)
2. Phase F-4 — Backend Repository Implementation
3. Phase G-1 — BrowserRouter + Hosting Rewrite

### 6. 검증 검색 결과
- 수민 fallback: `MyPageScreen`, `HomeScreen` 등에서 "호스트" 문자열 등으로 교체됨. (`grep -R "수민" -n src` 확인 완료)
- 생일 모임 fallback: `MeetingInfoScreen`, `InvitePreviewScreen`, `InviteLandingScreen` 등에서 "새로운 초대장", "새로운 만남"으로 교체됨.
- InviteShareCard offscreen class: `InviteShareCard.tsx` 본문 내 `absolute left-[-9999px]` 코드 모두 제거됨.
- og:image: `index.html`에 `https://whenwemeet.app/og.jpg` 절대경로로 설정 완료.
- public/og.jpg: 1200x630 `sharp-cli` 생성본 저장 및 확인 리스트 도출됨.
- InvitePreviewScreen image export: "초대장 사진으로 미리 공유" CTA 추가 완료.
- createPngFileFromElement in InvitePreview: `InvitePreviewScreen.tsx` 내 사용됨.
- shareImageFile in InvitePreview: `InvitePreviewScreen.tsx`에서 핸들러에 의해 동작.
- themeId in InvitationOpeningMotion: props로 전달받아 `themeStyles` 딕셔너리로 동적 할당 완료.
- draftTitle in ShareScreen: 조건문 조건 삭제로 재사용하지 않음.
- draftFingerprint in ShareScreen: `createDraftFingerprint` 및 `SHARE_SESSION_KEY` 저장 객체에 추가되어 조건문으로 대체 동작 완료.