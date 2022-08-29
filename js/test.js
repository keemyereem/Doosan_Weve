
/* --------------------- DoosanWeve Released 2022.08.24 --------------------- */
/* ----------------------- Published by 4m Creative ------------------------ */

$(function(){

});


var test = {
	init:function(){
        this.gsap();
	}, 

    gsap: () => {

        // Landing Page ScrollTrigger/ 참고 https://velog.io/@yesslkim94/GSAP-ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // ************************************************** 초기 시작 값
        gsap.to('.scroll-container', { 
            opacity: 1, duration: 1, delay: 1,
        }) 
        

        // ************************************************** section2
        const tl2 = gsap.timeline();
        ScrollTrigger.create ({
            animation: tl2,
            trigger: ".section2",
            pin: true,                                       // 특정 element가 고정되도록 만들어조는 속성/ true시 트리거가 고정됨/ '.selector' 입력 시 특정 엘리먼트가 고정됨
            pinSpacing: true,                                // 고정되는 엘리먼트 아래에 padding을 줘서 스크롤이 끝난 후 다음 엘리먼트가 이어서 보일 수 있도록 만들어줌/ "margin"으로 입력하면 padding대신 margin을 준다.
            start: "0% 0%",                                  // 첫번째 : trigger 지정태그 기준 애니메이션 시작 및 끝 지점/ 두번째 : 스크롤 트리거 위치
            end: "+=100%",                                  // markers 옵션을 켜서 상세설정 확인 가능
            scrub: 2,                                        // 스크롤에 따른 민감도 조절/ trigger 지정태그를 벗어날 경우, 모든 이벤트를 원상복귀함
            // toggleClass: "active",                           // start 시점에서 class가 추가되고 end에서 class가 삭제된다.
            // markers: true,                                   // 스크롤이 시작되고 끝나는 시점을 마킹해준다/ true 입력 시, 기본 스타일로 마커가 생성된다.
            // {                                                // 마커 스타일 변경 시, 좌측의 예시처럼 변경 가능 (true 지우고 그 자리부터 괄호 시작)
            //     startColor: 'yellow', 
            //     endColor: 'black',
            //     fontSize: '32px',
            //     indent: 200
            // },
        })

        tl2
            .to('.section2 h2', { transform: 'translateY(0)', opacity: '1', duration: 50, delay: 2, })
            .to('.section2 .intro', { transform: 'scale(1)', top: '0', duration: 100, delay: 5, }, "<100")
            .to('.section2 h2', { color: '#fff', duration: 50, }, "<0")
            .to('.section2 p span:first-child', { transform: 'translateY(0)', opacity: '1', duration: 50, delay: 5, })
            .to('.section2 p span:last-child', { transform: 'translateY(0)', opacity: '1', duration: 50, dealy: 2, })
            .to('.section2', { background: '#000', duration: 2, })
            .to('.section2 .intro', { opacity: '0', duration: 100, delay: 5, }, "<50")
            .to('.section2 h2, .section2 p span', { opacity: '0', transform: 'translateY(-50px)', duration: 50, }, "<150")
            


        // ************************************************** section3
        const tl3 = gsap.timeline();
        ScrollTrigger.create ({
            animation: tl3,
            trigger: ".section3",
            pin: true,                                       
            pinSpacing: true,                                
            start: "0% 0%",                                  
            end: "+=100%",                                 
            scrub: 2,                             
        })

        tl3
            .to('.section3 .card01 h2', { transform: 'translateY(0)', opacity: '1', duration: 50, delay: 2, })
                    
    },

}