// 한국어 영문어 변환
let languageKr = document.getElementById('languageKr');
// 영문
let languageEn = document.getElementById('languageEn');
languageEn.addEventListener('click', function (e) {
    if (languageEn.style.borderBottom = '2px solid red') {
        languageKr.style.borderBottom = 'none'
    }

    currentLang = 'en';
    toggleLanguage();
    e.preventDefault();
});
// 한국어
languageKr.addEventListener('click', function (e) {
    if (languageKr.style.borderBottom = '2px solid red') {
        languageEn.style.borderBottom = 'none'
    }
    currentLang = 'ko'
    toggleLanguage();
    e.preventDefault();
});
let currentLang = 'ko' //현재 언어 한국어

function toggleLanguage() {
    const DataLang = document.querySelectorAll('[data-ko], [data-en]');

    DataLang.forEach(element => {
        if (currentLang === 'ko') {
            element.innerText = element.getAttribute('data-ko');
        } else {
            element.innerText = element.getAttribute('data-en');
        }
    });
    document.documentElement.lang = currentLang; //HTML Lang 속성 변경
}

// header -> hidden 메뉴

let menu = document.querySelector('.menu-line');
let hidden = document.querySelector('#hidden-menu');

menu.addEventListener('click', function () {
    if (hidden.style.display === 'block') {
        hidden.style.display = 'none';
    } else {
        hidden.style.display = 'block';
    }
    let line1 = document.querySelector('.line-up');
    let line2 = document.querySelector('.line-down');
    if(line2.style.transform === 'rotate(45deg)',line1.style.transform === 'rotate(45deg)'){
        line1.style.transform = 'rotate(0deg)'
        line2.style.transform = 'rotate(0deg)'
        
    } else {
        line1.style.transform = 'rotate(45deg)';
        line2.style.transform = 'rotate(-45deg)';
    }
    if(line1.style.top === '-10px'){
        line1.style.top = '0'
    }else {line1.style.top = '-10px'
}
});
//  hidden menu(모바일)
// 모든 h1 요소 선택
let hiddenClicks = document.querySelectorAll('.hiddenClick');
// 이벤트 리스너 등록
hiddenClicks.forEach(click => {
    click.addEventListener('click', function () {
        // 모든 li 초기화 (선택사항: 이전에 열린 것 닫기)
        document.querySelectorAll('.hiddenLi').forEach(li => {
            li.style.height = ''; // 기존 스타일 제거
        });
        
        // 클릭된 h1의 부모 li 높이 설정
        let parentLi = this.closest('.hiddenLi');
        if (parentLi) {
            parentLi.style.height = '185px';
        }
        // 모든 hiddenClick 요소에서 border-bottom 제거
        hiddenClicks.forEach(c => {
            c.style.borderBottom = '';
        });

        // 현재 클릭된 요소에 border-bottom 추가
        this.style.borderBottom = '2px solid #fff';
    });
});

// main video 수정
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let videoLotte = document.getElementById('L-main');
let videoCople = document.getElementById('L-main2');

next.addEventListener('click', function () {
    videoCople.style.display = 'block'
    videoLotte.style.display = 'none'

});
prev.addEventListener('click', function () {
    videoCople.style.display = 'none'
    videoLotte.style.display = 'block'

});

// 마우스 스크롤 이벤트

// 각 섹션을 배열로 저장
const sections = [
    document.getElementById('main'),
    document.getElementById('section2'),
    document.getElementById('section3'),
    document.getElementById('section4'),
    document.getElementById('section5'),
    document.getElementById('footer')
];

// 현재 섹션 인덱스를 추적
let currentSectionIndex = 0;

// 마우스 스크롤 이벤트
let isScrolling = false;

// 스크롤 이벤트 처리 함수
function handleScroll(event) {
    if (isScrolling) {
        return;
    }

    // 스크롤의 방향을 나타내는 deltaY 값 가져오기
    let deltaY = event.deltaY;
    
    // 아래로 스크롤하는 경우
    if (deltaY > 0) {
        currentSectionIndex++;
    }
    // 위로 스크롤하는 경우
    else if (deltaY < 0) {
        currentSectionIndex--;
    }

    // 현재 섹션 인덱스를 배열 범위 내로 제한
    currentSectionIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));

    
    // 스크롤 이동 중 플래그를 활성화
    isScrolling = true;
    // 현재 섹션의 위치로 부드러운 스크롤 이동
    
    setTimeout(function () {
        sections[currentSectionIndex].scrollIntoView({
            behavior: 'smooth'
        });
        isScrolling = false;
    }, 1000)
        
        gsap.to(window,{
            duration : 1.5,
            scrollTo : { y : sections[currentSectionIndex], autoKill: false},
            ease: "power2.out",
            onComplete: ()=>{isScrolling = false;}
        })
        // section2 순차적
        let move = document.querySelector('.move');
        setTimeout(function (){
            document.querySelector('.s2-delay1').classList.add('move');
        },1000);
        setTimeout(function (){
            document.querySelector('.s2-delay2').classList.add('move');
        },2000);
        setTimeout(function (){
            document.querySelector('.s2-delay3').classList.add('move');
        },1500);
        setTimeout(function (){
            document.querySelector('.s2-delay4').classList.add('move');
        },2500);
        setTimeout(function (){
            document.querySelector('.s2-delay5').classList.add('move');
        },3000);
        // section3 순차적
        setTimeout(function (){
            document.querySelector('.left-gnb').classList.add('move');
        },2500);
        setTimeout(function (){
            document.querySelector('.right-gnb').classList.add('move');
        },3000);
}
    


// 마우스 휠 이벤트 리스너 등록
window.addEventListener('wheel', handleScroll);

// section4 숫자 올리기

let currentNumber = 0;
// s4 메인
const s4Number = 4155;
const section4Number = document.querySelector('.s4_number');

const increaseNumber = setInterval(() => {
    currentNumber++;
    section4Number.textContent = currentNumber.toLocaleString();

    // 설정값에 도달하면 반복을 멈춤
    if (currentNumber >= s4Number) {
        clearInterval(increaseNumber);
    }
}, 0.2);

//  등락률
let currentS4Fr = 0;
const s4FrNum = 1.08;
const s4Fr = document.querySelector('.s4Fr');
const s4FrPlus = setInterval(() => {
    currentS4Fr += 0.01;
    s4Fr.textContent = currentS4Fr.toFixed(2);

    // 설정값에 도달하면 반복을 멈춤
    if (currentS4Fr >= s4FrNum) {
        clearInterval(s4FrPlus);
    }
}, 160);

//  전일대비
let currentS4Dod = 0;
const s4DodNum = 45;
const s4Dod = document.querySelector('.s4Dod');
const s4DodPlus = setInterval(() => {
    currentS4Dod++;
    s4Dod.textContent = currentS4Dod.toLocaleString();

    // 설정값에 도달하면 반복을 멈춤
    if (currentS4Dod >= s4DodNum) {
        clearInterval(s4DodPlus);
    }
}, 385);

// 전일종가
let currents4Cp = 0;
const s4CpNum = 4110;
const s4Cp = document.querySelector('.s4Cp');
const s4CpPlus = setInterval(() => {
    currents4Cp++;
    s4Cp.textContent = currents4Cp.toLocaleString();

    // 설정값에 도달하면 반복을 멈춤
    if (currents4Cp >= s4CpNum) {
        clearInterval(s4CpPlus);
    }
}, 0.25);

// IR Code No

let currents4IrCd = 0;
const s4IrCdNum = 393210;
const s4IrCd = document.querySelector('.s4IrCd');

const s4IrCdPlus = setInterval(() => {
    currents4IrCd += 170;
    s4IrCd.textContent = currents4IrCd.toLocaleString();

    if (currents4IrCd >= s4IrCdNum) {
        clearInterval(s4IrCdPlus);
    }
}, 8)


// section5 슬라이더
document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.sliderPrev'); // 이전 버튼
    const nextButton = document.querySelector('.sliderNext'); // 다음 버튼
    const sliderWrapper = document.querySelector('.s5-wrapper'); // 슬라이더 컨테이너
    const items = document.querySelectorAll('.s5-gnb'); // 슬라이드 항목들

    const totalItems = items.length; // 총 항목 수
    const itemWidth = items[0].offsetWidth - 50; // 각 항목의 너비 + 간격 (-20px은 gap)
    let currentIndex = 0; // 현재 인덱스

    // 이전 버튼 클릭 시
    prevButton.addEventListener('click', function () {
        // 현재 인덱스가 0보다 크면 1 감소
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - 1; // 맨 처음으로 돌아감
        }
        updateSliderPosition();
    });

    // 다음 버튼 클릭 시
    nextButton.addEventListener('click', function () {
        // 현재 인덱스가 마지막 항목보다 작으면 1 증가
        if (currentIndex < totalItems - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // 맨 끝에서 첫 번째로 돌아감
        }
        updateSliderPosition();
    });

    // 슬라이더 위치 갱신 함수
    function updateSliderPosition() {
        const offset = -currentIndex * itemWidth; // 이동할 거리 계산
        sliderWrapper.style.transform = `translateX(${offset}px)`; // 슬라이드 이동
    }
});

//  마우스 포인트 변경
// 커서 이미지 경로 설정 (이미지 파일 경로를 입력하세요)
// const mouseImage = '';
        
const mouseElement = document.getElementById('cursor');

// 커서에 이미지 설정
// mouseElement.style.backgroundImage = `url(${mouseImage})`;
mouseElement.style.backgroundSize = 'cover'; // 이미지 크기 맞추기
// mouseElement.style.backgroundColor = 'rgba(255,255,255,0.2)'; // 이미지 크기 맞추기


// 마우스 움직임을 추적하여 커서를 움직임
document.addEventListener('mousemove', (event) => {
    mouseElement.style.left = `${event.pageX - mouseElement.offsetWidth / 2}px`;
    mouseElement.style.top = `${event.pageY - mouseElement.offsetHeight / 2}px`;
});

// 마우스 클릭 시 커서 크기 변화
document.addEventListener('mousedown', () => {
    mouseElement.style.transform = 'scale(0.6)'; // 클릭 시 크기 작아짐
});

document.addEventListener('mouseup', () => {
    mouseElement.style.transform = 'scale(1)'; // 클릭 해제 시 원래 크기로
});
