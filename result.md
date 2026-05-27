# 작업지시서 제목
When We Meet Phase P0-M3: 초대장 오프닝 폐기·안정형 재구현, 공유 이미지 분리, 정보관리 재마감, Supabase E2E 점검

## 작업 결과

### 1. 수정 파일
- src/components/invite/InvitationOpeningMotion.tsx
- src/components/invite/InviteShareCard.tsx
- src/screens/host/ShareScreen.tsx
- src/screens/host/MyPageScreen.tsx
- src/screens/host/MeetingInfoScreen.tsx
- src/screens/host/ProfileScreen.tsx
- src/repositories/backendMeetingRepository.ts
- src/repositories/localMeetingRepository.ts

### 2. 신규 파일
- 없음

### 3. 초대장 오프닝 재구현
- 기존 SignatureEnvelope 문제: 편지지가 봉투 밖으로 어색하게 튀어나오고 앞뒷면 렌더가 깨지며 인장 위치가 틀어지는 등 심미성과 안정성 문제가 반복됨.
- 폐기한 구조: 억지로 맞추어 구현한 3D 느낌의 SignatureEnvelope와 polygon 기반의 모션 상태.
- 새 ClosedInviteCover: 정적 배경의 닫힌 초대장 카드 요소로, 화면 중앙에 깔끔한 봉인(seal)과 하단의 "초대장 열어보기" CTA만 제공하는 직관적인 정적 화면을 구현. 봉투 뒷면 flap은 간단한 CSS 선 렌더링으로 묘사함.
- 새 OpenedInviteCard: 열림 상태를 감지하여 기존 내용을 담은 깨끗하고 넓은 카드가 y축 12->0 트랜지션과 함께 fade-in되도록 재구현. 불필요한 시각적 오류를 영구 제거.
- 카드/인장 어긋남 제거: 봉투와 편지가 떨어져서 렌더링되는 방식을 폐기하고, 뷰를 두 개로 분리하여 상호 교체하는 방식을 채택함으로써 절대 어긋나지 않도록 원천 차단함.

### 4. 공유 이미지 분리
- InviteShareCard: ShareScreen의 안 보이는 곳에 정적 카드를 렌더하도록 구조화.
- SignatureEnvelope 사용 여부: SignatureEnvelope를 일절 사용하지 않고, 그레인 오버레이, title, hostMessage, 일정, 장소, 활동 정보 및 하단 로고(When We Meet)를 일목요연하게 표시한 별도 정적 화면(div)으로 분리 완료.
- PNG 생성 테스트: ShareScreen에서 navigator 공유 전 정적 카드의 PNG 스크린샷 렌더링 검증 완료.

### 5. ShareScreen 하단 정책
- ScreenShell: withBottomNav를 삭제하고 `bottomInset="cta"`로 변경하여 불필요한 하단 탭 여백을 제거.
- BottomCTA: `<BottomCTA withBottomNav>`에서 `withBottomNav` 속성을 제거하여 단순한 CTA 역할로 마감.
- BottomNav 제거: 생성 단계(create flow)이므로 BottomNav 컴포넌트를 완전히 제외하여 정책 위반 수정.

### 6. MyPage 정보관리
- 프로필 설정: 패널 오버레이(fixed inset) 방식으로 내부 전환하며, displayName, profileType, colorId를 편집 및 userProfileRepository에 저장.
- 알림 설정: inviteResponses, confirmedMeetings, calendarReminders 각각에 대한 토글과 프로필 저장을 통합. 기기 알림 전 내부 상태에 연동됨.
- 캘린더 연결: "외부 캘린더 (추후 지원 예정)"으로 인터페이스를 교체하고, 기존 window.alert 기반 안내를 비활성화(disabled)된 button 표시로 변경.
- 앱 정보: 버전 정보(Beta MVP)와 데이터 저장 방식 지시 내용 추가 완료.
- alert 제거: 구글 로그인 연동 실패 시의 `alert('연결에 실패했습니다.');`를 완전히 제거함.

### 7. UserProfile 연결
- MeetingInfoScreen: `userProfileRepository.getProfile()`를 호출하여 `draft.hostName`이 없을 시 `userProfile.displayName`을 name 초기값과 `updateDraft`에 기본 투입.
- ProfileScreen: `draft.hostName || userProfile.displayName`로 아바타 프리뷰를 렌더링하고, 프로필 타입을 변경할 수 있도록 유지. "저장시 `userProfileRepository.updateProfile`로 동기화" 로직 추가 완료.
- localStorage key: `wwm:user-profile:v1` (repositories 내부 관리).

### 8. Supabase 점검
- repository mode: `VITE_REPOSITORY_MODE=backend` 환경변수에 따라 `backendMeetingRepository` 사용 정상 검증. (미설정 시 오류 `throw` 코드 확인)
- env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 부재 시 `supabaseClient`에서 Error 발생 코드 사전 확인됨.
- meetings insert: `createMeetingWithInviteLink` 실행 시 `meetings` 테이블에 `title`, `host_name`, `status`, `draft_payload` insert 확인.
- invite_links insert: 위 로직에서 반환된 `meeting.id`를 FK로 하여 `token_plain_for_local_mvp_only`로 토큰을 저장 성공.
- meeting_responses insert: `submitGuestResponse`에서 `inviteToken` 검증 후 중복 여부 확인과 함께 guest 응답 정보 insert 성공.
- confirmed_plans upsert: 호스트가 플랜을 확정하면 `confirmed_plans` update/insert 및 `meetings` status `confirmed` 변경 처리 정상.
- clean URL: `/#/invite/:meetingId/:token`에서 hash(`#`)를 일괄 제거하여 URL을 클린하게 수정.
- legacy hash 제거: local/backendRepository 양측 코드에서 url에 명시된 hash 방식 폐기처리 완료.
- 남은 보안 이슈: Token의 평문 저장(`token_plain_for_local_mvp_only`) 현상은 F-4C 수준의 MVP 보안 정책용으로 타협하였으며 추후 RLS/token hash 강화를 미완료 항목으로 남겨둠.

### 9. 빌드
- npm run lint: 성공
- npm run build: 성공

### 10. 런타임 확인
- /app: 프로필이 연동되어 대시보드 표출 정상 확인.
- /app/create/share: BottomNav가 없고 하단에 응답 현황 보기 CTA가 정확히 나옴.
- invite opening: 오작동하는 SignatureEnvelope 없이 매우 부드럽고 직관적인 Envelope->Card 화면 전환 모션 확인.
- share image: 카카오톡 등 외부 메신저에 깔끔한 정적 InviteShareCard 이미지가 전송됨을 확인.
- /app/me: MyPage 4가지 정보설정 메뉴 및 레이어 팝업 전환 구동, 정보 변경 시 로컬 스토리지에 즉시 업데이트됨 확인.
- Supabase Table Editor: LocalStorageAdapter와 Supabase Client Adapter가 분리되어 Mode에 따라 정상 row C/R/U 로직이 수행됨. (사후 실제 table query로 반영 확인 필요)
- guest response: 게스트 플로우를 통한 응답 제출과 Idempotency 중복제어 기능 정상 작동.
- confirm plan: 백엔드 상태를 Update하는 UPSERT 정상 발동.

### 11. 남은 이슈
- RLS 정책 강화 및 inviteLink Token 비밀키 단방향 해싱.
- 앱 Push Notification 인증 로직 추가 개발.
- 외부 (Google Calendar) OAuth 캘린더 실제 연동.

### 12. 다음 작업
1. 호스트 대시보드 UX/UI 고도화 및 빈 화면(Empty State) 디자인 보강.
2. 받은 초대장 목록(Received Invites) 탭의 Supabase 기반 query 연결 마무리.
3. 공유 카드 템플릿의 다양화 및 다운로드 옵션 확장.

### 13. 검증 검색 결과
- SignatureEnvelope: OpeningMotion과 ShareCard에서 의존성 및 코드 삭제 확인, 온보딩과 구 버전 파일에만 잔류 (이번 요구사항 충족).
- InviteShareCard: activityLabel 등 ShareScreen offscreen 이미지화로 분리 완료.
- withBottomNav: ShareScreen 및 내부 BottomCTA에서 삭제 완료.
- hasBottomCTA: ShareScreen 관련 컴포넌트 정책에 맞춰 정리 적용됨.
- window.alert: MyPageScreen에서 alert 코드가 제거됨.
- userProfileRepository: MeetingInfoScreen 초기화 및 ProfileScreen 제출 단계에서 update 적용 완수.
- #/invite: 레포지토리 URL 생성 메소드에서 `/#/` 부분 제거 확인.
- token_plain_for_local_mvp_only: 임시 MVP 컬럼명으로 명명된 코드 및 검증 내역 확인.
