# 작업지시서 제목
When We Meet Phase M-1: 랜딩페이지·앱스토어·온보딩·공유 카드 카피 실전 에셋화 및 로드맵 정리

## 작업 결과

### 1. 수정 파일
- `docs/landing-page-copy.md` (신규 파일)
- `docs/app-store-copy.md` (신규 파일)
- `docs/onboarding-copy.md` (신규 파일)
- `docs/share-card-copy.md` (신규 파일)
- `docs/ad-copy-bank.md` (신규 파일)
- `docs/gtm-roadmap.md` (신규 파일)
- `task.md`
- `src/screens/guest/GuestCompleteScreen.tsx`
- `src/screens/host/ShareScreen.tsx`
- `src/screens/host/InvitePreviewScreen.tsx`
- `result.md`

### 2. 주요 변경
- 랜딩페이지 섹션별 실제 카피 초안 작성 (`docs/landing-page-copy.md`).
- 앱스토어 이름, 부제, 설명 및 키워드/스크린샷 캡션 도출 (`docs/app-store-copy.md`).
- 앱 초기 진입 시 보여줄 4단계 온보딩 화면 카피 기획 (`docs/onboarding-copy.md`).
- 초대장, 확정 카드, 달력 기록 카드에 노출될 마이크로 카피 및 메신저(카카오톡/DM) 공유 문구 작성 (`docs/share-card-copy.md`).
- 소셜/콘텐츠 광고 시 사용 가능한 카피 앵글(초대장/부담 없는 응답/우리 달력 등)별 15개 문구 제공 (`docs/ad-copy-bank.md`).
- Private Beta부터 Monetization Test까지 이어지는 GTM 로드맵 정리 (`docs/gtm-roadmap.md`).
- `task.md`에서 ## 10. Phase H (Calendar) 파트의 중복 및 과거 이력을 Current Direction / Completed / Deprecated / Next 로 간결하게 압축 적용.
- `task.md`의 번호 꼬임(Phase M 및 이후 항목들의 번호 중복 문제)을 점검 및 14~22번으로 자연스럽게 리넘버링 적용.
- `task.md`의 Immediate Next Tasks 목록을 Product Reliability Track, GTM Track, Calendar/Data Track으로 분류하여 가독성 강화.
- UI 문구 개선: GuestCompleteScreen 내 `참석 여부` → `함께할 수 있나요?`로, ShareScreen 및 InvitePreviewScreen의 `복사` 및 `링크 공유하기` 버튼을 `초대장 복사`, `초대장 공유`로 교체하여 초대장 브랜딩 강화.

### 3. 빌드
- npm run lint: 통과 (오류 없음)
- npm run build: 통과 (오류 없음)

### 4. 남은 이슈
- 작성된 GTM (Go-To-Market) 기반 문구와 로드맵이 코드/랜딩/스토어 등에 직접 연계되기 위해서는 실제 마케팅 페이지 서빙 개발이나 OG 이미지(초대장) 생성기 등이 뒷받침되어야 합니다. 앱스토어 및 랜딩 페이지 실제 구성은 Immediate Next GTM Track 등 다른 페이즈에서 개발 반영 예정.
- 공유 앨범 개념은 이제 Deprecated 확정이고, "사진(초대장/달력 카드) 기반의 공유"가 기준치로 정착되었습니다.

### 5. 다음 작업
1. Phase F-4 — Backend Repository Implementation (단순 mock을 넘어선 Supabase 연동 본격 도입)
2. Phase M-2 — App Onboarding Copy & Screens (실제 온보딩 UI 컴포넌트로 구현)
3. Phase M-3 — Share Card Template System (공유 카드 카피 에셋을 서버사이드 렌더링 OG / Canvas Template으로 전환)

### 6. 검증 검색 결과
- Phase M references: `task.md` 내에 "Phase M — Product Positioning" 문구 단일 섹션으로 정상 반영됨.
- Product Signature references: `task.md` 내 "15. Product Signature"로 정상 압축/반영됨.
- Phase H-1R references: `task.md`에서 Deprecated 내부나 Completed 영역에 요약 통합되었으며 지저분하게 나뉜 섹션 제거 확정.
- Immediate Next Tasks structure: Three Track (Product / GTM / Data) 체제로 분리된 것을 `task.md`에서 확인 완료.
- 랜딩 references: `docs/landing-page-copy.md` 와 `task.md` 내 GTM Track에 반영되어 있음. 소스 코드 상의 무분별한 사용은 관찰되지 않음.
- 앱스토어 references: `docs/app-store-copy.md` 및 마케팅 문서에 제한되어 활용됨.
- 온보딩 references: `docs/onboarding-copy.md`에 카피 보관 확인. UI엔 아직 삽입되지 않음.
- 초대장 references: `src`, 마케팅 에셋 등 코어 워딩으로 가장 적극적 활용 (정상).
- 우리 달력 references: `docs` 밑 `CalendarTabScreen`, `ShareCard` 등 정착 단어로 사용 확인.
- 공유 앨범 references: 앨범으로서의 개념 부활 사례 없음 (완전 Deprecated 준수).
- @google/genai references: `package.json` 및 `package-lock.json`에만 존재, 브라우저 화면 상의 임포트 시도나 직접 호출 없음.
- express references: `package.json`, `@types/express`에만 존재 (클라이언트 빌드 사용 없음).
- dotenv references: `package.json`에만 안전 보관 중.
- analytics SDK added: 코드 상 인스톨 내역 없음.
- ad SDK added: 코드 상 인스톨 내역 없음.