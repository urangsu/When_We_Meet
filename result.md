# When We Meet Phase I-1A: Weather Moment 홈 카드, 위젯 준비형 홈 구조, Discovery 피드 재정렬

## 작업 결과

### 1. 수정 파일
- `src/screens/host/HomeScreen.tsx`

### 2. 신규 파일
- `src/components/home/WeatherIcon.tsx`
- `src/components/home/WeatherMomentCard.tsx`
- `src/data/weatherMomentSeed.ts`
- `src/repositories/weatherMomentRepository.ts`
- `src/components/discovery/DiscoveryCard.tsx`
- `src/data/discoveryFeed.ts`
- `src/types/discovery.ts`

### 3. Weather Moment Card
- **WeatherIcon:** sunny, cloudy, rainy, snowy, cold, hot, unknown에 따른 귀여운 앱 시그니처 톤의 오리지널 SVG 아이콘 생성 적용
- **WeatherMomentCard:** 레이아웃 구현 및 스타일 적용
- **condition:** sunny 지정 
- **shortForecast:** 오후엔 햇살이 조금 더 따뜻해져요
- **suggestion:** 가볍게 산책 약속 잡기 좋은 날이에요. 무거운 외투는 두고 가도 좋아요.
- **scheduleLine:** 진행 중인 모임(내 일정) 중 최신 항목 1개 표출. 없으면 "아직 예정된 일정이 없어요" 표시
- **compact prop:** 추후 위젯 사이즈를 대비한 compact 모드 레이아웃(간단 버전) 구현

### 4. 홈 구조 변경
- **기존 홈 구조:** 작은 인사 + 큰 퀵 액션 버튼 + 요약 + 빠른 초대 설정 
- **변경된 홈 구조:** 인사 + Weather Moment + 작은 퀵 액션 + Discovery Feed + 요약 섹션 순 구역 설정
- **Weather 최상단:** 홈 진입 시 배경 및 오늘/매일의 분위기를 만들어 줄 수 있도록 최상단 배치
- **Quick Actions 위치:** Weather 밑으로 크기를 줄여(카드 비율 축소) 배치
- **Discovery Feed 위치:** 나만의 일정/약속이 없을 때도 진입할 수 있도록 퀵 액션 밑으로 이동
- **기존 모임 관리 섹션 위치:** 하단으로 내려와 '내 모임 현황' 형태 요약 카드로 정리

### 5. 위젯 준비
- **compact mode:** `compact={true}` 속성에 따라 축소형 위젯 레이아웃 지원
- **data contract:** `defaultWeatherMoment`와 `WeatherMomentCardProps` 간 명확한 데이터 분리
- **weather repository:** `weatherMomentRepository.ts`를 Scaffold 형태로 뚫어두어 렌더/데이터 로직 분리
- **future API 연결 지점:** `getTodayMoment()` 함수 내부에 location permission/Weather API 연동 예정 포인트 남김

### 6. 배경 설정 호환
- **white background:** `bg-white/90` 와 border 로 자연스러운 가독성 및 계층 유지
- **warm ivory:** 부드러운 앱 배경(bg-bg-app)색과 카드가 조화롭게 매칭(투명도 90)
- **mist blue:** 배경이 달라도 흰색 기반 겹침이 이루어져 색감 침해 방지
- **card readability:** 내부 suggestion 영역은 bg-bg-app로 다르게 주고 inset-shadow 이용, scheduleLine 볼릿은 primary 액센트로 주어 배경이 어떻든 텍스트 독립성 획득

### 7. 빌드
- **npm run lint:** 통과 성공
- **npm run build:** 빌드 성공

### 8. 런타임 확인
- **/app Weather card:** 표시 확인 (정상 렌더링)
- **sunny icon:** SVG CSS Shadow 적용되어 노랑/갈색의 귀여운 아이콘 표출 확인
- **schedule line:** 등록 한 일정 있을 시/없을 시 조건 상태 검증 확인
- **background switch:** 테마 호환성 확인
- **mobile 390px:** 상하 스크롤 구조 및 횡스크롤 스냅(Discovery) 여백 확인
- **desktop 1365px:** max-w 유지 및 깨짐 없음 확인

### 9. 남은 이슈
- 네이티브 기기 위치 정보를 바탕으로 한 실제 날씨 API(기상청, 오픈웨더 등) 연동 미구현 (현재 Scaffold / Mock 상태)
- AI를 통한 날씨 기반 문구(suggestion) 다변화 로직 부재 (현재 고정 텍스트)

### 10. 다음 작업
1. 날씨 API(OpenWeather API 등) 연동을 통한 실시간 정보 주입
2. AI 프롬프트를 활용해 기상별 다양한 suggestion 변산 자동 생성 기능 (백엔드 Edge Function)
3. App Widget / iOS 플랫폼 등 Native 단 위젯 출력 연동 작업

### 11. 검증 검색 결과
- `WeatherMomentCard`: (2) - HomeScreen, Repo
- `WeatherIcon`: (2) - WeatherMomentCard, WeatherIcon component 
- `weatherMomentRepository`: (2) - HomeScreen, Repo
- `appBackgroundId`: User Profile / 테마 연동 정상 유지
- `DiscoveryCard`: (2) - HomeScreen, DiscoveryCard component
