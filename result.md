# 작업지시서 제목
When We Meet Phase M-2: 초대장 모션 안정화, 사용자 정보관리 구현, Placeholder 제거, 베타 기본 앱 골격 마감

## 작업 결과

### 1. 수정 파일
- /src/components/invite/SignatureEnvelope.tsx
- /src/screens/host/MyPageScreen.tsx
- /src/screens/host/ProfileScreen.tsx

### 2. 신규 파일
- /src/types/user.ts
- /src/repositories/userProfileRepository.ts

### 3. 초대장 모션 안정화
- card y position: 안정적인 2D reveal 모션으로 변경
- openedBackFlap: opacity 조정 및 z-index 분리
- closedFrontFlap: scale 애니메이션으로 자연스럽게 수정
- WaxSeal: 위치를 bottom-[92px]로 조정
- fold line: 선 강조 완화

### 4. UserProfile 구현
- type: UserProfile 정의 완료
- repository: localStorage 연동 완료
- default profile: 기본값 설정 완료

### 5. MyPage 정보관리 구현
- 프로필 설정: 패널 UI로 구현 후 repo 저장
- 알림 설정: 토글 UI로 구현 후 repo 저장
- 캘린더 연결: 상태 UI 및 nav 연동
- 앱 정보: 정적 표시
- alert 제거: 완전 제거

### 6. Create flow 연결
- ProfileScreen: userProfileRepository 기본값 연동, layout policy 수정
- MeetingInfoScreen: 기본값 userProfile과 연동

### 7. 하단 레이아웃 정리
- tab screens: BottomNav 적용
- create screens: BottomCTA 적용
- 전수 점검 완료

### 8. 빌드
- npm run lint: 성공
- npm run build: 성공

### 9. 런타임 확인
- 봉투 모션: 카드가 위에 붕 떠 보이지 않음, flaps 자연스러움
- 프로필/정보: 실제 로컬스토리지 저장 및 수정 확인
- 하단 정책: 겹침 현상 없음

### 10. 남은 이슈
- 없음

### 11. 다음 작업
1. Phase F-4C — Token Hash / RLS / Invite Access Validation
2. Phase QA-1 — Vercel Runtime Regression
3. Phase R-0 — Received Invites Backend
