document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------
    // [1] 언어 토글 (KOR/ENG)
    // -----------------------------
    const languageKr = document.getElementById("languageKr");
    const languageEn = document.getElementById("languageEn");

    let currentLang = "ko"; // 기본 한국어

    function toggleLanguage() {
        const DataLang = document.querySelectorAll("[data-ko], [data-en]");
        DataLang.forEach((el) => {
            const ko = el.getAttribute("data-ko");
            const en = el.getAttribute("data-en");
            if (currentLang === "ko") {
                if (ko !== null) el.innerText = ko;
            } else {
                if (en !== null) el.innerText = en;
            }
        });
        document.documentElement.lang = currentLang;
    }

    if (languageEn) {
        languageEn.addEventListener("click", (e) => {
            e.preventDefault();
            languageEn.style.borderBottom = "2px solid red";
            if (languageKr) languageKr.style.borderBottom = "none";
            currentLang = "en";
            toggleLanguage();
        });
    }

    if (languageKr) {
        languageKr.addEventListener("click", (e) => {
            e.preventDefault();
            languageKr.style.borderBottom = "2px solid red";
            if (languageEn) languageEn.style.borderBottom = "none";
            currentLang = "ko";
            toggleLanguage();
        });
    }

    // 최초 1회 적용(혹시 기본이 ko라도 data-ko가 적용되게)
    toggleLanguage();

    // -----------------------------
    // [2] 헤더 -> hidden 메뉴 토글
    // -----------------------------
    const menu = document.querySelector(".menu-line");
    const hidden = document.querySelector("#hidden-menu");

    if (menu && hidden) {
        menu.addEventListener("click", () => {
            const isOpen = hidden.style.display === "block";
            hidden.style.display = isOpen ? "none" : "block";

            const line1 = document.querySelector(".line-up");
            const line2 = document.querySelector(".line-down");

            if (line1 && line2) {
                if (!isOpen) {
                    // 열기
                    line1.style.transform = "rotate(45deg)";
                    line2.style.transform = "rotate(-45deg)";
                    line1.style.top = "-10px";
                } else {
                    // 닫기
                    line1.style.transform = "rotate(0deg)";
                    line2.style.transform = "rotate(0deg)";
                    line1.style.top = "0";
                }
            }
        });
    }

    // -----------------------------
    // [3] hidden menu(모바일) 아코디언
    // -----------------------------
    const hiddenClicks = document.querySelectorAll(".hiddenClick");
    hiddenClicks.forEach((clickEl) => {
        clickEl.addEventListener("click", function () {
            // 전체 닫기
            document.querySelectorAll(".hiddenLi").forEach((li) => {
                li.style.height = "";
            });

            // border 초기화
            hiddenClicks.forEach((c) => (c.style.borderBottom = ""));

            // 열기
            const parentLi = this.closest(".hiddenLi");
            if (parentLi) parentLi.style.height = "200px";
            this.style.borderBottom = "2px solid #fff";
        });
    });

    // -----------------------------
    // [4] main video prev/next
    // -----------------------------
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const videoLotte = document.getElementById("L-main");
    const videoCople = document.getElementById("L-main2");

    if (next && videoCople && videoLotte) {
        next.addEventListener("click", () => {
            videoCople.style.display = "block";
            videoLotte.style.display = "none";
        });
    }
    if (prev && videoCople && videoLotte) {
        prev.addEventListener("click", () => {
            videoCople.style.display = "none";
            videoLotte.style.display = "block";
        });
    }

    // -----------------------------
    // [5] 섹션 스냅 스크롤 + 섹션 도착 시 이벤트 실행
    // -----------------------------
    const sections = [
        document.getElementById("main"),
        document.getElementById("section2"),
        document.getElementById("section3"),
        document.getElementById("section4"),
        document.getElementById("section5"),
        document.getElementById("footer"),
    ].filter(Boolean);

    let currentSectionIndex = 0;
    let isScrolling = false;

    // ---- 섹션 도착 이벤트: "한 번만" 실행 플래그 ----
    let playedSection2 = false;
    let playedSection3 = false;
    let playedSection4 = false;

    // ---- section2: delay 카드 순차 move ----
    function playSection2Once() {
        if (playedSection2) return;
        playedSection2 = true;

        const order = [".s2-delay1", ".s2-delay2", ".s2-delay3", ".s2-delay4", ".s2-delay5"];
        order.forEach((sel, i) => {
            const el = document.querySelector(sel);
            if (!el) return;
            setTimeout(() => el.classList.add("move"), 250 + i * 180);
        });
    }

    // ---- section3: left/right gnb move ----
    function playSection3Once() {
        if (playedSection3) return;
        playedSection3 = true;

        const left = document.querySelector(".left-gnb");
        const right = document.querySelector(".right-gnb");

        //  move 클래스 기반 유지
        setTimeout(() => left && left.classList.add("move"), 250);
        setTimeout(() => right && right.classList.add("move"), 450);
    }

    // ---- section4: 숫자 카운트 (도착 시 1회) ----
    function animateNumber({ el, from, to, duration = 1200, format = "int" }) {
        if (!el) return;
        const start = performance.now();
        const diff = to - from;

        function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const value = from + diff * t;

            if (format === "int") {
                el.textContent = Math.round(value).toLocaleString();
            } else if (format === "float2") {
                el.textContent = value.toFixed(2);
            } else {
                el.textContent = String(value);
            }

            if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    function playSection4Once() {
        if (playedSection4) return;
        playedSection4 = true;

        // 네 원래 목표 값들 유지
        const s4Number = 4155;
        const s4FrNum = 1.08;
        const s4DodNum = 45;
        const s4CpNum = 4110;
        const s4IrCdNum = 393210;

        const elNumber = document.querySelector(".s4_number");
        const elFr = document.querySelector(".s4Fr");
        const elDod = document.querySelector(".s4Dod");
        const elCp = document.querySelector(".s4Cp");
        const elIr = document.querySelector(".s4IrCd");

        // 도착 순간 0으로 리셋(시각적으로 "시작" 느낌)
        if (elNumber) elNumber.textContent = "0";
        if (elFr) elFr.textContent = "0.00";
        if (elDod) elDod.textContent = "0";
        if (elCp) elCp.textContent = "0";
        if (elIr) elIr.textContent = "0";

        // 애니메이션 (원래 setInterval보다 훨씬 안정적 + 브라우저 부담 적음)
        animateNumber({ el: elNumber, from: 0, to: s4Number, duration: 1200, format: "int" });
        animateNumber({ el: elFr, from: 0, to: s4FrNum, duration: 900, format: "float2" });
        animateNumber({ el: elDod, from: 0, to: s4DodNum, duration: 900, format: "int" });
        animateNumber({ el: elCp, from: 0, to: s4CpNum, duration: 1200, format: "int" });
        animateNumber({ el: elIr, from: 0, to: s4IrCdNum, duration: 1200, format: "int" });
    }

    function runSectionEnterEffects(index) {
        // index 기준: [main, section2, section3, section4, section5, footer]
        if (index === 1) playSection2Once();
        if (index === 2) playSection3Once();
        if (index === 3) playSection4Once();
    }

    // 현재 섹션 계산(로드 시/리사이즈 시 사용)
    function getNearestSectionIndex() {
        const y = window.scrollY;
        let best = 0;
        let bestDist = Infinity;
        sections.forEach((sec, i) => {
            const top = sec.offsetTop;
            const dist = Math.abs(top - y);
            if (dist < bestDist) {
                bestDist = dist;
                best = i;
            }
        });
        return best;
    }

    // wheel 핸들러
    function isMobileLike() {
        return window.matchMedia("(max-width: 550px)").matches || "ontouchstart" in window;
    }
    function handleScroll(event) {
        if (isScrolling) return;
        if (!sections.length) return;
        if (isMobileLike()) return;

        // 트랙패드 과민 방지: 기본 스크롤 막고(선택)
        event.preventDefault();

        const deltaY = event.deltaY;

        if (deltaY > 0) currentSectionIndex++;
        else if (deltaY < 0) currentSectionIndex--;

        currentSectionIndex = Math.max(0, Math.min(currentSectionIndex, sections.length - 1));
        isScrolling = true;

        // GSAP scrollTo 사용 (scrollIntoView 제거)
        if (window.gsap && window.ScrollToPlugin) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: sections[currentSectionIndex], autoKill: false },
                ease: "power2.out",
                onComplete: () => {
                    isScrolling = false;
                    runSectionEnterEffects(currentSectionIndex);
                },
            });
        } else {
            // GSAP 미로딩 fallback
            sections[currentSectionIndex].scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
                isScrolling = false;
                runSectionEnterEffects(currentSectionIndex);
            }, 700);
        }
        if (!isMobileLike()) {
            window.addEventListener("wheel", handleScroll, { passive: false });
        }
    }

    // wheel 리스너 (passive:false로 preventDefault 가능)
    window.addEventListener("wheel", handleScroll, { passive: false });

    // 로드시 현재 위치 섹션 동기화 + 해당 섹션이면 효과 실행
    currentSectionIndex = getNearestSectionIndex();
    runSectionEnterEffects(currentSectionIndex);

    // -----------------------------
    // [6] section5 슬라이더 (기존 유지, 안전하게 보강)
    // -----------------------------
    const prevButton = document.querySelector(".sliderPrev");
    const nextButton = document.querySelector(".sliderNext");
    const sliderWrapper = document.querySelector(".s5-wrapper");
    const items = document.querySelectorAll(".s5-gnb");

    if (prevButton && nextButton && sliderWrapper && items.length) {
        const totalItems = items.length;
        let currentIndex = 0;

        function getItemWidth() {
            // 너가 쓰던 "-50" 보정 유지
            return items[0].offsetWidth - 50;
        }

        function updateSliderPosition() {
            const offset = -currentIndex * getItemWidth();
            sliderWrapper.style.transform = `translateX(${offset}px)`;
        }

        prevButton.addEventListener("click", () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
            updateSliderPosition();
        });

        nextButton.addEventListener("click", () => {
            currentIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
            updateSliderPosition();
        });

        window.addEventListener("resize", updateSliderPosition);
    }

    // -----------------------------
    // [7] 마우스 커서 포인터
    // -----------------------------
    const mouseElement = document.getElementById("cursor");
    if (mouseElement) {
        mouseElement.style.backgroundSize = "cover";

        document.addEventListener("mousemove", (event) => {
            mouseElement.style.left = `${event.pageX - mouseElement.offsetWidth / 2}px`;
            mouseElement.style.top = `${event.pageY - mouseElement.offsetHeight / 2}px`;
        });

        document.addEventListener("mousedown", () => {
            mouseElement.style.transform = "scale(0.6)";
        });

        document.addEventListener("mouseup", () => {
            mouseElement.style.transform = "scale(1)";
        });
    }
});
