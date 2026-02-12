# LOTTE CULTUREWORKS Clone (Vanilla JS)

롯데컬처웍스(LOTTE CULTUREWORKS) 웹사이트를 참고해 제작한 **클론/리디자인 프로젝트**입니다.  
메인 비주얼(배경 비디오), **PC 2depth 드롭다운 + 모바일 햄버거 메뉴**, **KOR/ENG 언어 토글**, 섹션 단위 인터랙션(스냅 스크롤/진입 애니메이션/숫자 카운트/슬라이더/커스텀 커서)을 구현했습니다.

---

## Demo
- Live: (여기에 배포 링크 추가)
- GitHub: (여기에 레포 링크 추가)

---

## Preview
> 스크린샷/녹화 GIF가 있다면 여기에 추가하면 포폴 퀄리티가 확 올라가요.
- Main / Header / Hidden Menu
- Section2 (CSV cards)
- Section3 (Video background + overlay)
- Section4 (IR Count)
- Section5 (Slider)

---

## Tech Stack
- **HTML / CSS / Vanilla JavaScript**
- **GSAP (CDN) + ScrollToPlugin**: 섹션 스냅 스크롤
- **Vimeo iframe background video**: Section3 배경 영상

---

## Folder Structure
├─ img/
├─ section5_img/
├─ video/
├─ animate.css
├─ hover.css
├─ index.html
├─ media.css
├─ reset.css
├─ script.js
└─ style.css
---
## Key Features

### 1. KOR/ENG 언어 토글 (data-ko / data-en)
- `data-ko`, `data-en` 속성을 가진 요소를 전부 순회하며 **innerText를 교체**하는 방식으로 구현했습니다.
- `document.documentElement.lang`도 함께 갱신해 문서의 언어 정보가 실제 표시 언어와 일치하도록 했습니다.
- 현재 선택 언어는 underline 스타일로 표시합니다.

**관련 코드**
- `script.js` → `[1] 언어 토글 (KOR/ENG)`

---

### 2. PC GNB 2depth + 모바일 Hidden Menu(햄버거)
- PC에서는 1depth 메뉴 hover 시 **2depth가 펼쳐지는 구조**로 설계했습니다.
- 모바일/축소 환경에서는 PC 메뉴를 숨기고, 햄버거 버튼으로 `#hidden-menu`를 토글합니다.
- 햄버거 아이콘(두 줄)은 open 상태에서 **X 형태로 회전**하도록 처리했습니다.

**관련 코드**
- `script.js` → `[2] 헤더 -> hidden 메뉴 토글`
- `script.js` → `[3] hidden menu(모바일) 아코디언`
- `animate.css/hover.css` → header hover 애니메이션 (`inner-ani`)

---

### 3. 메인 비주얼: 배경 비디오 2종 전환(Prev/Next)
- `#L-main`, `#L-main2` 비디오를 겹쳐 배치하고, prev/next 클릭으로 `display`를 토글해 전환합니다.
- 자동 재생을 위해 `muted/autoplay/playsinline/loop` 기반으로 구성했습니다.

**관련 코드**
- `script.js` → `[4] main video prev/next`

---

### 4. 섹션 스냅 스크롤 (Wheel 기반) + 섹션 도착 이벤트(1회 실행)
- 데스크톱에서는 wheel 입력을 받아 섹션 단위로 이동하는 **스냅 스크롤**을 구현했습니다.
- 이동은 `GSAP ScrollToPlugin`으로 제어해 일정한 속도/완급을 유지합니다.
- 섹션 진입 시 실행되는 효과는 **“1회만”** 동작하도록 플래그(`playedSection2/3/4`)로 관리했습니다.
- 모바일/터치 환경은 스냅 스크롤을 비활성화하고 기본 스크롤 UX를 유지합니다.

**섹션 진입 효과**
- Section2: 카드 리스트가 순차적으로 `move` 클래스를 부여받아 등장
- Section3: 좌/우 리스트가 딜레이 후 `move` 클래스 적용
- Section4: IR 숫자 영역 카운트 애니메이션 실행

**관련 코드**
- `script.js` → `[5] 섹션 스냅 스크롤 + 섹션 도착 시 이벤트 실행`
- `media.css` → `@media (max-width: 550px) { overflow-y: scroll; }`

---

### 5. Section4: 숫자 카운트 애니메이션 (requestAnimationFrame)
- `setInterval` 대신 `requestAnimationFrame`을 사용해 프레임 동기화 기반으로 부드럽게 증가하도록 구현했습니다.
- 정수/소수 포맷을 옵션으로 분리해 재사용 가능한 함수로 구성했습니다.

**관련 코드**
- `script.js` → `animateNumber()`, `playSection4Once()`

---

### 6. Section5: 가로 슬라이더 (Prev/Next)
- `.s5-wrapper`를 `transform: translateX()`로 이동시키는 방식의 슬라이더를 구현했습니다.
- 아이템 width 기반으로 offset을 계산하고, resize 시 갱신하여 반응형에서도 정상 동작하게 구성했습니다.

**관련 코드**
- `script.js` → `[6] section5 슬라이더`
- `style.css` → `.s5-wrapper { transition: transform 0.5s ease; }`

---

### 7. 커스텀 마우스 커서
- 기본 커서 대신 원형 SVG 커서를 마우스 좌표에 맞춰 이동시킵니다.
- mousedown/up 시 scale 변화로 클릭 피드백을 제공합니다.

**관련 코드**
- `script.js` → `[7] 마우스 커서 포인터`
- `style.css` → `#cursor { pointer-events:none; z-index:999; }`

---

### 8. href="#" 더미 링크 클릭 방지
- `href="#"`를 가진 anchor 클릭 시 전역 이벤트로 preventDefault 처리하여 상단 튐을 방지했습니다.

---

## Responsive Design

이 프로젝트는 **PC(몰입형 섹션 스냅 UX)**을 기본으로 하고, 화면이 작아질수록 콘텐츠 밀도와 인터랙션을 단계적으로 줄이는 방식으로 반응형을 설계했습니다.

### 핵심 정책
- **PC(≥ 550px)**: `overflow-y: hidden` + wheel 기반 섹션 스냅 스크롤
- **Mobile(≤ 550px)**: `overflow-y: scroll`로 전환 → 터치 UX 우선

### 브레이크포인트 요약
- `≤ 1700px` : 보조 UI(스크롤 가이드/페이지 버튼) 숨김, 텍스트 크기 축소
- `≤ 1620px` : Section4(IR) 숨김(레이아웃/정보 밀도 조정)
- `≤ 1270px` : PC GNB 숨김, 햄버거 메뉴 중심
- `≤ 1080px` : Section2 5열 → 2열 랩, Section3 iframe → 이미지 대체
- `≤ 700px`  : 메인 비디오 → 모바일 배경 이미지 전환, 언어 토글 숨김
- `≤ 500px`  : Section3 숨김(핵심 섹션 위주로 유지)

---

## Animations & Hover
- 헤더 드롭다운: `inner-ani`로 높이 확장
- 스크롤 유도: `scroll-ani` 반복 이동
- 원형 텍스트: `offset-distance` 기반 `move` 애니메이션
- hover 인터랙션: Section2/5 이미지 원형화, Section4 카드 컬러 반전 등

---

## How to Run
이 프로젝트는 별도 빌드 도구 없이 정적 파일로 실행됩니다.

### 1. 로컬 실행
- `index.html`을 브라우저로 직접 열거나
- VS Code **Live Server** 확장 사용을 권장합니다.

### 2. 주의사항
- 비디오/이미지 경로가 상대경로이므로, 서버 환경에서 실행하면 리소스 로딩이 더 안정적입니다.

---

## Troubleshooting / Notes
- 스냅 스크롤은 연속 wheel 입력으로 과민해질 수 있어 `isScrolling` 플래그로 중복 실행을 방지했습니다.
- 모바일 환경에서는 스냅 스크롤을 끄고 기본 스크롤 UX를 유지했습니다.
- 숫자 카운트는 `requestAnimationFrame` 기반으로 구현해 부드럽고 안정적인 애니메이션을 제공합니다.

---

## Improvements (Next)
- 미디어쿼리 브레이크포인트가 많아지는 문제를 `clamp()`/유동 레이아웃 중심으로 리팩터링 예정
- 숨김 처리된 섹션(IR/Section3 등)은 “요약 카드 버전” 제공으로 콘텐츠 손실 최소화 검토
- 드롭다운 메뉴는 `display/height` 제어 대신 `class toggle + transition` 구조로 개선 여지

---

## Credits
- GSAP (CDN) / ScrollToPlugin
- Vimeo (background video embed)