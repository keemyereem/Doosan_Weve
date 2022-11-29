/* --------------------- DoosanWeve Released 2022.08.24 --------------------- */
/* ----------------------- Published by 4m Creative ------------------------ */

$(function () {
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **메인**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainEvent = {
  init: function () {
    this.initFullpage();
    this.headerEvent();
    this.footerEvent();
    // this.goTopEvent();
    this.S1_videoVisual();
    this.S2_videoVisual();
    this.S3_contHover();
    // this.S4_snsScroll();
  },

  headerEvent: () => {
    $(window).on("scroll", function () {
      $("header").css("left", 0 - $(this).scrollLeft());
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

  initFullpage: () => {
    $(document).ready(function () {
      if ($("#pc").length) {
        $("#pc #main_container").fullpage({
          // anchors: ['section01', 'section02', 'section03', 'section04', 'section05', 'footer'],
          // responsiveWidth:1200,
          fitToSection: true,
          fitToSectionDelay: 0,
          scrollOverflow: true,
          animateAnchor: true,
          scrollBar: false,
          afterLoad: function () {
            cls();
          },
        });
      } else {
        $("#mobile #main_container").fullpage({
          // anchors: ['section01', 'section02', 'section03', 'section04', 'section05', 'footer'],
          responsiveWidth: 1200,
        });
      }

      let _body = $("body");

      $(window).on("scroll", function () {
        cls();
      });

      function cls() {
        if (_body.hasClass("fp-viewing-1")) {
          $(".contBox02").addClass("motion2");
          $(".goTop").addClass("on");
        } else if (_body.hasClass("fp-viewing-2")) {
          $(".contBox03").addClass("motion3");
          if ($("#mobile").length) {
            $(".goTop").removeClass("on");
          } else {
            $(".goTop").addClass("on");
          }
        } else if (_body.hasClass("fp-viewing-3")) {
          $(".contBox04").addClass("motion4");
          $(".goTop").addClass("on");
        } else if (_body.hasClass("fp-viewing-4")) {
          $(".contBox05").addClass("motion5");
          $(".goTop").addClass("on");
        } else {
          $(".goTop").removeClass("on");
        }
      }
    });
  },

  S1_videoVisual: () => {
    /*
    const video1 = document.querySelector("#visual_video_01"),
    const video2 = document.querySelector("#visual_video_02");
    */
    onSwiper();
    // $(document).ready(() => {
    //   setTimeout(() => {
    //     video1.parentNode.setAttribute(
    //       "data-swiper-autoplay",
    //       Math.floor(video1.duration) * 1000
    //     );
    //     video2.parentNode.setAttribute(
    //       "data-swiper-autoplay",
    //       Math.floor(video2.duration) * 1000
    //     );

    //     onSwiper();
    //   }, 500);
    // });

    function onSwiper() {
      // ########################## VIMEO 연동 변수 정의입니다
      var arrVods = []; // ##### vod 객체가 배열로 저장될 예정입니다.

      var slidemenu = ["We’ve", "THE ZENITH"];
      var mySwiper = new Swiper(".main_visual", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoplay: {
          delay: 20220,
          disableOnInteraction: false,
        },
        loop: true,
        allowTouchMove: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<div class="' +
              className +
              '"><p>' +
              slidemenu[index] +
              '</p><em class="time"><i></i></em>' +
              "</div>"
            );
          },
        },
        on: {
          init: function () {
            // 추가1) loop 구동 시, duplicate slide를 건너뛰기 (duplicate slides는 cover사이즈 이벤트를 무시하기 때문) - 2022.11.29
            var swiper = this;
            if (
              swiper.originalParams.loop &&
              swiper.loopedSlides < swiper.originalParams.slidesPerView
            ) {
              swiper.params.slidesPerView = swiper.loopedSlides;
              swiper.destroy(false, false);
              swiper.init();
            }

            $(".contBox01 .main_visual").addClass("on");
            $(".main_visual .swiper-pagination-bullet")
              .find("i")
              .animate({ width: "100%" }, 0);

            // ########################## VIMEO 연동 시작입니다. (https://developer.vimeo.com/player/sdk/basics)
            // ########################## 메인에 <script src="https://player.vimeo.com/api/player.js"></script> 추가가 필요합니다.
            var vodPlayerDefaultOption = {
              /*
              width: '100%',
              height: '100%',
              */
              transparent: true,
              autoplay: false,
              autopause: 1,
              muted: 1,
              controls: 0,
              controls: 0,
              loop: 0,
              responsive: 1,
              dnt: 1,
              playsinline: 1,
              loop: 1,
            };

            $(".swiper-pagination-bullet").find("i").stop(true).css("width", 0);
            $(
              '[data-event-handler-id="swiperWrap"] [data-event-handler-id="swiperList"]'
            ).each(function (idx) {
              // ########################## swiper에 동영상이 존재하는지에 따라 객체를 생성해줍니다
              var $swiperList = $(this);
              var isFirst = ~~$(this).hasClass("swiper-slide-active")
                ? true
                : false;

              $vodWraper = $(this).find(
                '[data-event-handler-id="swiperListVod"]'
              ); // ##### 변수 앞에 $를 붙이는 경우는 그냥 제 개인적인 네이밍 슥봔 이구요. jquery select dom이 들어있는 경우 사용합니다.
              if ($vodWraper.length > 0) {
                // ########################## 썸네일 BG 처리
                $.ajax({
                  url:
                    "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" +
                    $vodWraper.data("vimeo-id") +
                    "&callback=callbackFn&background=true",
                  dataType: "jsonp",
                  success: function (data) {
                    $swiperList.css(
                      "background-image",
                      "url(" +
                        data.thumbnail_url.replace("295x166", "1920") +
                        ")"
                    );

                    $swiperList.css("background-size", "cover");
                    $swiperList.css("background-repeat", "no-repeat");
                  },
                  error: function (xhr) {
                    //console.log('실패 - ', xhr);
                  },
                });

                // ########################## 플레이어 생성
                var vodId = "mainVisualVod_" + idx;
                var vodPlayerOption = Object.assign({}, vodPlayerDefaultOption); // ##### 기존 변수를 복사합니다 vodPlayerOption = vodPlayerDefaultOption로 정의하면 값 저장시 원본 값이 같이 변경되기 때문에 사용하지 않습니다.

                // 첫슬라이드에 영상만 자동 재생 시켜주세요
                if (isFirst == true) {
                  vodPlayerOption.autoplay = 1;
                }

                $vodWraper.attr("id", vodId);
                var objVod = new Vimeo.Player(vodId, vodPlayerOption);

                objVod.on("loaded", function () {
                  $("#" + vodId).append(
                    '<div style="width: 100%; height: 100vh; top: 0; left: 0; position: absolute;"></div>'
                  ); // iframe event 방지용 (scroll event)

                  this.getDuration().then(function (duration) {
                    var slideDuration = duration * 1000;
                    $swiperList.attr("data-swiper-autoplay", slideDuration);
                  });
                });
                objVod.on("play", function () {
                  this.getDuration().then(function (duration) {
                    var slideDuration = duration * 1000;
                    var pgIdx = $swiperList.data("swiper-slide-index");
                    $(".swiper-pagination-bullet:eq(" + pgIdx + ") i").animate(
                      { width: "100%" },
                      slideDuration
                    );
                  });
                });

                arrVods.push(objVod);
              } else {
                // ########################## Swiper 숫자와 맞추는게 개발에 편하기 때문에 vod가 없을 경우애도 배열은 채워줍니다.
                arrVods.push(null);
              }
            });
          },
        },
      });
      // |||||||||||||||||||||||||||||||||||||||||||||||||||| 참고참고참고참고 https://swiperjs.com/swiper-api#events
      mySwiper.on("realIndexChange", function (e) {
        var idx = e.activeIndex;
        var $slide = $(
          '.main_visual [data-event-handler-id="swiperList"]:eq(' + idx + ")"
        );
        var pgIdx = $slide.data("swiper-slide-index");

        $(".swiper-pagination-bullet").find("i").stop(true).css("width", 0);

        // vod play & stop
        $.each(arrVods, function (k, v) {
          if (v != null) {
            if (k == idx) {
              v.play();
            } else {
              v.pause();
              v.setCurrentTime(0);
            }
          }
        });
      });

      // 추가2) [리사이즈 프로세스] - 창 사이즈 조절 시 비율 계산 후 동영상의 width값을 증가 > cover사이즈로 최적화 - 2022.11.29
      let timeoutId;
      let $videoBgAspect = $(".videobg-aspect");
      let $videoBgWidth = $(".videobg-width");
      let videoAspect =
        $videoBgAspect.outerHeight() / $videoBgAspect.outerWidth();

      function videobgEnlarge() {
        windowAspect = $(window).height() / $("html").width(); // 추가3) window 창 사이즈가 아닌 내부 html사이즈로 대체 (1440이하 반응형 스크롤 때문) - 2022.11.29
        if (windowAspect > videoAspect) {
          $videoBgWidth.width((windowAspect / videoAspect) * 100 + "%");
        } else {
          $videoBgWidth.width(100 + "%");
        }
      }

      //  추가2-2) 가변형 리사이즈 조절시 즉각 인식 및 변경 - 2022.11.29
      $(window).resize(function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(videobgEnlarge);
      });

      // 추가2-3) [리사이즈 프로세스] 실행 - 2022.11.29
      videobgEnlarge();
    }
  },

  S2_videoVisual: () => {
    $(function () {
      var swiper = new Swiper("#pc .es_slider", {
        slidesPerView: 5,
      });

      var swiper = new Swiper("#mobile .es_slider", {
        slidesPerView: 1,
        pagination: {
          el: ".es_slider .swiper-pagination",
        },
        on: {
          slideChange: function () {
            _this = $(this)[0].activeIndex + 1;
            $(".es_slider .bg_box")
              .attr("class", "bg_box")
              .addClass("mbg" + _this);
            $(".es_slider .swiper-pagination span").removeClass(
              ".es_slider swiper-pagination-bullet-active"
            );
            $(
              ".es_slider .swiper-pagination span:nth-child(" + _this + ")"
            ).addClass(".es_slider swiper-pagination-bullet-active");
            $(".es_slider").attr("class", "es_slider");
            $(".es_slider").addClass("bg" + _this);
          },
        },
      });

      let _bg;
      $("#pc .es_slider .swiper-slide").hover(
        function () {
          _bg = $(this).attr("bg-type");
          $(".es_slider").attr("class", "es_slider");
          $(".es_slider").addClass(_bg);
        },
        function () {
          $(".es_slider").attr("class", "es_slider");
        }
      );
    });
  },

  S3_contHover: () => {
    $(function () {
      var houseSlider = new Swiper(".house_slider", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: false,
        allowTouchMove: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 1,
          },
        },
        on: {
          slideChange: function () {
            _this = $(this)[0].activeIndex + 1;
            $(".contBox03 .bg_box")
              .attr("class", "bg_box")
              .addClass("mbg" + _this);
            console.log(_this);
          },
        },
      });

      $(".house_slider .swiper-slide").hover(function () {
        _idx = $(this).index() + 1;
        $(this)
          .closest(".house_slider")
          .attr("class", "house_slider")
          .addClass("bg" + _idx);
      });
    });
  },

  /*
  S4_snsScroll: () => {
    $(".sns_wrap").mCustomScrollbar({
      axis:"x",
      advanced:{autoExpandHorizontalScroll:true}
    });
  },
  */
};
