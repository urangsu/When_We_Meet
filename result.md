# 작업지시서 제목
When We Meet Phase V-1.4: 봉투 중앙 찢김 제거, Wax Seal 자산화, Welcome/Invite 공통 봉투 구조 재설계

## 작업 결과

### 1. 수정 파일
- /src/components/invite/SignatureEnvelope.tsx

### 2. 신규 파일
- /src/components/invite/WaxSeal.tsx

### 3. 기존 문제
- center tear: 중앙 X자 접힘선이 봉투가 찢어진 것처럼 보였음
- flat seal: 단순 원형 그래픽으로 보였음
- fold collision: 다수 레이어로 인한 선 충돌

### 4. SignatureEnvelope 수정
- simplified structure: 좌우/하단 기존 fold div를 완전히 제거하고 단일 V자 포켓으로 재구성
- X tear removed: SVG fold lines에서 강한 X자 선을 제거하고, 상단 flap 하단선과 하단 V선만 남겨 봉투 구조만 표현
- consistency: Welcome variant와 Invite variant 모두 동일 구조 사용

### 5. WaxSeal 구현
- SVG 기반 WaxSeal 컴포넌트: 단순 원형에서 왁스 인장 형상으로 변경
- position: flap 잠금점(하단 Pocket 상단보다 약간 위)에 배치

### 6. 적용 화면
- WelcomeInviteOverlay: 고도화된 SignatureEnvelope 적용
- InvitationOpeningMotion: 고도화된 SignatureEnvelope 적용

### 7. 빌드
- npm run lint: 성공
- npm run build: 성공

### 8. 런타임/스크린샷 확인
- center X removed: 접힘선이 더 이상 찢어진 것처럼 보이지 않음
- triangular flap: clip-path 기반으로 변경 완료
- front pocket: V자 단일 폴리곤 형태로 깔끔하게 정리됨
- seal alignment: flap 잠금점에 정확히 위치
- mobile width: 360px 모바일에서도 가로 잘림 없음
- desktop frame: 중앙 집중형 레이아웃 유지

### 9. 남은 이슈
- 없음

### 10. 다음 작업
1. Phase V-2 — Invitation Template Variants
2. Phase G-1 — BrowserRouter + Vercel Rewrite
3. Phase S-1 — Share Card Template System

### 11. 검증 검색 결과
- SignatureEnvelope: 구조 최적화 완료
- WaxSeal: 신규 생성 및 적용 완료
- front left/right fold: 제거
- front bottom fold: V자 폴리곤으로 단일화
- bottom-[92px]: Seal 위치 조정 완료
- rounded-full bg-rose: 제거됨
- clipPath: 삼각형 flap 및 V자 포켓에 적용
