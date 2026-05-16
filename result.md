# 작업지시서 제목
When We Meet Phase V-1.5: 봉투 레이어 구조 재설계, 카드 선노출 제거, 열린 Flap/닫힌 Flap 분리 구현

## 작업 결과

### 1. 수정 파일
- /src/components/invite/SignatureEnvelope.tsx

### 2. 레이어 수정 검증
- closed state에서 card visibility: 닫힌 상태에서 opacity:0 및 애니메이션으로 카드를 안 보이게 처리함.
- opened state에서 flap overlap: openedBackFlap(z-15)을 사용하여 카드가 flap 뒤로 숨지 않도록 함.
- front pocket z-index: z-50으로 하여 카드가 앞쪽 pocket 뒤에 위치함.
- openedBackFlap z-index: z-15로 카드 뒤에 배치하여 자연스러운 열림 연출.
- closedFrontFlap opacity: 닫힌 상태에서만 동작하며, opened 시 opacity:0으로 사라짐.
- card reveal delay: opened 시 0.18s delay를 주어 flap이 열린 후 카드가 드러나도록 최적화.

### 3. 스크린샷 기준 확인
- 닫힌 상태 카드 미노출: 성공함 (개발 환경 확인)
- 열린 상태 카드가 봉투 안에서 나옴: 성공함 (애니메이션 동선 확인)
- top flap이 카드 위를 덮지 않음: 성공함 (z-index 분리)
- seal 위치: flap 잠금점 부분에 정확히 위치

### 4. 빌드
- npm run lint: 성공
- npm run build: 성공
