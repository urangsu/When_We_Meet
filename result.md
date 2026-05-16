# 작업지시서 제목
When We Meet Phase V-1.4: Welcome 봉투 비주얼 전면 재설계 + 인장 자산 분리 + 오프닝 UX 정리

## 작업 결과

### 1. 수정 파일
- /src/components/invite/SignatureEnvelope.tsx
- /src/components/invite/InvitationOpeningMotion.tsx

### 2. 신규 파일
- 없음 (기존 SignatureEnvelope 수정)

### 3. 기존 문제
- 중앙 X 라인이 찢김처럼 보였음
- top flap이 사각형처럼 보였음
- seal이 단색 점처럼 보였음
- welcome CTA 흐름이 어색했음 (WelcomeInviteOverlay는 이미 O-0.7에서 안정화됨)

### 4. 봉투 구조 수정
- top flap: clip-path 기반 삼각형 구현 완료
- X라인 제거 완료: SVG 내 모든 X 라인 삭제
- front folds: 좌우 및 하단 삼각 접힘 구현 유지 및 정리

### 5. 인장 수정
- SVG 인장 구현: div 기반 flat seal을 SVG 기반의 embossed 느낌 seal로 교체
- 시그니처 마크: 인장 내부에 white 색상의 star(diamond) 심볼 추가 및 중앙 정렬

### 6. Welcome UX 수정
- (O-0.7에서) 닫힌 상태: 봉투와 열기 버튼으로 명확화
- (O-0.7에서) 열린 상태: 소개 문구와 CTA 명확화
- CTA 폭 제어: O-0.7에서 완료된 max-width 구조 유지
- 스킵 위치: 프레임 내 상단 유지

### 7. 기타 검토
- MeetingInfoScreen 메시지 UX: 추천 문구 UX가 존재하며, 초대장 내 메시지 노출 품질 보정은 SignatureEnvelope에서 수행함
- Received invite와의 공통화 포인트: ReceivedInviteCard 및 InviteShareCard에서 향후 SignatureEnvelope 재사용 필요 (분리 완료)
- 후속 작업 필요사항: 상세 초대장 템플릿 별 envelope 스타일링 (V-2)

### 8. 빌드
- npm run lint: 성공
- npm run build: 성공

### 9. 남은 이슈
- 없음

### 10. 다음 작업
1. Phase V-2 — Invitation Template Variants
2. Phase G-1 — BrowserRouter + Vercel Rewrite
3. Phase S-1 — Share Card Template System

### 11. 검증 검색 결과
- SignatureEnvelope: 구현 및 X라인 제거 완료
- seal: SVG 기반 embossed seal로 교체 완료
- InvitationOpeningMotion: 고도화된 SignatureEnvelope 사용 완료
- 초대장 열어보기: Welcome layout에 재정립됨
- 새 초대장 만들기: MeetingInfoScreen에서 명칭 확인
