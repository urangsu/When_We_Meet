# When We Meet Result Report Template

이 문서는 작업 완료 후 결과 보고 형식을 고정하기 위한 표준 템플릿이다.  
매 작업 완료 후 작업자는 아래 형식에 맞춰 결과를 보고한다.

---

## 사용 원칙

- 결과 보고는 항상 이 문서의 형식을 따른다.
- 실제 변경 파일과 빌드 결과를 기준으로 작성한다.
- 빌드가 실패했으면 실패 내용을 숨기지 않는다.
- 실제 구현하지 않은 것은 “완료”라고 쓰지 않는다.
- Mock / Prototype / Placeholder 상태는 반드시 명시한다.
- 다음 작업으로 넘겨야 할 이슈는 `남은 이슈`에 남긴다.

---

# 전체 보고 형식

## 작업 결과

### 1. 작업 요약

- 작업명:
- 작업 목적:
- 주요 변경 범위:
- Prototype / Mock 여부:

---

### 2. 수정 파일

- `파일 경로`:
  - 변경 내용:
- `파일 경로`:
  - 변경 내용:

---

### 3. 기능 / 화면 변경

#### 3-1. Host App

- 변경 화면:
- 변경 내용:
- 라우팅 변경:
- Draft / State 연결 여부:
- Mock / Placeholder 여부:

#### 3-2. Guest Web

- 변경 화면:
- 변경 내용:
- 라우팅 변경:
- Draft / State 연결 여부:
- Mock / Placeholder 여부:

#### 3-3. 공통 컴포넌트 / 유틸

- 생성 / 수정 컴포넌트:
- 생성 / 수정 유틸:
- 타입 변경:
- Config 변경:

---

### 4. UX / 카피 / 디자인 변경

- 카피 변경:
- UI 변경:
- 모션 / 인터랙션 변경:
- 접근성 고려:
- 모바일 화면 고려:

---

### 5. 정책 / 문서 변경

- `task.md` 변경 여부:
- `result.md` 변경 여부:
- 정책 문서화 내용:
- 보류한 기능:
- 추후 구현 항목:

---

### 6. 빌드 / 검증

- `npm run lint`:
- `npm run build`:
- TypeScript 에러:
- 런타임 확인:
- 확인한 경로:
  - `/#/app`
  - `/#/app/create/...`
  - `/#/invite/demo/...`

---

### 7. 수동 확인 결과

- 클릭 / 라우팅:
- 모바일 레이아웃:
- BottomCTA 겹침:
- BottomNav 상태:
- Draft 값 유지:
- 삭제 / 관리 모드:
- 모션 자연스러움:

---

### 8. 남은 이슈

- 실제 DB 저장 없음:
- 실제 API 연동 없음:
- 실제 공유 기능 없음:
- 실제 푸시 알림 없음:
- Mock 상태:
- 다음 작업으로 넘길 항목:

---

### 9. 다음 작업 추천

1.
2.
3.

---

# 짧은 보고 형식

작업이 작을 때는 아래 형식을 사용한다.

```text
## 작업 결과

### 1. 수정 파일
-

### 2. 주요 변경
-

### 3. 빌드
- npm run lint:
- npm run build:

### 4. 남은 이슈
-

### 5. 다음 작업
## 작업 결과

### 1. 수정 파일
- src/types/meeting.ts
  - GuestResponseDraft 타입에 `suggestedDateLabels` 속성 추가
- src/state/GuestResponseDraftContext.tsx
  - GuestResponseDraft 기본값에 `suggestedDateLabels` 추가
- src/screens/guest/InviteLandingScreen.tsx
  - 좌상단 작은 back 버튼(`ChevronLeft`) 추가 및 `handleBack` 핸들러 구현
- src/screens/guest/GuestAttendanceScreen.tsx
  - “호스트에게 답장 남기기” 카피 반영
  - “직접 쓰기” chip(`Pencil` 아이콘) 추가
  - 직접 쓰기 선택 시에만 input 노출되도록 변경, 메시지 trim 처리 추가
- src/screens/guest/GuestDateVoteScreen.tsx
  - “다른 날짜 제안하기”, “달력으로 보기” 보조 액션 버튼 추가
  - 날짜 추천 input 패널과 mock 달력(Prototype) 패널 추가
  - 추천한 날짜(`guestAddedDates`) 저장 로직 구성
- src/screens/guest/GuestCompleteScreen.tsx
  - 완료 카피 “답장 보냈어요”로 수정
  - 입력한 닉네임, 참석 여부, 메시지, 날짜, 장소 후보, 활동 등을 정리된 요약 UI로 변경 
- task.md
  - Phase C-2 작업 항목(Prototype) 및 주의사항 기록

### 2. 주요 변경
- 게스트 랜딩 화면 진입 시 뒤로 가기 추가
- 단순히 폼에 입력하는 느낌에서 초대된 게스트가 '답장'을 쓰는 톤앤매너로 개선
- 날짜 후보를 추가하거나(mock) 달력으로 조회하는(mock) 새로운 게스트 상호작용 추가
- 최종 제출 시 내 응답을 시각적으로 더 잘 요약해서 보여줌

### 3. 빌드
- npm run lint: 성공
- npm run build: 성공

### 4. 남은 이슈
- 달력으로 보기는 UI 프로토타입이며, 실제 캘린더 연동 및 달력 기능 없음
- 다른 날짜 추천(`guestAddedDates`)은 DB 연동 전까지 로컬 스테이트의 프로토타입으로만 동작
- 실제 카카오/인스타 DM 등의 공유 및 API/DB 통신 없음

### 5. 다음 작업
- Phase B/C QA 및 화면 최적화 또는 DB 연동 준비 


- “완료”라고 적은 항목은 실제 파일 기준으로 확인 가능해야 한다.
- 기능이 Mock이면 `Mock`, `Prototype`, `Placeholder` 중 하나를 붙인다.
- 새 기능이 아닌 정리 작업이면 `Polish`, `QA`, `Refactor`로 구분한다.
- 결과 보고 후에는 다음 작업 전 `result.md`와 `task.md`를 같이 확인한다.

