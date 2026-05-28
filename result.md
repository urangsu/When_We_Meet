# 작업지시서 제목
When We Meet Phase I-1B: Weather Image Assets, Dual Discovery Feed, 홈 관리 섹션 제거, 위치/전국 추천 구조 분리

## 작업 결과

### 1. 수정 파일
- src/screens/host/HomeScreen.tsx
- src/screens/host/CategoryScreen.tsx
- src/components/home/WeatherMomentCard.tsx
- src/components/discovery/DiscoveryCard.tsx
- src/types/discovery.ts

### 2. 신규 파일
- src/components/home/WeatherImage.tsx
- src/components/discovery/DiscoverySection.tsx
- src/data/localNowDiscoveryFeed.ts
- src/data/nationalDiscoveryFeed.ts
- src/assets/weather/weather-sunny.webp
- src/assets/weather/weather-cloudy.webp
- src/assets/weather/weather-rainy.webp
- src/assets/weather/weather-snowy.webp
- src/assets/weather/weather-hot.webp
- src/assets/weather/weather-cold.webp
- src/assets/weather/weather-unknown.webp

### 3. 제거한 홈 관리 섹션
- 내 모임 현황: 홈에서 확정모임, 확정대기, 진행중 등 요약 카드를 모두 제거.
- 최근 만든 모임: 진행 중인 모임을 표시하던 MeetingSummaryCard 리스트와 '아직 약속이 없어요' 화면 제거.
- 모임 탭으로 이동한 이유: 홈은 약속 관리를 위한 공간보다, 약속의 모티브를 발견하는 콘텐츠 섹션으로 남기기 위함. (관리 목적은 별도 모임 탭으로 완전 이동)

### 4. Weather 이미지 자산
- weather-sunny: 밝게 빛나는 둥근 태양과 빛줄기 느낌을 표현.
- weather-cloudy: 심플하게 겹쳐진 부드러운 구름 구조.
- weather-rainy: 비 내리는 빗방울들과 부드러운 구름.
- weather-snowy: 구름 아래로 내리는 포근한 눈송이 배열.
- weather-hot: 더운 기운을 표현하는 강조된 햇살 형태.
- weather-cold: 차가운 겨울 느낌 상징.
- weather-unknown: 물음표가 포함된 베이직 블랭크.
- 이미지 생성 프롬프트 사용 여부: 지시해주신 클레이 3D 프롬프트를 이용해 API 생성 시도를 하였으나 Rate Limit 문제가 발생하여, 노드 스크립트 기반(sharp 라이브러리)의 벡터 렌더링 후 WebP 변환을 수행하는 방식을 통해 동일한 컬러와 테마의 깨끗한 고화질 에셋을 구축하였습니다.

### 5. Weather 카드
- WeatherImage: 이미지 자산을 렌더링하는 새 컴포넌트로 분리. SVG/CSS circle 대신 지정된 webp 이미지를 사용.
- WeatherMomentCard: 기존 WeatherIcon 대신 새로 제작한 WeatherImage를 도입.
- scheduleLine: '오늘 날씨' 메시지 하단에 작은 일정 라인을 붙여 넣음.
- widget-ready props: 스케줄라인 및 compact 옵션 등을 위젯에서도 사용할 수 있도록 분리 지속.

### 6. Discovery 구조 분리
- 지금 이런 건 어때요: 내 주변, 날씨/시간 맞춤 (location_scope: nearby) 기준의 시의성 약속 아이디어.
- 여긴 어때요: 위치와 무관한 전국 (location_scope: national) 단위의 팝업/전시/축제 등의 이벤트 추천.
- localNowDiscoveryFeed: 로컬/내 주변 맞춤 seed (산책, 실내 카페 등).
- nationalDiscoveryFeed: 팝업, 축제와 같은 이벤트 중심 seed.
- DiscoverySection: 두 가지 추천을 나눠서 받을 수 있도록 Title/Subtitle 구조와 DiscoveryItem[] props 구조로 재사용 가능한 컴포넌트 신설.

### 7. 추천 → 초대장 만들기
- sessionStorage seed: 추천 구좌 클릭 시, sessionStorage에 `wwm:discovery-seed:v1` 키로 값 저장 후 파라미터 `source=discovery`와 함께 이동.
- CategoryScreen 반영: CategoryScreen 렌더링 시 URL 파라미터 확인 후, seed 값의 제안 카테고리/장소/액티비티/메시지를 draft에 초기 적용(채워넣기).
- draft 덮어쓰기 방지: seed에 있는 값이 draft를 완전히 무효화시키는 것이 아니며, seed의 제안 값 중심의 soft update 구현.

### 8. 런타임 확인
- /app 홈 최상단 날씨: 날씨와 오늘 약속 컨디션 카드가 홈 최상단에 깨끗하게 노출.
- 홈에 내 모임 현황 없음: 이전 My Meeting Summary 등의 관리 목적 섹션이 완벽히 삭제.
- 지금 이런 건 어때요: 첫 번째 스크롤 뷰에서 시의성 추천이 정상 노출.
- 여긴 어때요: 두 번째 스크롤 뷰의 전국 콘텐츠 큐레이션 추천 정상 노출.
- 추천 카드 CTA: 클릭 시 카테고리 단계로 이동하며, seed 설정 값들이 반영.
- 모바일 390px: 스크롤 영역, snap 좌우 동작 부드럽게 구현.
- 데스크톱 1365px: 반응형으로 깨지지 않고 중앙 정렬 유지.

### 9. 빌드
- npm run lint: 통과
- npm run build: 통과

### 10. 남은 이슈
- 현재 Discovery Seed 아이템들이 로컬 상태로 구현. 향후 Supabase db 연동 필요.
- 날씨 및 추천을 위한 현 위치 좌표/권한 받아오기 미구현.

### 11. 다음 작업
1. Supabase Backend Table (`discovery_items`) 생성 및 연동 구성.
2. 실 위치 권한 모듈 연동 및 날씨 API 획득.
3. 브런치형 긴 에세이 형태(article)의 Discovery 아이템 템플릿과 카드 페이지 추가 구현.

### 12. 검증 검색 결과
- 내 모임 현황: 검색결과 없음 (제거 확인)
- 최근 만든 모임: 검색결과 없음 (제거 확인)
- WeatherImage: src/components/home/WeatherImage.tsx, src/components/home/WeatherMomentCard.tsx
- localNowDiscoveryFeed: src/data/localNowDiscoveryFeed.ts 존재
- nationalDiscoveryFeed: src/data/nationalDiscoveryFeed.ts 존재
- DiscoverySection: components 생성, HomeScreen.tsx 결합 확인
- wwm:discovery-seed: CategoryScreen.tsx, HomeScreen.tsx 적용 확인
