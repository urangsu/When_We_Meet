# When We Meet Phase P1-M5: Supabase 초대 보안, 받은 초대장 히스토리, Guest 오류 UX, 데이터 관리, 베타 안정화 패스

## 작업 결과

### 1. 수정 파일
- /src/repositories/backendMeetingRepository.ts
- /src/state/GuestInviteContext.tsx
- /src/screens/guest/GuestCompleteScreen.tsx
- /src/screens/host/HomeScreen.tsx
- /src/components/invite/ReceivedInviteCard.tsx
- /src/screens/guest/InviteLandingScreen.tsx
- /src/screens/host/MyPageScreen.tsx
- /src/screens/host/CalendarTabScreen.tsx

### 2. 신규 파일
- /src/utils/tokenHash.ts
- /supabase/migrations/phase-p1-token-hash.sql
- /src/repositories/receivedInviteRegistry.ts
- /src/config/featureFlags.ts

### 3. Supabase token hash
- **tokenHash util:** `src/utils/tokenHash.ts`를 생성하여 브라우저 내장 `crypto.subtle`을 통한 SHA-256 단방향 암호화를 구현했습니다. (클라이언트 사이드 해시 MVP)
- **invite_links token_hash:** `backendMeetingRepository.ts`의 `createMeetingWithInviteLink`, `getMeetingByInvite`에서 plain token 대신 `token_hash` 컬럼에 접근하도록 구현했습니다.
- **meeting_responses invite_token_hash:** `submitGuestResponse` 메서드에서 `invite_token_hash`에 값을 채우도록 업데이트했습니다.
- **plain token 사용 중단 여부:** 프론트엔드의 읽기 및 생성 로직은 이제 `token_hash`를 기준으로 동작합니다. 하위/마이그레이션 호환성을 위해 plain 컬럼에는 값을 남겨두었으나, API 검증 로직에서는 hash를 사용하여 검증합니다.
- **schema/migration:** `supabase/migrations/phase-p1-token-hash.sql` 파일을 생성하여 hash 컬럼 추가 변경 사항을 기록했습니다.

### 4. RLS / 보안
- **적용한 SQL:** `supabase/migrations/phase-p1-token-hash.sql`에 MVP 환경 이후 전환할 RLS Policy 가이드라인을 작성해두었습니다.
- **anon 정책:** 현재 MVP는 로그인 없이(Guest/Host) 익명 기반이므로 `meetings`, `invite_links`, `meeting_responses`에 대해 `anon`의 `SELECT`, `INSERT`를 광범위하게 허용하는 수준의 정책이 필요함을 기록했습니다.
- **남은 MVP 보안 한계:** Dashboard에서 응답 데이터를 읽는 행위가 암호 검증이나 User Auth에 종속되지 않은 상태입니다. 완전한 RLS를 보장할 수 없으며 "MVP 제한" 상태로 유지됨을 명시했습니다.
- **token_plain_for_local_mvp_only 잔여:** 완전한 plain token 의존 제거(Migration) 전까지는 `invite_links.token_plain_for_local_mvp_only` 필드가 저장되도록 유지했습니다.

### 5. 받은 초대장 history
- **receivedInviteRegistry:** `src/repositories/receivedInviteRegistry.ts`를 생성하여 로컬 스토리지 키 `wwm:received-invites:v1`로 히스토리를 추적합니다.
- **GuestInviteContext 저장:** 게스트가 유효한 초대장에 처음 진입(`getMeetingByInvite` Load 성공)하면 `receivedInviteRegistry.upsert`로 열람 기록을 저장합니다.
- **GuestCompleteScreen responded:** 응답(답장) 제출 성공 시 `receivedInviteRegistry.markResponded(meetingId)`를 호출하여 상태를 "응답 완료"로 갱신합니다.
- **HomeScreen 표시:** Home의 "받은 초대장" 섹션이 `receivedInviteRegistry.list()`를 바인딩하여 렌더링되게 했으며, 기존 `/invite/demo` 데모 플로우를 모두 걷어내고 실제 동적 주소 기반 Navigation으로 개선했습니다.
- **삭제 기능:** Home 화면의 관리 기능을 통해 개별 `receivedInvite` Local Row를 지울 수 있습니다.

### 6. Guest invalid UX
- **invalid screen:** `InviteLandingScreen.tsx`의 `loadState === 'invalid'` 조건 시, 단순히 문구 1줄이 아니라 빈 편지통 아이콘과 함께 "가능한 이유" 3가지를 정리해서 안내하는 Card UI 로 교체했습니다.
- **expired/closed/full 처리 여부:** DB 연동 Layer에서는 expired 및 closed가 이미 invalid 랩핑 후 `null` 처리를 내리도록 되어 있어, Invalid Screen 내 통합 안내 메시지로 통일했습니다. 
- **홈 이동 CTA:** UI 하단에 홈 화면(`/app`)으로 안전하게 이탈할 수 있는 내비게이션 버튼을 연결했습니다. 

### 7. MyPage 데이터 관리
- **작성 중 초대장 초기화:** Data Management 탭에서 로컬 스토리지를 삭제(`wwm:create-draft:v1`)하도록 연동했습니다. (내부 Custom Modal Dialog UI 뷰 적용)
- **받은 초대장 기록 삭제:** Data Management 탭에서 `wwm:received-invites:v1`를 전체 삭제하도록 구성했습니다.
- **내 정보 초기화:** Data Management 탭에서 `wwm:user-profile:v1`를 삭제 후 화면을 Reload시키는 로직을 추가했습니다.
- **저장 방식 설명:** 초대장 및 응답 정보는 Supabase Cloud에, 개인 설정이나 기기 고유 데이터(받은 기록)는 브라우저 내부에 저장된다는 안내 문구를 '앱 정보' 패널 상단에 추가했습니다. 

### 8. 외부 캘린더 flag
- **featureFlags:** `src/config/featureFlags.ts` 생성 후 `externalCalendar: false`로 정의했습니다. 
- **CalendarTabScreen:** Google OAuth 기능 연동을 시도하는 `useEffect` Hook을 `featureFlags.externalCalendar` 분기문 안으로 격리했습니다. (현재 실행 해제됨)
- **MyPage 표시:** MyPage의 캘린더 연동 탭에서도 외부 캘린더 영역은 "추후 지원 예정" 문구 고정 및 버튼 disable 상태로 통일해 적용했습니다.

### 9. Supabase E2E
- **meetings row:** 신규 모임 생성 정상 확인.
- **invite_links row:** 신규 생성 정상되며 `token_plain_for_local_mvp_only` 및 `token_hash` 값 저장 확인.
- **meeting_responses row:** 게스트 응답 저장 시 전달된 `inviteToken` 해시되어 `invite_token_hash` 컬럼에 매핑 확인.
- **confirmed_plans row:** (이전 작업본) 정상.
- **status update:** (이전 작업본) 정상.
- **Table Editor 확인:** RLS 기반 구조 및 MVP 제약에 따른 스키마 적합성 확인.

### 10. 회귀 테스트
- **/app:** userProfile 바인딩, Home "만든 모임" & "받은 초대장" Registry 매핑 노출 등 정상 확인
- **/app/meetings:** 모임 리스트 표시 빛 필터 조건 동작 정상
- **/app/create/share:** 공유 카드 동작 이상 없으며 Hash 기반 Link 생성 정상 동작 점검 완료
- **/invite/:meetingId/:token:** URL을 통해 제대로 열리며 Local Storage(Registry)에 열람 기록 남는 것 확인 완료.
- **guest complete:** 응답 저장 시 Local Storage(Registry)에 `respondedAt` 정상 갱신 확인 완료. 
- **/app/me:** MyPage 기능, Data management Custom Modal 삭제 UX 정상. (`window.alert`, `window.confirm` 피함 검증 완료)

### 11. 빌드
- **npm run lint:** 통과
- **npm run build:** 빌드 성공

### 12. 남은 이슈
- RLS Policy 의 권한 검증 수준을 User Session Auth(가입/로그인) 도입 이후 다시 엄격한 Constraint로 강화해야 합니다.
- (당장 폐기하지 않은) DB `token_plain_for_local_mvp_only` 컬럼을 향후 Data Migration 이후 어떻게 Deprecate 시킬 지 절차 고민 필요.

### 13. 다음 작업
1. 계정 및 로그인 연동 (Supabase Auth)
2. 인증된 호스트 기반 Dashbaord 읽기 권한 제약 설계 및 RLS 강화
3. (추후 지원) 외부 캘린더 연동 Flag 켜기 (Google OAuth)

### 14. 검증 검색 결과
- `token_plain_for_local_mvp_only`: (3) - BackendRepository, Mappers
- `invite_token_plain_for_local_mvp_only`: (2) - BackendRepository, Mappers
- `token_hash`: (3)
- `receivedInviteRegistry`: (5)
- `wwm:received-invites`: (2) - Registry, MyPage Screen
- `featureFlags`: (2)
- `window.alert`: 검색 결과 없음 (완전 제거 성공)
- `/invite/demo`: (2) - DebugNavigator (dev mode only), inviteRoutes 의 graceful fallback
