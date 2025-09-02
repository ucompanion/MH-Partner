/*-------------------------------------------------------------------
	분류순서
	- Init
	- Setting
	- Layout
	- Component
	- Content
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
	Init
-------------------------------------------------------------------*/
function initUI() {
	/* Settings */
	setDeviceStatus(); // 디바이스 설정
	setScrollStatus(); // 스크롤 상태 설정
};

document.addEventListener('DOMContentLoaded', function () {
	initUI();
});
/*-------------------------------------------------------------------
	Setting
-------------------------------------------------------------------*/
/* 디바이스 설정 */
function setDeviceStatus() {
	// 플랫폼 정보 가져오기
	var os = platform.os.family;  // 운영체제 정보
	var browserName = platform.name;  // 브라우저 이름
	var browserVersion = platform.version;  // 브라우저 버전
	var isMobile = platform.mobile;  // 모바일 여부

	// OS에 따른 클래스 추가
	var osClasses = {
		'iOS': 'os-ios',
		'Android': 'os-android',
		'Windows': 'os-windows',
		'macOS': 'os-macos',
		'Linux': 'os-linux'
	};
	document.documentElement.classList.add(osClasses[os] || 'os-unknown');

	// 브라우저 이름에 따른 클래스 추가
	var browserClasses = {
		'Chrome': 'browser-chrome',
		'Firefox': 'browser-firefox',
		'Safari': 'browser-safari',
		'Edge': 'browser-edge',
		'IE': 'browser-ie'
	};
	document.documentElement.classList.add(browserClasses[browserName] || 'browser-unknown');

	// 모바일 여부에 따른 클래스 추가
	document.documentElement.classList.add(isMobile ? 'is-mobile' : 'is-desktop');
}

/* 스크롤 상태 설정 */
function setScrollStatus() {
    let scrollEndTime;
    let oldScrTop = window.scrollY; // 초기 스크롤 위치 설정
    let isScrFirst = oldScrTop === 0; // 스크롤이 처음인지 확인
    let isScrLast = Math.ceil(oldScrTop + window.innerHeight) >= document.documentElement.scrollHeight; // 스크롤이 끝인지 확인

    const updateScrollClasses = (scrFirst, scrLast) => {
        // 처음, 마지막, 스크롤 상태에 따른 클래스 관리
        document.body.classList.toggle('is-scroll-first', scrFirst);
        document.body.classList.toggle('is-scroll-last', scrLast);
        document.body.classList.toggle('is-scrolled', !scrFirst);
		document.body.classList.remove('is-scroll-stoped');
    };

    const handleScroll = (() => {
        let lastDirection = null; // 마지막 스크롤 방향 저장

        return () => {
            const curScrTop = window.scrollY;

            // 스크롤 방향 처리 (up: 스크롤 올림, down: 스크롤 내림)
            if (oldScrTop > curScrTop && lastDirection !== 'up') {
                lastDirection = 'up';
                document.body.classList.add('is-scroll-up');
                document.body.classList.remove('is-scroll-down');
                window.dispatchEvent(new Event('scrollUp'));
            } else if (oldScrTop < curScrTop && lastDirection !== 'down') {
                lastDirection = 'down';
                document.body.classList.add('is-scroll-down');
                document.body.classList.remove('is-scroll-up');
                window.dispatchEvent(new Event('scrollDown'));
            }
            oldScrTop = curScrTop;

            // 스크롤 종료 처리 (active: 스크롤 진행중, stoped: 스크롤 멈춤)
            clearTimeout(scrollEndTime);
            scrollEndTime = setTimeout(() => {
                document.body.classList.remove('is-scroll-active');
                document.body.classList.add('is-scroll-stoped');
                window.dispatchEvent(new Event('scrollEnd'));
            }, 100);

            // 스크롤 상태 업데이트
            isScrFirst = curScrTop === 0;
            isScrLast = Math.ceil(curScrTop + window.innerHeight) >= document.documentElement.scrollHeight;
			document.body.classList.add('is-scroll-active');
            updateScrollClasses(isScrFirst, isScrLast);
        };
    })();

    // 초기 상태 설정
    updateScrollClasses(isScrFirst, isScrLast);

    // 스크롤 이벤트 처리
    window.addEventListener('scroll', handleScroll);
}

/*-------------------------------------------------------------------
	Layout
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
	Components
-------------------------------------------------------------------*/

/*-------------------------------------------------------------------
	Contents
-------------------------------------------------------------------*/
