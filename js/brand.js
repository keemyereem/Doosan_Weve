/* --------------------- DoosanWeve Released 2022.08.24 --------------------- */
/* ----------------------- Published by 4m Creative ------------------------ */

$(function () {
  $(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    //resize
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  });

  const isMobile = () => {
    const user = navigator.userAgent;
    let isCheck = false;
    if (user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1) {
      isCheck = true;
    }
    return isCheck;
  };

  if (isMobile() == false) {
    console.log("*PC environment");
    $("html").attr("id", "pc");
  } else {
    console.log("*Mobile environment");
    $("html").attr("id", "mobile");
  }
});

function popup(popConts) {
  var popthis = $(".bi_popup." + popConts);
  $("body").css({ height: "100vh", overflow: "hidden" });
  popthis.show();

  popthis.find(".pop_close").click(function () {
    $("body").css({ height: "auto", overflow: "" });
    popthis.hide();
  });
}

var commonEvent = {
  init: function () {
    this.headerEvent();
    this.goTopEvent();
    this.subUI();
    this.gsap();
    this.section3();
  },

  headerEvent: () => {
    const body = $("body");
    let scrollPosition = 0;

    $(window).on("scroll", function () {
      $("header").css("left", 0 - $(this).scrollLeft());
      scrollPosition = window.pageYOffset;
    });

    if ($("#mobile").length) {
      // 모바일 메뉴
      $(".allMenu").on("click", function () {
        if (!$("body").hasClass("menuOn")) {
          $("body").addClass("menuOn");
          openProcessor();
        } else {
          $("body").removeClass("menuOn");
          $("#gnb ul, #siteMap .dep1").removeClass("on");
          closeProcessor();
        }
      });

      $("#gnb ul, #siteMap .dep1 a").on("click", function () {
        $(this).parents(".dep1").toggleClass("on");
        $(this).parents(".dep1").siblings(".dep1").removeClass("on");
      });
    } else {
      // PC 메뉴
      $("#gnb ul, #siteMap").hover(
        function () {
          $("body").addClass("menuOn");
        },
        function () {
          $("body").removeClass("menuOn");
        }
      );
    }

    $(".btn_doosanenc").hover(
      function () {
        $(this).addClass("hover");
      },
      function () {
        $(this).removeClass("hover");
      }
    );

    // 팝업 열기 function
    function openProcessor() {
      scrollPosition = window.pageYOffset;
      $("html").addClass("blockScroll");
      console.log("open : " + scrollPosition);
      if ($("#mobile").length) {
        body.css("top", `-${scrollPosition}px`);
      }
    }

    // 팝업 닫기 function
    function closeProcessor() {
      $("html").removeClass("blockScroll");
      $(".popup").removeClass("on");

      if ($("#mobile").length) {
        scrollPosition = body.css("top");
        scrollPosition = scrollPosition.replace("px", "");

        body.removeProp("top");
        window.scrollTo(0, -scrollPosition);
      }
    }

    let before = 0;

    window.addEventListener("scroll", (ev) => {
      if (before < window.scrollY) {
        $("header").addClass("indent");
        before = window.scrollY;
      } else if (before > window.scrollY) {
        $("header").removeClass("indent").addClass("wht");
        before = window.scrollY;
      }
      if (window.scrollY == 0) {
        $("header").removeClass("indent").removeClass("wht");
      }
    });
  },

  goTopEvent: () => {
    $(window).scroll(function () {
      // top button controll
      if ($(this).scrollTop() > 400) {
        $("#topButton").fadeIn();
      } else {
        $("#topButton").fadeOut();
      }
      var footerTop = $("footer").offset().top - $(window).outerHeight(),
        pos = $("footer").outerHeight() + Number(80),
        pos_m = $("footer").outerHeight() + Number(35),
        s2 = $(".section2").offset().top,
        s3 = $(".gsap2").offset().top,
        s4 = $(".section3").offset().top;

        if ($(window).outerHeight() + $(this).scrollTop() > footerTop) {
          $("#topButton").addClass('wht');
        } else if ($(this).scrollTop() + $(window).outerHeight() > s3) {
          $("#topButton").addClass('wht');
          if ($(".gsap2").css('opacity') < 0.5) {
            $("#topButton").removeClass('wht');
          } else {
            $("#topButton").addClass('wht');
          }
        }else {
          $("#topButton").removeClass('wht');
        }

      if ($(this).scrollTop() > footerTop) {
        if ($("#pc").length) {
          $("#topButton").addClass("bs").css({ bottom: pos });
        } else {
          $("#topButton").addClass("bs").css({ bottom: pos_m });
        }
      } else {
        if ($("#pc").length) {
          $("#topButton").removeClass("bs").css({ bottom: "80px" });
        } else {
          $("#topButton").removeClass("bs").css({ bottom: "35px" });
        }
      }

      if ($(this).scrollTop() + $('nav').outerHeight() > s4 && $('.scroll-container').length) {
        if ($("#pc").length) {
          $('nav').addClass('wht');
        }
      } else {
        $('nav').removeClass('wht');
      }
    });

    $(document).on("click", "#topButton", function () {
      $("html, body").animate({ scrollTop: 0 }, "300");
    });
  },

  footerEvent: () => {
    $(document).on("click", ".family_site .site_selected", function () {
      var selElm = $(this).parent();
      if (!selElm.hasClass("open")) {
        selElm.addClass("open");
      } else {
        selElm.removeClass("open");
      }
    });

    $(document).on("click", ".family_site .site_list li a", function () {
      var selected = this.innerText,
        siteName = document.getElementsByClassName("site_selected")[0],
        familySite = this.parentNode.parentNode.parentNode;

      siteName.innerText = selected;
      familySite.classList.remove("open");
    });
  },

  subUI: () => {
    if ($("nav").length) {
      const subMenu = document.querySelector("nav"),
        fixMenu = subMenu.offsetTop;

      $(window).on("scroll", function () {
        let st = $(window).scrollTop();

        if (st > fixMenu - 200) {
          $("header").addClass("indentUp");
        } else {
          $("header").removeClass("indentUp");
        }

        if (st >= fixMenu) {
          $("nav").addClass("fixed");
        } else {
          $("nav").removeClass("fixed");
        }
      });

      if ($("#mobile").length) {
        $("nav .on").on("click", () => {
          $("nav ul").toggleClass("open");
        });
      }
    }
  },

  gsap: () => {
    // 1400px 이하 가로스크롤 이동 시 헤더 위치 변경(fixed 속성 대안)
    $(window).on("scroll", function () {
      $("#brandstory .section2").css("left", 0 - $(this).scrollLeft());
    });

    // Landing Page ScrollTrigger/ 참고 https://velog.io/@yesslkim94/GSAP-ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ************************************************** 초기 시작 값

    gsap.to(".scroll-container", {
      opacity: 1,
      duration: 1,
      delay: 1,
      // yPercent: -100,
      // y: "100vh",
      // scrollTrigger: {
      //   scrub: 1,
      //   trigger: ".scroll-container",
      //   start: "top top",
      //   end: document.querySelector(".scroll-container").clientHeight,
      // }
    });

    const tl1 = gsap.timeline();

    ScrollTrigger.create({
      animation: tl1,
      trigger: "#brandstory .section2",
      pin: true, // 특정 element가 고정되도록 만들어조는 속성/ true시 트리거가 고정됨/ '.selector' 입력 시 특정 엘리먼트가 고정됨
      pinSpacing: true, // 고정되는 엘리먼트 아래에 padding을 줘서 스크롤이 끝난 후 다음 엘리먼트가 이어서 보일 수 있도록 만들어줌/ "margin"으로 입력하면 padding대신 margin을 준다.
      start: "0% 0%", // 첫번째 : trigger 지정태그 기준 애니메이션 시작 및 끝 지점/ 두번째 : 스크롤 트리거 위치
      end: "+=700%", // markers 옵션을 켜서 상세설정 확인 가능
      scrub: 1.5, // 스크롤에 따른 민감도 조절/ trigger 지정태그를 벗어날 경우, 모든 이벤트를 원상복귀함

      // toggleClass: {                                 // pin 도달시 클래스를 부여/ pin 이탈시 클래스를 삭제
      // targets: '.section2',                          // 클래스를 부여할 태그 타겟 설정
      // className: "active",                           // 태그 타겟에 부여할 클래스 명
      // },

      // toggleClass: "active",                         // start 시점에서 class가 추가되고 end에서 class가 삭제된다.
      // markers: true,                                 // 스크롤이 시작되고 끝나는 시점을 마킹해준다/ true 입력 시, 기본 스타일로 마커가 생성된다.
      // {                                              // 마커 스타일 변경 시, 좌측의 예시처럼 변경 가능 (true 지우고 그 자리부터 괄호 시작)
      // startColor: 'yellow',
      // endColor: 'black',
      // fontSize: '32px',
      // indent: 200
      // }

      onLeave: () => navChangeWhite(),
      onLeaveBack: () => navChangeBlue(),
    });

    function navChangeWhite() {
      $("#pc nav ul li").on("click", function () {
        // $('#pc nav').css({ 'background': '#000' });
        $(this).siblings().find("a").css({ color: "rgba(225,225,225,.3)" });
        $(this).find("a").css({ color: "#fff" });
        $(this).find("span").css({ background: "#fff" });
      });
    }
    function navChangeBlue() {
      $("#pc nav ul li").on("click", function () {
        $(this).siblings().find("a").css({ color: "#000" });
        $(this).find("a").css({ color: "#005eb8" });
        $(this).find("span").css({ background: "#005eb8" });
      });
    }

    let gsap2_1 = $('.gsap2-2').children().outerHeight(),
        gsap2_1_child = $('.gsap2-2').children(),
        gsap3_1 = 140,
        maxW = 5000,
        maxH = 5000;

    if ($('#pc').length) {
      maxW = 0;
      maxH = 5000;
    } else if ($('#mobile').length) {
      gsap3_1 = 85;
      maxW = 5000;
      maxH = 0;
    }
    console.log(gsap2_1)

    tl1
      .to(".gsap1-1", { transform: "translateY(0)", opacity: "1", duration: 0.3, })
      .to(".gsap1-2", { transform: "translateY(0)", opacity: "1", duration: 0.3, }, "-=.1")
      .to(".gsap1-3", { css:{className:'gsap1-3 on'}, duration: 0.1, })
      .to(".gsap1", {transform: "translateY(-20px)", opacity: "0", duration: 0.3, delay: 0.3, })

      .to(".gsap2", { top: 0, duration: 0.3, })
      .to("#pc nav li:not(.on) a", { color: "rgba(255, 255, 255, .3)", duration: 0.2 }, "-=.1")
      .to("#pc nav li.on span", { background: "#fff", duration: 0.2 }, "-=.2")
      .to("#pc nav li.on a", { color: "#fff", duration: 0.2 }, "-=.2")
     
      .to(".gsap2-2", { width: gsap2_1_child.eq(0).width(), duration: 0, })
      .to(".gsap2-1", { transform: "translateY(0)", opacity: "1", duration: 0.2, delay: 0.1, })
      // 루프1) 우측 폰트 올라오기
      .to(".gsap2-4", { bottom: "0", opacity: "1", duration: 0.1, })
      // 루프2) 좌측 슬로건 전환
      .to(".gsap2-2", { width: gsap2_1_child.eq(1).width(), top: -(gsap2_1), duration: 0.2, delay: 0.3, })
      // 루프3) 좌측 슬로건 전환 -> 우측 폰트 같이 사라짐
      .to(".gsap2-4", { bottom: 30, opacity: "0", duration: 0.1, }, "-=.2")

      // 루프1, 2, 3) 반복
      .to(".gsap2-5", { bottom: "0", opacity: "1", duration: 0.1, }, "-=.1")
      .to(".gsap2-2", { width: gsap2_1_child.eq(2).width(), top: -(gsap2_1) * 2, duration: 0.2, delay: 0.3, })
      .to(".gsap2-5", { bottom: 30, opacity: "0", duration: 0.1, }, "-=.2")
      // 루프1, 2, 3) 반복
      .to(".gsap2-6", { bottom: "0", opacity: "1", duration: 0.1, }, "-=.1")
      .to(".gsap2-2", { width: gsap2_1_child.eq(3).width(), top: -(gsap2_1) * 3, duration: 0.2, delay: 0.3, })
      .to(".gsap2-6", { bottom: 30, opacity: "0", duration: 0.1, }, "-=.2")
      // 루프1, 2, 3) 반복
      .to(".gsap2-7", { bottom: "0", opacity: "1", duration: 0.1, }, "-=.1")
      .to(".gsap2-2", { width: gsap2_1_child.eq(4).width(), top: -(gsap2_1) * 4, duration: 0.2, delay: 0.3, })
      .to(".gsap2-7", { bottom: 30, opacity: "0", duration: 0.1, }, "-=.2")
      .to(".gsap2-8", { bottom: "0", opacity: "1", duration: 0.1, }, "-=.1")

      .to(".gsap2-1, .gsap2-3", { transform: "translateY(-20px)", opacity: "0", duration: 0.3, delay: 0.3, })
      .to(".gsap2", { opacity: 0, duration: 0.3, })
      .to("#pc nav li:not(.on) a", { color: "#000", duration: 0.2 }, "-=.1")
      .to("#pc nav li.on span", { background: "#005eb8", duration: 0.2 }, "-=.3")
      .to("#pc nav li.on a", { color: "#005eb8", duration: 0.2 }, "-=.3")

      .to(".gsap3", { zIndex: 0, }, "-=.3")
      .to(".gsap3-1", { opacity: 1, transform: "translateY(0)", duration: 0.3, })
      .to(".gsap3-2", { maxWidth: maxW, maxHeight: maxH, duration: 0.6, })
      .to(".gsap3-1", { height: gsap3_1, duration: 0.2, })
      .to(".gsap3-1", { opacity: 0, duration: 0.2, })
      .to(".gsap3-3", { opacity: 1, duration: 0.2, })

      .to(".gsap3", { zIndex: 1, delay: 0.1, });
  },

  section3: () => {
    $(".section3 ul > li").each(function (i) {
      $(".section3 ul > li")
        .eq(i)
        .hover(
          function () {
            $(".section3").find("img").eq(i).css({ "z-index": "1" });
          },
          function () {
            $(".section3").find("img").eq(i).css({ "z-index": "-1" });
          }
        );
    });
  },

};
