# 작업지시서 제목
When We Meet Phase F-4B: Supabase Repository Query Implementation — 실제 초대장 생성·게스트 응답·확정 플랜 백엔드 연결

## 작업 결과

### 1. 수정 파일
- src/repositories/backendMeetingRepository.ts
- src/repositories/supabaseMeetingMappers.ts
- task.md
- result.md

### 2. 주요 변경
- `backendMeetingRepository.ts`의 모든 `notImplemented` 메서드를 제거하고 실제 Supabase Query로 구현하였습니다.
- `supabaseMeetingMappers.ts`의 `ConfirmedPlan` 매핑 관련 타입을 `string | null`로 보강하고 `toConfirmedPlan` 매핑 로직에서 null을 `undefined`로 안전하게 변환하도록 수정하였습니다.
- `backendMeetingRepository.ts`에 `createToken`, `throwIfError` 헬퍼를 추가하여 프로토타입 데이터를 생성하고, 에러를 명확하게 관리하도록 표준화하였습니다.
- `task.md`를 업데이트하여 Phase F-4B 완료 및 다음 F-4C 로드맵을 정리하였습니다.

### 3. 구현한 Repository 메서드
- createMeetingWithInviteLink: `meetings` 테이블 insert 및 `invite_links` 테이블 insert 구현.
- getMeetingByInvite: `invite_links` 조회 후 `is_closed` 검증 및 `meetings` 조회 구현.
- submitGuestResponse: `meeting_responses`에 idempotency 체크 후 insert 구현.
- getMeetingResponses: `meeting_responses` 테이블 조회.
- confirmPlan: `confirmed_plans` 테이블 upsert 및 `meetings` status update 구현.
- getConfirmedPlan: `confirmed_plans` 테이블 조회.
- getMeetingById: `meetings` 테이블 조회.

### 4. 빌드
- npm run lint: 성공
- npm run build: 성공

### 5. Supabase Dashboard 확인 필요
1. SQL Editor에서 테이블 생성 확인 및 RLS policy 적용 확인.
2. 각 메서드 호출 후 `meetings`, `invite_links`, `meeting_responses`, `confirmed_plans` 테이블에 Row가 정상적으로 적재되는지 확인.

### 6. 남은 이슈
- F-4C 단계에서 보안(token hash, expires_at/max_responses/is_closed enforcement, RLS)을 강화할 예정.

### 7. 다음 작업
1. Phase F-4C — RLS / Token Validation
2. Phase G-1 — BrowserRouter + Hosting Rewrite
3. Phase V-1 — Kakao / OG Share Polish

### 8. 검증 검색 결과
- notImplemented: 확인 결과 존재하지 않음 (정상).
- createMeetingWithInviteLink: 구현 완료.
- getMeetingByInvite: 구현 완료.
- submitGuestResponse: 구현 완료.
- getMeetingResponses: 구현 완료.
- confirmPlan: 구현 완료.
- getConfirmedPlan: 구현 완료.
- getMeetingById: 구현 완료.
- token_plain_for_local_mvp_only: 구현에서 사용 확인.
- SUPABASE_SERVICE: 노출 없음.
