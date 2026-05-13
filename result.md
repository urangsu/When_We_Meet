# When We Meet Phase F-2.5: Backend 계약 문서 보강, Repository 타입 안전화, Supabase 전환 전 기준 확정

## 작업 결과

### 1. 수정 파일
- `task.md`
- `result.md`
- `src/repositories/repositoryMode.ts`
- `src/repositories/localMeetingRepository.ts`
- `src/repositories/backendMeetingRepository.ts`
- `src/vite-env.d.ts` (신규, 환경 변수 타입 보강 위해)

### 2. 주요 변경
- `repositoryMode.ts`에서 `as any` 제거 및 `vite-env.d.ts` 추가를 통한 타입 안정성 확보
- `localMeetingRepository.ts` 및 `backendMeetingRepository.ts` 타입 참조를 type-only (`import type`) 로 깨끗하게 분리/정리
- `task.md`에 백엔드 후보, Schema 모델, Invite flow, Confirmed persistence 정책 상세 기입 (Supabase MVP 기준으로 확장)
- `task.md` 모델 구조에 따라 Server-only AI Policy 및 Dependency Audit 최신화
- `task.md`의 다음 작업을 Phase F-3, F-4, F-5 로 최신화

### 3. 빌드
- npm run lint: 통과
- npm run build: 통과

### 4. 남은 이슈
- 아직 실제 백엔드 연동은 없고 `localMeetingRepository`를 Dev Fallback으로 사용
- Supabase SDK 설치 전 단계임

### 5. 다음 작업
1. Phase F-3 — Supabase SDK Install & Client Boundary
2. Phase F-4 — Backend Repository Implementation
3. Phase F-5 — Server-side Invite Validation

### 6. 검증 검색 결과
- as any in repositories/state/screens: 없음 (`src/repositories/repositoryMode.ts` 수정 완료)
- localMeetingRepository references in screens/state/layouts: 없음
- mockMeetingRepository references: 없음
- mockResponses direct import in screens: 없음
- GEMINI_API_KEY references: `./task.md`, `./.env.example`
- @google/genai imports: `./package.json`, `./package-lock.json`
- express imports: `./package.json`, `./package-lock.json`
- dotenv imports: `./package.json`, `./package-lock.json`
- VITE_SUPABASE references: 없음
