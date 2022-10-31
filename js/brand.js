
/* --------------------- DoosanWeve Released 2022.08.24 --------------------- */
/* ----------------------- Published by 4m Creative ------------------------ */


$(function(){
    const isMobile = () => {
        const user = navigator.userAgent;
        let isCheck = false;
        if ( user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 ) {
            isCheck = true;
        }
        return isCheck;
    }

    if (isMobile() == false) {
        console.log('*PC environment')
        $('html').attr('id', 'pc')
    } else {
        console.log('*Mobile environment')
        $('html').attr('id', 'mobile')
    }

});

function popup(popConts) {
	var popthis = $(".bi_popup."+popConts);
    $('body').addClass('blockScroll');
	popthis.show();

	popthis.find(".pop_close").click(function(){
        $('body').removeClass('blockScroll');
		popthis.hide();
	});
}

var brandstory = {
	init:function(){
        this.subUI();
        this.gsap();
        this.section4();
        this.section5();
	}, 

    // common: () => {
    //     const subMenu = document.querySelector(".section2");
    //     const fixMenu = subMenu.offsetTop;

    //     $(window).on('scroll', function() {
    //         let st = $(window).scrollTop();
            
    //         if (st > fixMenu - 200) {
    //           $('header').addClass('indentUp');
    //         } else {
    //             $('header').removeClass('indentUp');
    //         }

    //         if (st >= fixMenu) {  
    //             $('nav').addClass('fixed');
    //         } else {
    //             $('nav').removeClass('fixed');
    //         }
    //     });

    //     $('nav ul li').on('click', function(){
    //         $(this).siblings().removeClass('on');
    //         $(this).addClass('on');
    //     });


    // },

    subUI: () => {
        if ($('nav').length) {
            const subMenu = document.querySelector("nav"),
                  fixMenu = subMenu.offsetTop;

            $(window).on('scroll', function() {
                let st = $(window).scrollTop();
                
                if (st > fixMenu - 200) {
                    $('header').addClass('indentUp');
                } else {
                    $('header').removeClass('indentUp');
                }
    
                if (st >= fixMenu) {  
                    $('nav').addClass('fixed');
                } else {
                    $('nav').removeClass('fixed');
                }
            });

            if ($('#mobile').length) {
                $('nav .on').on('click', ()=> {
                    $('nav ul').toggleClass('open')
                });
            }

        }
    },

    
    gsap: () => {
        
        // Landing Page ScrollTrigger/ 참고 https://velog.io/@yesslkim94/GSAP-ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // ************************************************** 초기 시작 값


        gsap.to('.scroll-container', { 
            opacity: 1, duration: 1, delay: 1,
            // yPercent: -100,
            // y: "100vh",
            // scrollTrigger: {
            //   scrub: 1,
            //   trigger: ".scroll-container",
            //   start: "top top",
            //   end: document.querySelector(".scroll-container").clientHeight,
            // }
        }) 

        // ************************************************** section1
        // const tl1 = gsap.timeline();
        // ScrollTrigger.create ({
        //     animation: tl1,
        //     trigger: ".section1",
        //     pin: true,                                     
        //     pinSpacing: true,                          
        //     start: "0% 0%",                                
        //     end: "+=200%",                                 
        //     scrub: 2,                                        


        // })

        // tl1
        //     .to('.section1', { top: '0', duration: 10, })
        

        // ************************************************** section2
        const tl2 = gsap.timeline();

        ScrollTrigger.create ({
            animation: tl2,
            trigger: ".section2",
            pin: true,                                       // 특정 element가 고정되도록 만들어조는 속성/ true시 트리거가 고정됨/ '.selector' 입력 시 특정 엘리먼트가 고정됨
            pinSpacing: true,                                // 고정되는 엘리먼트 아래에 padding을 줘서 스크롤이 끝난 후 다음 엘리먼트가 이어서 보일 수 있도록 만들어줌/ "margin"으로 입력하면 padding대신 margin을 준다.
            start: "0% 0%",                                  // 첫번째 : trigger 지정태그 기준 애니메이션 시작 및 끝 지점/ 두번째 : 스크롤 트리거 위치
            end: "+=200%",                                  // markers 옵션을 켜서 상세설정 확인 가능
            scrub: true,                                        // 스크롤에 따른 민감도 조절/ trigger 지정태그를 벗어날 경우, 모든 이벤트를 원상복귀함

            // toggleClass: {                                   // pin 도달시 클래스를 부여/ pin 이탈시 클래스를 삭제
                // targets: '.section2',                        // 클래스를 부여할 태그 타겟 설정
                // className: "active",                               // 태그 타겟에 부여할 클래스 명
            // },
            
            // toggleClass: "active",                           // start 시점에서 class가 추가되고 end에서 class가 삭제된다.
            // markers: true,                                   // 스크롤이 시작되고 끝나는 시점을 마킹해준다/ true 입력 시, 기본 스타일로 마커가 생성된다.
            // {                                                // 마커 스타일 변경 시, 좌측의 예시처럼 변경 가능 (true 지우고 그 자리부터 괄호 시작)
                // startColor: 'yellow', 
                // endColor: 'black',
                // fontSize: '32px',
                // indent: 200
            // }
                        
            onLeave: () => navChangeWhite(),
            onLeaveBack: () => navChangeBlue(),


        });

        function navChangeWhite() {
            $('#pc nav ul li').on('click', function(){
                $(this).siblings().find('a').css({'color':'rgba(225,225,225,.3)'});
                $(this).find('a').css({'color':'#fff'});
                $(this).find('span').css({'background':'#fff'});
            });
        };
        function navChangeBlue() {
            $('#pc nav ul li').on('click', function(){
                $(this).siblings().find('a').css({'color':'#000'});
                $(this).find('a').css({'color':'#005eb8'});
                $(this).find('span').css({'background':'#005eb8'});
            });
        };

        tl2
            .to('.section2 h2', { transform: 'translateY(0)', opacity: '1', duration: 2, delay: 2, })
            .to('.section2 .intro', { transform: 'scale(1)', top: '0', duration: 5, delay: 2, })
            .to('.section2 h2', { color: '#fff', duration: 2, }, 7)
            // .to('nav, nav li.on', { borderBottom: '1px solid rgba(255, 255, 255, .6)', }, 9)
            .to('#pc nav li.on span', { background: '#fff', }, 10)
            .to('#pc nav li a', { color: 'rgba(255, 255, 255, .3)', }, 10)
            .to('#pc nav li.on a', { color: '#fff', }, 10)
            .to('.section2 p span:first-child', { transform: 'translateY(0)', opacity: '1', duration: 2, delay: 2, })
            .to('.section2 p span:last-child', { transform: 'translateY(0)', opacity: '1', duration: 2, dealy: 1, })
            .to('.section2', { background: '#000', duration: 2, })
            .to('.typeB .section2', { background: '#fff', duration: 2, })
            .to('body::-webkit-scrollbar', { backgroundColose: '#000', duration: 2, })
            .to('.section2 .intro', { opacity: '0', duration: 5, delay: 2, })
            .to('.section2 h2, .section2 p span', { opacity: '0', transform: 'translateY(-50px)', duration: 2, })


        // ************************************************** section3
        const tl3 = gsap.timeline();
        ScrollTrigger.create ({
            animation: tl3,
            trigger: ".section3",
            pin: true,                                       
            pinSpacing: true,                                
            start: "0% 0%",                                  
            end: "+=300%",                                 
            scrub: 2,     

        });

        tl3
            .to('.section3 .card01 div', { top: '-100vh', duration: 10, })
            .to('.section3 .card01 h2', { transform: 'translateY(0)', opacity: '1', duration: 2, }, 0)
            .to('.section3 .card01 p span:first-child', { transform: 'translateY(0)', opacity: '1', duration: 2, delay: 1, }, 0.5)
            .to('.section3 .card01 p span:last-child', { transform: 'translateY(0)', opacity: '1', duration: 2, delay: 1, }, "<0")
            .to('.section3 .card01 h2, .section3 .card01 p span', { opacity: '0', transform: 'translateY(-50px)', duration: 2, }, '<5')

            .to('.section3 .card02 div', { top: '-100vh', duration: 10, })
            .to('.section3 .card02 h2', { transform: 'translateY(0)', opacity: '1', duration: 2, }, "<0")
            .to('.section3 .card02 p span:first-child', { transform: 'translateY(0)', opacity: '1', duration: 2, delay: 1, }, '<.5')
            .to('.section3 .card02 p span:last-child', { transform: 'translateY(0)', opacity: '1', duration: 2, delay: 1, }, "<0")
            .to('.section3 .card02 h2, .section3 .card02 p span', { opacity: '0', transform: 'translateY(-50px)', duration: 2, }, '<5')

            .to('.section3 .card03 div', { top: '-100vh', duration: 10, })
            .to('.section3 .card03 h2', { transform: 'translateY(0)', opacity: '1', duration: 2, }, "<0")
            .to('.section3 .card03 p span:first-child', { transform: 'translateY(0)', opacity: '1', duration: 2, delay: 1, }, '<.5')
            .to('.section3 .card03 p span:last-child', { transform: 'translateY(0)', opacity: '1', duration: 2, delay: 1, }, "<0")
            .to('.section3 .card03 h2, .section3 .card03 p span', { opacity: '0', transform: 'translateY(-50px)', duration: 2, }, '<5')
                    
    },

    section4: () => {
        $('.section4 ul > li').each(function(i){
            $('.section4 ul > li').eq(i).hover(function(){
                $('.section4').find('img').eq(i).css({'z-index': '1', 'opacity': '1'});
            }, function(){
                $('.section4').find('img').eq(i).css({'z-index': '-1', 'opacity': '0'});
            });
        });

        var ww = $(window).width();
        function initSwiper (){

            s4Swiper = new Swiper('.section4 .mswiper', {
                slidesPerView: 1,
                observer: true,
                observeParents: true,
                simulateTouch: true,
                spaceBetween: 30,
                navigation: {
                    nextEl: ".section4 .swiper-button-next",
                    prevEl: ".section4 .swiper-button-prev",
                },

            });


        }
        if(ww < 769){
            initSwiper();

        }else if(ww >= 769) {

        }

        $(window).on('resize', function () {
            ww = $(window).width();
            if (ww < 769) {
                initSwiper();
            }
        });
    },

    section5: () => {
        $('.section5 ul > li').each(function(i){
            $('.section5 ul > li').eq(i).hover(function(){
                $('.section5').find('img').eq(i).css({'z-index': '1'});
            }, function(){
                $('.section5').find('img').eq(i).css({'z-index': '-1'});
            });
        });
    },

}