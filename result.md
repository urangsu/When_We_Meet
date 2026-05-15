# 작업지시서 제목
When We Meet Phase F-4A: Supabase Backend Preflight, Client Dependency 정리, Schema 계약 고정

## 작업 결과

### 1. 수정 파일
- `package.json`
- `package-lock.json`
- `src/repositories/backendMeetingRepository.ts`
- `docs/backend-schema.md` (신규)
- `supabase/schema.sql` (신규)
- `src/repositories/supabaseMeetingMappers.ts` (신규)
- `task.md`
- `result.md`

### 2. 주요 변경
- 클라이언트 번들에서 불필요한 AI/서버 전용 패키지(`@google/genai`, `dotenv`, `express`, `@types/express`)를 `npm uninstall` 명령어를 통해 완전히 제거 및 `package.json` / `lockfile` 갱신을 완료했습니다.
- 백엔드 연동 전의 Schema 형태를 문서화하기 위해 `docs/backend-schema.md` 파일에 MVP 버전과 토큰 해시 전략, 응답 모델을 명확히 정의했습니다.
- 위 스키마 문서를 바탕으로 Supabase의 DB 테이블을 생성할 수 있는 최초의 DDL 초안인 `supabase/schema.sql` 파일을 작성했습니다.
- Supabase Row 데이터와 프론트엔드의 비즈니스 타입(`MeetingRecord`, `InviteLink`, `MeetingResponse`, `ConfirmedPlan`)을 서로 변환하기 위한 Mapper 스켈레톤(`supabaseMeetingMappers.ts`)을 구현했습니다.
- `backendMeetingRepository.ts`의 구현되지 않은 에러 메시지를 `Phase F-4 must provide the real Supabase adapter`로 명료화했습니다.
- `task.md`를 업데이트하여 백엔드 구현 과정을 단계(F-4A/B/C)로 나누어 로드맵과 넥스트 스텝으로 정리했습니다.

### 3. 빌드
- npm uninstall: 성공, 의존성 제거 완료.
- npm run lint: 성공, Mapper 스켈레톤의 타입 문제 없음.
- npm run build: 성공.

### 4. 남은 이슈
- RLS 정책과 Row Level Query, Idempotency 등은 아직 실제 기능으로 구현되지 않았으며 `Phase F-4B`, `Phase F-4C`에서 진행되어야 합니다.

### 5. 다음 작업
1. Phase F-4B — Supabase Repository Query Implementation (실 구현체 작업)
2. Phase F-4C — RLS / Token Validation (권한 제어 및 서버사이드 토큰 인증 로직 구현)
3. Phase G-1 — BrowserRouter + Hosting Rewrite

### 6. 검증 검색 결과
- @google/genai: npm에서 삭제되었고, package.json 내역 없음. src에서 import 하는 코드 없음.
- dotenv: npm에서 삭제되었고, package.json에 없음.
- express: npm에서 삭제되었고, package.json에 없음.
- @types/express: devDependencies에서 정상 제거.
- notImplemented: `backendMeetingRepository.ts`에 존재(예상된 에러). 다른 폴더에서 잘못 퍼진 것 없음.
- Phase F-3: `task.md` 과거 본래 내용으로만 표시, `backendMeetingRepository.ts` 및 에러 구문에서는 F-4로 정상 대체.
- VITE_SUPABASE: `src/lib/supabaseClient.ts`, `src/vite-env.d.ts` 내에 안전하게 보존 중.
- SUPABASE_SERVICE: `.env` 또는 코드에 노출 사항 없음. 오직 문서상에만 안내됨.
- backend schema docs: `docs/backend-schema.md` 생성되어 존재.
- supabase schema sql: `supabase/schema.sql` 생성되어 존재.
- supabase mappers: `src/repositories/supabaseMeetingMappers.ts` 생성 후 타입 검증 완료.