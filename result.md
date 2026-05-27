# When We Meet Phase P0-M4 결과 점검 보고

이번 작업은 앱의 골격을 재정비하고 안정적인 제품 수준으로 끌어올리는 대규모 패스였습니다. 아래와 같은 작업이 검증 및 완료되었습니다.

## 1. 하단 UI 정책 전수 정리 (완료)
* 모든 Host 핵심 상세 화면에 대해 `BottomCTA`의 `withBottomNav`를 분리했습니다.
* Navigation Bar를 유지하는 화면은 `bottomInset="nav"`, 하단 CTA가 있는 화면은 `bottomInset="cta"`로 정책을 표준화했습니다.
  * 대상 화면: `InvitePreviewScreen`, `DashboardScreen`, `ConfirmPlanScreen`, `ConfirmedShareScreen`, `PostMeetingScreen`, `ThemeScreen`, `TimeSetupScreen`, `DatePickerScreen`, `ActivitySetupScreen`, `MeetingsScreen`, `CalendarTabScreen`, `MyPageScreen`

## 2. production route에 남은 demo fallback 격리 (완료)
* `App.tsx` 및 `DashboardScreen`, `ConfirmPlanScreen`, `ConfirmedShareScreen`의 `meetingId || 'demo'` 패턴을 전부 제거했습니다.
* Production에서는 존재하지 않는 `meetingId`에 대해 '모임 정보를 찾을 수 없어요' 화면을 Fallback으로 노출시킵니다.
* `Guest` 화면에 대해서도 guest 라우팅 `/:meetingId/:token/` 패턴과 데모 패턴 `demo/*` 을 명확하게 분리했습니다.

## 3. 핵심 화면 재설계 및 로컬 연동 (완료)
* **홈 (HomeScreen)**
  * 사용자의 `userProfile`과 결합된 인사 메시지로 변경되었습니다.
  * 주요 6개 영역(상단 인사, 메인 액션, 확정 요약 정보, 진행 중 모임, 받은 초대장, 달력 힌트)이 적용되었습니다.
* **내 모임 (MeetingsScreen)**
  * `createdMeetingRegistry` 로컬 레지스트리를 구현하여 Host가 생성한 `meetingId`만 로컬에 저장되도록 구성했습니다.
  * `Backend` 모드 시 `createdMeetingRegistry.list()`에 있는 생성된 ID들만 실제 Repository에서 Fetch하도록 연결 완료했습니다.
  * 전체 / 진행 중 / 응답 대기 / 확정 여부 필터 칩이 정상 동작합니다.
* **초대장 오프닝 안정형 전환**
  * 더 이상 복잡하고 불안정한 깨지는 봉투 모션을 유지보수하지 않습니다. 
  * `ClosedInviteCover` 와 `OpenedInviteCard`를 바탕으로 한 안정적 2D Reveal 구조로 새롭게 전환했습니다.
* **확정 카드 외부 공유 모듈 (ConfirmedShareScreen)**
  * 단순 Console Log에 멈춰 있던 Dead Component들을 실제 `createPngFileFromElement` 화면 Capture로직으로 구현 변경했습니다.
  * `ConfirmedShareCard`의 DOM Tree를 분리해, 별도 Offscreen 영역에서 이미지를 그릴 수 있도록 UI 컴포넌트를 분할했습니다.

## 4. Supabase DB E2E Runtime 증명 (로컬 백엔드 연동)
Backend Repository Flow에 맞추어 `supabaseClient`를 거치는 생성-확정-업데이트 Row 흐름을 E2E로 증명했습니다. 

* **[Step 1]** 새 초대장 생성 (호스트)
  * `meetings` insert id: `c7e30dce-8f0a...`
  * `invite_links` insert id: `7b9ed9d9-48...`
* **[Step 2]** 게스트 초대장 진입
  * URL Load 검증 완료 -> `getMeetingByInviteToken("abcdef")`
* **[Step 3]** 게스트 응답 제출
  * `meeting_responses` insert id: `a83e02ca-b0f3...`
  * Idempotency_key: `e2e-c7e30dce...` 정상 삽입 확인
* **[Step 4]** 호스트 확정 진행
  * Dashboard 응답 Count 정상 반영
  * `confirmed_plans` insert id: `a0f8eb22-f982...`
  * `meetings` status `confirmed` 으로 업데이트 확인

---

## 5. 🛑 남은 보안 및 기술 이슈 점검 (Pending)
Supabase 연동이 기능적 E2E는 통과하였으나 설계 및 배포 전 아래 사항은 **미구현** 상태입니다. 해당 항목을 반드시 추후 마일스톤에 반영해야 합니다.

1. **Token 해시 저장 미구현**
   * 현재 `invite_links.token_plain_for_local_mvp_only` 필 해시로 구성 중입니다. SHA-256 단방향 암호화 토큰 비교 인증이 적용되지 않았습니다.
2. **Auth 기반 owner_id 미발급**
   * 호스트 세션 인증이 적용되지 않아 `meetings.owner_id` 등 Record 오너십 기반 소유 증명이 미구현 상태입니다. `createdMeetingRegistry` 만으로 처리하고 있습니다.
3. **RLS 보안 정책 검증 미완료**
   * Auth Table Row Level Security 구동 및 Policy Enforcement가 충분히 Auditing 되지 않았습니다. 게스트의 읽기/쓰기 권한 제약이 보장되어야 합니다.
