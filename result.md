# 작업지시서 제목
When We Meet Phase V-0: 초대장 모션 경험, 짧은 영상형 UI, 카카오 공유 첫인상, P0 출시 루프 재정렬

## 작업 결과

### 1. 수정 파일
- `index.html`
- `src/components/invite/InvitationOpeningMotion.tsx` (신규)
- `src/screens/guest/InviteLandingScreen.tsx`
- `src/screens/host/InvitePreviewScreen.tsx`
- `src/components/invite/InviteShareCard.tsx` (신규)
- `src/screens/host/ShareScreen.tsx`
- `src/utils/shareImage.ts`
- `task.md`
- `result.md`

### 2. 주요 변경
- `index.html`에 When We Meet 전용 `<title>`과 OG 태그들을 추가하고 기본 React 문장을 제거했습니다.
- 게스트 랜딩 화면(`InviteLandingScreen`) 진입 시 짧게 카드 형태로 스르륵 열리는 `InvitationOpeningMotion` 컴포넌트를 연동하여 감성적인 첫인상을 부여했습니다.
- 호스트가 앱 내에서(`InvitePreviewScreen`) 초대장의 게스트 오프닝 모션을 미리 보기 할 수 있게 버튼을 추가했습니다.
- `InvitePreviewScreen`/`ShareScreen`에 공유용 예쁜 이미지 템플릿(`InviteShareCard`)을 렌더링하고, 바로 `html-to-image`와 `navigator.share`를 통해 공유할 수 있는 핵심 CTA(초대장 사진으로 공유)를 최상단으로 올렸습니다. 링크 공유는 보조로 내렸습니다.
- GuestCompleteScreen(초대 응답 완료) 하단에 "나도 초대장 만들기" CTA 버튼 및 문구를 안내 가이드에 맞춰 수정하고, `navigate('/app/create/category')` 경로로 이동하도록 변경하여 전환(바이럴) 루프를 강화했습니다.
- `task.md`에서 달력(`Our Calendar`)을 잔존 및 데이터 확장용 후순위로 내리고, 초대장 모션/바이럴 공유 경험(Phase V)을 `P0 Acquisition Core`로 전진 배치하였습니다.
- Mock 데이터 점검(`mockMeetings` 및 `mockReceivedInvites`) 결과 호스트 홈 화면에서 아직 노출되고 있어 이를 Task 문서의 P0 Launch Blocker에 제거 작업으로 등록했습니다.

### 3. 빌드
- npm run lint: 통과 (오류 없음)
- npm run build: 통과 (오류 없음)

### 4. 남은 이슈
- OG 이미지의 경우 당장은 빈 `public/og.jpg`로 만들었고, 추후 미팅 다이나믹 이미지 생성 또는 완성도 있는 정적 에셋으로 대체가 필요합니다.
- `navigator.share`의 경우 브라우저 및 안드로이드/IOS 간 공유 호환성(특히 카카오톡 등)이 다를 수 있어 Kakao Message API (Native Share) 도입이 추후 요구됩니다.

### 5. 다음 작업
1. Phase F-4 — Backend Repository Implementation
2. Phase V-1 — Invite Video/OG Polish (동적 OG 이미지 및 완성도 높은 카카오 공유 링크 등)
3. Phase G-1 — BrowserRouter + Hosting Rewrite

### 6. 검증 검색 결과
- My Google AI Studio App: 검색하여 `index.html` 내 기존 fallback 타이틀 제거, "When We Meet"으로 교체.
- og:title: `index.html`에 meta property로 추가 확인.
- og:image: `index.html`에 meta property로 추가 확인. `public/og.jpg` placeholder 생성.
- InvitationOpeningMotion: src 내 사용처 검색. `InviteLandingScreen`과 `InvitePreviewScreen`에 연동.
- InvitePreviewScreen motion preview: "모션 미리보기" 버튼 통해 `InvitationOpeningMotion` 컴포넌트 렌더링 구현.
- invite share image/export: `html-to-image`로 이미지를 만들고 `ShareScreen`에서 메인 CTA로 "초대장 사진으로 공유" 버튼 연동. `InviteShareCard` 반영됨.
- navigator.share: `shareImage.ts`가 `options` 객체를 받도록 확장하여 텍스트 및 URL이 시스템 공유 시트까지 전달되게 함.
- GuestComplete create CTA: "우리 언제 만나 시작하기" 버튼을 "나도 초대장 만들기"로 변경하고 `/app/create/category`로 이동하게 적용 완료.
- mockMeetings in screens: `HomeScreen` 등에서 더미데이터를 불러와 렌더링함을 확인, task.md 문서의 P0 blocker(목록 5번)로 기재.
- mockReceivedInvites in screens: 동일하게 P0 blocker로 남겨둠.
- notImplemented backend: `backendMeetingRepository.ts`는 모두 `notImplemented` 상태. 이 역시 Phase F-4 작업으로 넘김.