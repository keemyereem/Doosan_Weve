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

  // 팝업 데이터 가져오기 [ 미완성 코드 :: 팝업 내부 검색기능도 value값 인식하게 해야 함 ]
  getVal = () => {
    let name = document.getElementById("searchComplex"),
      count = $(".result_box").length;

    if (name != null) {
      $(".popup.search > ul > li")
        .eq(1)
        .find("p .result")
        .text("‘" + name.value + "’");
      $(".popup.search > ul > li").eq(1).find("p .num").text(count);
    }
  };
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **공통**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var commonEvent = {
  init: function () {
    this.headerEvent();
    this.bgAni();
    this.subUI();
    this.iptEvent();
    this.tabEvent();
    this.popup();
    this.goTopEvent();
    this.checkAll();
    this.headerScroll();
    // this.checkDisagree();
    this.policyEvent();
  },

  headerEvent: () => {
    const body = $("body");
    let scrollPosition = 0;

    $(window).on("scroll", function () {
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
  },

  bgAni: function () {
    $(document).ready(function () {
      setTimeout(function () {
        $(".section1").addClass("ani");
      }, 100);
    });
  },

  subUI: () => {
    if ($("nav").length) {
      const subMenu = document.querySelector("nav"),
        fixMenu = subMenu.offsetTop,
        navHeight = Math.abs($("nav").height()),
        awardMarginTop = Math.abs(
          $(".contents").css("margin-top").replace("px", "")
        );

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

      // nav바 스크롤 고정시 contents박스 높이값 조절 및 뒤틀림 방지
      $(window).on("load resize scroll", () => {
        if ($("nav").hasClass("fixed")) {
          $(".contents").css(
            "margin-top",
            "" + (awardMarginTop + navHeight) + "px"
          );
        } else {
          $(".contents").css("margin-top", "" + awardMarginTop + "px");
        }
      });
    }
  },

  iptEvent: () => {
    // selectbox
    var selectType = $(".select_row>select");
    selectType.addClass("selectBox");
    selectChange(selectType);
    function selectChange(type) {
      type.change(function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
      });
    }

    //file
    var fileTarget = $("#upload_file");
    fileTarget.on("change", function () {
      var cur = $(".file_row input[type='file']").val();
      $(".upload_name").val(cur);
    });
  },

  tabEvent: () => {
    if ($(window).width() < 768) {
      const tabContainer = $(".tab_box > .inner");
      const tabBox = tabContainer.find("> .tab_slide");
      const tabButton = tabBox.find("> li");
      let size = tabButton.length;
      let tbIndex = 0;

      if (tabBox.length) {
        $(document).ready(function () {
          let tbOn = Math.floor(tabBox.find("> li.on").position().left);
          let tbWidth = tabButton.width();

          tabContainer.animate({ scrollLeft: tbOn - tbWidth }, 0);
        });

        tabContainer.on("load resize scroll", () => {
          tabBoxPosition = Math.abs(tabBox.position().left);

          tabButton.each((index) => {
            tabButtonPosition = Math.floor(tabButton.eq(index).position().left);

            if (size !== index + 1) {
              nextIndexPosition = Math.floor(
                tabButton.eq(index).next().position().left
              );

              if (
                tabBoxPosition > tabButtonPosition &&
                tabBoxPosition <= nextIndexPosition
              ) {
                tbIndex = index;
              }
            }
          });
        });

        $(".control").on("click", function () {
          if ($(this).hasClass("prev")) {
            tsMove = Math.floor(tabButton.eq(tbIndex).position().left);

            tabContainer.animate({ scrollLeft: tsMove }, 200);
          } else {
            tsmoveTrigger = Math.abs(tabBox.position().left);

            if (
              Math.ceil(tsmoveTrigger) ==
              Math.floor(tabButton.eq(tbIndex).next().position().left)
            ) {
              tbIndex = tbIndex + 1;
            } else {
              tbIndex = tbIndex;
            }

            tsMove = Math.floor(tabButton.eq(tbIndex).next().position().left);
            tabContainer.animate({ scrollLeft: tsMove }, 200);
          }
        });
      }
    }
  },

  popup: () => {
    // 스크롤 값 추적
    let scrollPosition = 0;
    $(window).on("scroll", () => {
      scrollPosition = window.pageYOffset;
    });

    // 분양안내용 팝업코드
    const list = $(".list").find("> ul > li"),
      popupUI = $(".popup > ul > li:last-child"),
      popupClose = $(".pop_close"),
      body = document.querySelector("body");

    // list.each((index) => {
    //   list
    //     .eq(index)
    //     .children("a")
    //     .on("click", () => {
    //       let data = list.eq(index).children("p").attr("data-process"),
    //           title = list.eq(index).find("dl dt").text();

    //       locate = list.eq(index).find("dl dd:first-of-type").text();
    //       locate = locate.replace("위치", "");

    //       popupUI.find("dl dt").text(title);
    //       popupUI.find("dl dd").text(locate);

    //       if (data >= 0 && data <= 2) {
    //         return;
    //       } else {
    //         openProcessor();
    //       }
    //     });
    // });
    
    // ajax 페이지에서도 이벤트가 적용되도록 작업. 위에 290~304과 동일한 역할을 합니다. 위에 코드 삭제 여부는 검토 부탁드려요
    $(document).on('click','.list > ul > li a', function(){
	    const li = $(this).parents('li');
      let data = li.children("p").attr("data-process"),
      title = li.find("dl dt").text();
            
      locate = li.find("dl dd:first-of-type").text();
      locate = locate.replace("위치", "");

      popupUI.find("dl dt").text(title);
      popupUI.find("dl dd").text(locate);

        if (data >= 0 && data <= 2) {
          return;
        } else {
          openProcessor();
        }

        // var searchKey = $(this).data('addr');
        // var markerTit = $(this).data('tit');
        // 페이지 초기화
        $('#kakaoMap').html('loading...');
        $('[data-handler="btn-map-detail"]').attr('href','javascript:alert("잠시만 기다려주세요.")');
        
         $.ajax({
         type : "get",
         url:'https://dapi.kakao.com/v2/local/search/address.json?query='+encodeURIComponent(locate),
         headers: {'Authorization' : 'KakaoAK e907ed20e50441767ce164877793fe6d'},
         success : function(data) {
           if( data !=null ){
             if( data.meta.total_count > 0 ){
               addr_y = data.documents[0].y;
               addr_x = data.documents[0].x;
               
               // randering map
                 var mapContainer = document.getElementById('kakaoMap'); // 지도를 표시할 div 
                     var coords = new kakao.maps.LatLng(addr_y, addr_x);
                   mapOption = {
                       center: coords,
                       level: 3
                   };
                   
                 // 지도를 생성합니다    
                var map = new kakao.maps.Map(mapContainer, mapOption); 

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                  /* 221222: 기획팀 요청으로 장소설명 삭제
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="min-width:150px;text-align:center;padding:6px 2px;">'+markerTit+'</div>'
                });
                infowindow.open(map, marker);
                */

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
              $('[data-handler="btn-map-detail"]').attr('href','https://map.kakao.com/?map_type=TYPE_MAP&q='+ encodeURIComponent(locate) + '&urlLevel=2');
             } else {
               console.log(locate +"..............no data...............");	
             }
           } else {
            // mapContainer.html();
             console.log("..............no data...............");
           }
           
         },
         error : function(error) {
           console.log('kakao map',error.responseText);
         }
       });
    });

    // 카카오 지도 연동
    $(document).on('click','.list > ul > li a', function(){
      var searchKey = $(this).data('addr');
      var markerTit = $(this).data('tit');
      // 페이지 초기화
      $('#kakaoMap').html('loading...');
      $('[data-handler="btn-map-detail"]').attr('href','javascript:alert("잠시만 기다려주세요.")');
      
      $.ajax({
        type : "get",
        url:'https://dapi.kakao.com/v2/local/search/address.json?query='+encodeURIComponent(searchKey),
        headers: {'Authorization' : 'KakaoAK e907ed20e50441767ce164877793fe6d'},
        success : function(data) {
          if( data !=null ){
            if( data.meta.total_count > 0 ){
              addr_y = data.documents[0].y;
              addr_x = data.documents[0].x;
              
              // randering map
                var mapContainer = document.getElementById('kakaoMap'); // 지도를 표시할 div 
                    var coords = new kakao.maps.LatLng(addr_y, addr_x);
                  mapOption = {
                      center: coords,
                      level: 3
                  };
                  
                // 지도를 생성합니다    
                var map = new kakao.maps.Map(mapContainer, mapOption); 

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    /*  221222: 기획팀 요청으로 장소설명 삭제
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="min-width:150px;text-align:center;padding:6px 2px;">'+markerTit+'</div>'
                        });
                        infowindow.open(map, marker);
                    */

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                  $('[data-handler="btn-map-detail"]').attr('href','https://map.kakao.com/?map_type=TYPE_MAP&q='+ encodeURIComponent(searchKey) + '&urlLevel=2');
            } else {
              console.log(searchKey +"..............no data...............");	
            }
          } else {
            console.log("..............no data...............");
          }
          
        },
        error : function(error) {
          console.log('kakao map',error.responseText);
        }
      });
    });

    popupUI.children("a").hover(
      function () {
        $(this).find("img:first-child").removeClass("on");
        $(this).find("img:last-child").addClass("on");
      },
      function () {
        $(this).find("img:last-child").removeClass("on");
        $(this).find("img:first-child").addClass("on");
      }
    );

    //공통 팝업코드
    // $(".openPopup").on("click", () => {
    //   openProcessor();
    // });
    
    // ajax 페이지에서도 이벤트가 적용되도록 작업. 위에 339~341과 동일한 역할을 합니다. 위에 코드 삭제 여부는 검토 부탁드려요
    $(document).on("click",".openPopup", () => {
      openProcessor();
    });

    // 팝업 닫기
    popupClose.on("click", () => {
      closeProcessor();
    });

    // 팝업 열기 function
    function openProcessor() {
      scrollPosition = window.pageYOffset;

      $(".popup").addClass("on");
      $("html").addClass("blockScroll");

      body.style.top = `-${scrollPosition}px`;
      console.log(scrollPosition);
      $("header").hide();
    }

    // 팝업 닫기 function
    function closeProcessor() {
      if ($(".gallery_swiper").length) {
        channelEvent.gallerySwiper();
      }

      $("html").removeClass("blockScroll");
      $(".popup").removeClass("on");

      scrollPosition = body.style.top;
      scrollPosition = scrollPosition.replace("px", "");

      window.scrollTo(0, -scrollPosition);
      setTimeout(() => {
        body.style.removeProperty("top");
      }, 300);
      $("header").show();
    }
  },

  goTopEvent: () => {
    $(window).scroll(function () {
      // top button controll
      if ($(this).scrollTop() > 400) {
        $("#topButton").fadeIn();
      } else {
        $("#topButton").fadeOut();
      }
      var footerTop = $("footer").offset().top - $(window).outerHeight();
      var pos = $("footer").outerHeight() + Number(80);
      var pos_m = $("footer").outerHeight() + Number(35);

      if ($(this).scrollTop() > footerTop) {
        if ($("#pc").length) {
          $("#topButton").addClass("on").css({ bottom: pos });
        } else {
          $("#topButton").addClass("on").css({ bottom: pos_m });
        }
      } else {
        if ($("#pc").length) {
          $("#topButton").removeClass("on").css({ bottom: "80px" });
        } else {
          $("#topButton").removeClass("on").css({ bottom: "35px" });
        }
      }
    });

    $(document).on("click", "#topButton", function () {
      $("html, body").animate({ scrollTop: 0 }, "300");
    });
  },

  checkAll: () => {
    $("#chkAll").click(function () {
      if ($("#chkAll").is(":checked")) {
        $('input[class="agree"]').prop("checked", true);
      } else {
        $('input[class="agree"]').prop("checked", false);
      }
    });

    $('input[type="radio"]').click(function () {
      if ($('input[class="disagree"]').is(":checked")) {
        $("#chkAll").prop("checked", false);
      } else {
      }
    });
  },

  headerScroll: () => {
    let before = 0;

    window.addEventListener("scroll", (ev) => {
      if (before < window.scrollY) {
        $("header").addClass("indentUp");
        before = window.scrollY;
      } else if (before > window.scrollY) {
        $("header").removeClass("indentUp").addClass("wht");
        before = window.scrollY;
      }

      if (window.scrollY == 0) {
        if ($(".container").hasClass("graybg")) {
          $("header").removeClass("indentUp").addClass("wht");
        } else {
          $("header").removeClass("indentUp").removeClass("wht");
        }
      }
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

  policyEvent: () => {
    $(document).on("click", ".terms_site .site_selected", function () {
      var selElm = $(this).parent();
      if (!selElm.hasClass("open")) {
        selElm.addClass("open");
      } else {
        selElm.removeClass("open");
      }
    });

    $(document).on("click", ".terms_site .site_list li a", function () {
      var selected = this.innerText,
        siteName = document.getElementsByClassName("site_selected")[0],
        familySite = this.parentNode.parentNode.parentNode;

      siteName.innerText = selected;
      familySite.classList.remove("open");
    });
  },
};

var essentialEvent = {
  init: function () {
    this.saveSwiper();
    this.solveSwiper();
    this.gsap();
    this.sectionOffset();

    // AOS.init({
    //     // 핸들링 참고: https://github.com/michalsnik/aos
    //     // disable: 'mobile',
    //     once : true,
    //     throttleDelay : 99,
    //     duration: 1000,
    //     anchorPlacement: 'center-bobttom',
    //     startEvent: "load",

    // });
  },

  saveSwiper: () => {
    if ($("#mobile").length) {
      let saveSlider = new Swiper(".save_swiper", {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 25,
        speed: 500,
        observer: true,
        observeParents: true,
      });
    } else {
    }
  },

  solveSwiper: () => {
    let solveSlider = new Swiper(".solve_swiper", {
      // width: 600,
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 50,
      speed: 1000,
      allowTouchMove: true,
      initialSlide: 1,
      loop: true,
      loopAdditionalSlides: 0,
      observer: true,
      observeParents: true,
      freeMode: true,
      centeredSlides: false,
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 30,
          initialSlide: 0,
        },
      },
    });
  },
  gsap: () => {
    // Landing Page ScrollTrigger/ 참고 https://velog.io/@yesslkim94/GSAP-ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ************************************************** 초기 시작 값

    gsap.to(".scroll-container", {
      opacity: 1,
      duration: 1,
      delay: 1,
    });

    // ************************************************** live
    const tl1 = gsap.timeline();

    ScrollTrigger.create({
      animation: tl1,
      trigger: ".live",
      pin: true,
      pinSpacing: true,
      start: "0% 0%",
      end: "+=110%",
      scrub: true,
    });

    tl1
      .to(".live .img01", {
        top: "-100%",
        opacity: "0",
        duration: 35,
        delay: 50,
      })
      .to(".live .img01", { /*  display: 'none', */ duration: 20, delay: 20 });

    // ************************************************** love
    const tl2 = gsap.timeline();

    ScrollTrigger.create({
      animation: tl2,
      trigger: ".love",
      pin: true,
      pinSpacing: true,
      start: "100% 100%",
      end: "+=300%",
      scrub: true,
    });

    tl2
      .to("#pc .love h3", {
        transform: "scale(10)",
        opacity: ".1",
        duration: 2,
      })
      .to("#mobile .love h3", {
        transform: "scale(4)",
        opacity: ".1",
        duration: 2,
      })
      .to(".love h3", { transform: "scale(1)", opacity: ".1", duration: 2 })
      .to(".love h3", { opacity: "1", duration: 2, delay: 2 })
      .to(".love .sub", {
        opacity: "1",
        transform: "translateY(0)",
        duration: 2,
        delay: 1,
      })
      .to(".love .intro", {
        transform: "scale(1)",
        top: "0",
        duration: 3,
        delay: 3,
      })
      .to(".love h3", {
        opacity: "0",
        transform: "translateY(-50px)",
        duration: 2,
        delay: 2,
      })
      .to(".love .sub", {
        opacity: "0",
        transform: "translateY(-50px)",
        duration: 2,
        delay: 1,
      })
      .to(".love h3, .love .sub", { display: "none", duration: 1 })

      .to(".love .weve_tit, .love .weve_sub", { display: "block", duration: 1 })

      .to(".love .weve_tit, .love .weve_sub", {
        opacity: "1",
        transform: "translateY(0)",
        duration: 2,
      })
      .to(".love .intro", { opacity: "1", delay: 3 });
  },

  sectionOffset: () => {
    $(window).on("scroll", () => {
      const have = $(".have").offset().top - 500,
        live = $(".live").offset().top,
        save = $(".save").offset().top - 500,
        solve = $(".solve").offset().top - 500,
        st = $(window).scrollTop();

      if (st > have) {
        $(".have").addClass("active");
      }
      if (st > live) {
        $(".live").addClass("active");
      }
      if (st > save) {
        $(".save").addClass("active");
      }
      if (st > solve) {
        $(".solve").addClass("active");
      }
    });
  },
};

var channelEvent = {
  init: function () {
    this.gallerySwiper();
    this.adVideo();
    this.awardScroll();
  },

  gallerySwiper: () => {
    let gallSlider = new Swiper(".gallery_swiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      initialSlide: 0,
      speed: 500,
      observer: true,
      observeParents: true,
      centeredSlides: true,
      navigation: {
        nextEl: ".gallery_swiper .swiper-button-next",
        prevEl: ".gallery_swiper .swiper-button-prev",
      },
      pagination: {
        el: ".gallery_swiper .swiper-pagination",
        type: "fraction",
        formatFractionCurrent: function (number) {
          return ("0" + number).slice(-2);
        },
        formatFractionTotal: function (number) {
          return ("0" + number).slice(-2);
        },
        renderFraction: function (currentClass, totalClass) {
          return (
            '<span class="' +
            currentClass +
            '"></span>' +
            " / " +
            '<span class="' +
            totalClass +
            '"></span>'
          );
        },
      },
    });
  },

  adVideo: () => {
    $(".ad .youtube a").click(function () {
      $(".ad .video_modal_popup .video-wrapper").remove(),
        $(".ad .big_video img").hide(),
        $(".ad .video_modal_popup").append(
          "<div class='video-wrapper'><iframe max-width='900' width='100%' height='506' src='https://youtube.com/embed/" +
            $(this).data("video") +
            "?rel=0&playsinline=1&autoplay=1$mute=1' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>"
        );
    });
  },

  awardScroll: () => {
    // 연혁 인터랙션
    $(document).ready(function () {
      var section = $("._historySection");
      var sectionOn = $("._historySection.on");
      let sectionLength = section.length;

      // 연도와 내용 높이값 맞추기
      section.find(".desc-info").each(function (idx) {
        let sectionHeight = section.eq(idx).find(".desc-info").height();
        section
          .eq(idx)
          .find(".year-info")
          .css("height", sectionHeight / 10 + "rem");
      });

      $(window).on("scroll resize", function () {
        var currentPosition = $(window).scrollTop();
        var scrollEnd = $(document).height() - $(window).height();

        for (var i = 0; i < sectionLength; i++) {
          setHistoryScroll(section.eq(i));
        }

        // 연혁 연도 마지막 active일 때, 내용 마지막 active 또는 스크롤 맨 끝 도달 시
        if (
          $(".tab_contents.on .year-info")
            .find("li:last-child")
            .hasClass("active") ||
          $(window).scrollTop() >= scrollEnd
        ) {
          $(".tab_contents.on .year-info")
            .find("li:last-child")
            .addClass("active");
          $(".tab_contents.on .year-info")
            .find("li:not(:last-child)")
            .removeClass("active");
          $(".tab_contents.on .desc-info")
            .find("ul:last-child")
            .addClass("active");
          $(".tab_contents.on .desc-info")
            .find("ul:not(:last-child)")
            .removeClass("active");
        }
      });

      function setHistoryScroll($information) {
        var sectionOffset = $information
          .find(".desc-info ul")
          .eq(0)
          .offset().top;
        var size = $information.find(".year-info li").length;
        let gap = 20;
        let gapYear = 120;
        let currentPosition = $(window).scrollTop() + 175;
        let getFixedMargin = 180;
        let lastUl = $information.find(".desc-info ul").last(); // 연혁 마지막 내용 위치값
        let lastBottom = lastUl.offset().top + lastUl.height(); // 연혁 마지막 내용 끝 지점

        $information.find(".year-info li").each(function (index) {
          // 반응형 변수값 교체
          if ($(window).width() < 768) {
            gap = 150;
            gapYear = 100;
            currentPosition = $(window).scrollTop() + 50;
            getFixedMargin = 50;
          }

          if (currentPosition < sectionOffset) {
            //섹션 이전 화면에서는 absolute상태
            $information
              .find(".year-info")
              .css({ top: "auto", position: "absolute", "margin-top": "0" });
            $information
              .find(".year-info ul")
              .css({ position: "relative", "margin-top": "0" });

            // 반응형 태블릿 연도 좌우 고정풀기
            if ($(window).width() <= 1400 && $(window).width() > 767) {
              $(window).scroll(function () {
                $(".year-info").css("left", 0 - $(this).scrollLeft());
              });
            } else {
              $(window).scroll(function () {
                $(".year-info").css("left", "initial");
              });
            }
          } else if (
            $information.hasClass("on") &&
            currentPosition > lastBottom &&
            $(window).height() < 851
          ) {
            // 연혁 내용 마지막 위치값 이상 넘어갈 경우 연도 고정
            $information.find(".year-info").css({
              top: "auto",
              bottom: "0",
              position: "absolute",
              "margin-top": "0",
            });
            $information
              .find(".year-info ul")
              .css({ position: "absolute", bottom: "50px" });
            $(".tab_contents .year-info")
              .find("li:last-child")
              .addClass("active");
            // $('.tab_contents .year-info').find('li:not(:last-child)').removeClass('active');
          } else {
            //섹션 안으로 들어오면 fixed 상태
            if (size !== index + 1) {
              if (
                currentPosition >
                  $information.find(".desc-info ul").eq(index).offset().top -
                    gap &&
                currentPosition <
                  $information
                    .find(".desc-info ul")
                    .eq(index + 1)
                    .offset().top -
                    gap
              ) {
                $information.find(".year-info").css({
                  top: "0px",
                  bottom: "auto",
                  position: "fixed",
                  "margin-top": "" + getFixedMargin + "px",
                });
                $information.find(".year-info ul").css({
                  "margin-top": "-" + gapYear * index + "px",
                  position: "relative",
                  bottom: "unset",
                });
                $information
                  .find(".year-info li")
                  .eq(index)
                  .addClass("active")
                  .siblings()
                  .removeClass("active");
                $information
                  .find(".desc-info ul")
                  .eq(index)
                  .addClass("active")
                  .siblings()
                  .removeClass("active");
              }
            } else {
              if (
                currentPosition >
                $information.find(".desc-info ul").eq(index).offset().top - gap
              ) {
                // 연혁 내용 마지막 위치값 안으로 진입할 경우 연도 fixed
                if (currentPosition < lastBottom) {
                  $information.find(".year-info").css({
                    top: "0",
                    bottom: "auto",
                    position: "fixed",
                    "margin-top": "" + getFixedMargin + "px",
                  });
                  $information.find(".year-info ul").css({
                    "margin-top": "-" + gapYear * index + "px",
                    position: "relative",
                    bottom: "unset",
                  });
                }
                $information
                  .find(".desc-info ul")
                  .eq(index)
                  .addClass("active")
                  .siblings()
                  .removeClass("active");
                $information
                  .find(".year-info li")
                  .eq(index)
                  .addClass("active")
                  .siblings()
                  .removeClass("active");
              }
            }
          }
        });
      }
    });
  },
};

var estateEvent = {
  init: function () {
    this.historySlider();
    this.estList();
    this.estTab();
  },

  historySlider: () => {
    const board = $(".estBoard").children("li"),
      estAlert01 = board.find(".block_2depth li:first-child"),
      estButton = board.find(".block_2depth li:last-child a");

    var estSlider = new Swiper(".estSlider", {
      slidesPerView: 3,
      initialSlide: 1,
      spaceBetween: 0,
      speed: 500,
      observer: true,
      observeParents: true,
      centeredSlides: true,
      navigation: {
        nextEl: ".estNav.swiper-button-next",
        prevEl: ".estNav.swiper-button-prev",
      },

      on: {
        init: function () {
          board.eq(this.activeIndex).addClass("active");
        },
        activeIndexChange: function () {
          let idx = this.activeIndex;
          board.not(":eq(" + idx + ")").removeClass("active");
          board.eq(idx).addClass("active");
        },
      },
    });

    estAlert01.each((index) => {
      let data = estAlert01.eq(index).attr("data-process");

      if (data == 0) {
        estAlert01.eq(index).css({ background: "#005eb8" }).text("분양중");
      } else if (data == 1) {
        estAlert01.eq(index).css({ background: "#888888" }).text("분양완료");
      } else if (data == 2) {
        estAlert01
          .eq(index)
          .css({
            background: "#fff",
            border: "1px solid #005eb8",
            color: "#005eb8",
          })
          .text("분양예정");
      }
    });

    estButton.hover(
      function () {
        $(this).find("img:first-child").removeClass("on");
        $(this).find("img:last-child").addClass("on");
      },
      function () {
        $(this).find("img:last-child").removeClass("on");
        $(this).find("img:first-child").addClass("on");
      }
    );
  },

  estList: () => {
    const estlist = $(".estList").find("> ul > li"),
      estAlert02 = estlist.children("p"),
      estSearchBar = $(".estSearch").children("ul"),
      personalColor = ["#005eb8", "#888888", "#f5f5f5", "#005eb8"];
    //   icon = [/* 'list_homepage_icon.png', 'list_homepage_icon_hover.png',  */'list_map_icon.png', 'list_map_icon_hover.png'];

    estAlert02.each((index) => {
      data = estAlert02.eq(index).attr("data-process");
      let dataButton = estAlert02.eq(index).siblings("a");

      // set process
      if (data == 0) {
        estAlert02
          .eq(index)
          .css({ background: +"" + personalColor[0] + "", color: "#fff" })
          .text("분양중");
      } else if (data == 1) {
        estAlert02
          .eq(index)
          .css({
            border: "1px solid " + personalColor[1] + "",
            color: personalColor[1],
          })
          .text("분양완료");
      } else if (data == 2) {
        estAlert02
          .eq(index)
          .css({
            background: "#fff",
            border: "1px solid " + personalColor[0] + "",
            color: personalColor[0],
          })
          .text("분양예정");
      } else if (data == 3) {
        estAlert02
          .eq(index)
          .css({ background: +"" + personalColor[1] + "", color: "#fff" })
          .text("공사중");
      } else if (data == 4) {
        estAlert02
          .eq(index)
          .css({ background: +"" + personalColor[0] + "", color: "#fff" })
          .text("입주중");
      } else if (data == 5) {
        estAlert02
          .eq(index)
          .css({
            background: "#fff",
            border: "1px solid " + personalColor[0] + "",
            color: personalColor[0],
          })
          .text("입주예정");
      }

      // // set icon
      // if (data >= 0 && data <= 2) {
      //     dataButton.css({'background': personalColor[2] + ' url(images/estate/' + icon[0] + ') 50% 50% no-repeat'});
      //     mobileIconSize();
      // } else {
      //     dataButton.css({'background': personalColor[2] + ' url(images/estate/' + icon[2] + ') 50% 50% no-repeat'});
      //     mobileIconSize();
      // }

      // // mobile icon size adjustment
      // function mobileIconSize() {
      //     if ($('#mobile').length) {
      //         dataButton.css({'background-size': '40%'});
      //     }
      // }
    });

    // option spread
    if ($("#pc").length) {
      estSearchBar.find("> li p").click(() => {
        estSearchBar.toggleClass("active");
      });
    } else {
      if (estSearchBar.hasClass(".active")) {
        $(this).css("transition-duration", ".5s").addClass("dd");
      } else {
      }
      if ($("#mobile .mob_select").length) {
        estSearchBar.find(".mob_select").click(() => {
          estSearchBar.toggleClass("active");

          if (estSearchBar.hasClass("active")) {
            $(".mob_select").text("상세검색 닫기");
          } else {
            $(".mob_select").text("상세검색 열기");
          }
        });
      } else {
        estSearchBar.find("> li p").click(() => {
          estSearchBar.toggleClass("active");
        });
      }
    }

    // option data getter
    $(".estSearch .block_2depth > li").on("click", function () {
      $(this).toggleClass("on");

      let data = $(this).attr("data-process");
      console.log("data control | " + data);
    });

    // effect chenge icon when each list hovering
    // estlist.each((index) => {
    //     estlist.eq(index).hover(function() {
    //         data = $(this).children('p').attr('data-process');
    //         dataButton = $(this).children('p').siblings('a');

    //         if (data >= 0 && data <= 2) {
    //             dataButton.css({'background': personalColor[3] + ' url(images/estate/' + icon[1] + ') 50% 50% no-repeat'});
    //         } else {
    //             dataButton.css({'background': personalColor[3] + ' url(images/estate/' + icon[3] + ') 50% 50% no-repeat'});
    //         }
    //         mobileIconSize();

    //     }, function() {
    //         if (data >= 0 && data <= 2) {
    //             dataButton.css({'background': personalColor[2] + ' url(images/estate/' + icon[0] + ') 50% 50% no-repeat'});
    //         } else {
    //             dataButton.css({'background': personalColor[2] + ' url(images/estate/' + icon[2] + ') 50% 50% no-repeat'});
    //         }
    //         mobileIconSize();
    //     });

    //     // mobile icon size adjustment
    //     function mobileIconSize() {
    //         if ($('#mobile').length) {
    //             dataButton.css({'background-size': '40%'});
    //         }
    //     }
    // })
  },

  estTab: () => {
    $("#pc .estate nav li a").on("click", function () {
      $("header").addClass("indent");
    });
  },
};

var csEvent = {
  init: function () {
    this.faqToggle();
    // this.inqEmail();
    this.DirectSelect();
  },

  faqToggle: function () {
    $(".que").click(function () {
      $(this).next(".ans").stop().slideToggle(300);
      $(this).toggleClass("on").siblings().removeClass("on");
      $(this).next(".ans").siblings(".ans").slideUp(300);
    });
  },

  inqEmail: function () {
    //selectbox
    var selectType = $(".select_row>select");
    selectType.addClass("selectBox");
    selectChange(selectType);
    function selectChange(type) {
      type.change(function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);

        if (select_name === "직접입력") {
          $(this).parent().siblings($("#selboxDirect")).show();
        } else {
          $(this).parent().siblings($("#selboxDirect")).hide();
        }
      });
    }
  },

  DirectSelect: function () {
    var selectType = $("#find_complex");
    selectChange(selectType);
    function selectChange(type) {
      type.change(function () {
        var select_name = $(this).siblings("label").text();
        if (select_name === "직접입력") {
          $(this).parent().siblings($("#selboxDirect")).show();
        } else {
          $(this).parent().siblings($("#selboxDirect")).hide();
        }
      });
    }
  },
};

var myWeveEvent = {
  init: function () {
    this.loginbtn();
    this.listNoData();
    this.checkbox();
    this.subTab();
    this.const_popup();
    this.modEmail();
    this.selLabelColor();
  },
  loginbtn: () => {
    $(".get_authenNumber").click(function () {
      $(this).addClass("active");
      $(".login_area").show(200);
    });
  },

  listNoData: () => {
    const contWrap = $(".cont_wrap").find("ol");

    contWrap.each((index) => {
      let contData = contWrap.eq(index).find("li a");

      contData.each((index) => {
        if (contData.eq(index).html() == "") {
          contData.eq(index).addClass("empty");
        }
      });

      if (contWrap.eq(index).find("li a:not(.empty)").length === 0) {
        contData.not(":eq(0)").parent().remove();
        contData.eq(0).toggleClass("empty no_data");

        contWrap.eq(index).find(".no_data").text("예약하신 내역이 없습니다.");
      }
    });
  },

  checkbox: () => {
    $(".contract_info .checkbox input").change(function () {
      $(this).closest("tr").siblings("tr").removeClass("on");
      $(this).closest("tr").addClass("on");
    });
  },

  subTab: () => {
    const tabContainer = $("#mobile .tab_box > .inner"),
      tabBox = tabContainer.find("> .tab_slide"),
      tabButton = tabBox.find("> li");

    let size = tabButton.length,
      tbIndex = 0;

    if (tabBox.length) {
      $(document).ready(function () {
        let tbOn = Math.floor(tabBox.find("> li.on").position().left),
          tbWidth = tabButton.width();

        tabContainer.animate({ scrollLeft: tbOn - tbWidth }, 1000);
      });

      tabContainer.on("load resize scroll", () => {
        tabBoxPosition = Math.abs(tabBox.position().left);

        tabButton.each((index) => {
          tabButtonPosition = Math.floor(tabButton.eq(index).position().left);

          if (size !== index + 1) {
            nextIndexPosition = Math.floor(
              tabButton.eq(index).next().position().left
            );

            if (
              tabBoxPosition > tabButtonPosition &&
              tabBoxPosition <= nextIndexPosition
            ) {
              tbIndex = index;
            }
          }
        });
      });
    }
  },

  const_popup: () => {
    if ($(window).width() > 768) {
      var popTab = new Swiper(".const_status .pop_tab", {
        slidesPerView: 6,
        slidesPerGroup: 6,
        spaceBetween: 0,
        initialSlide: 1,
        speed: 500,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: ".pop_tab_wrap .swiper-button-next",
          prevEl: ".pop_tab_wrap .swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            loopFillGroupWithBlank: false,
            simulateTouch: true,
            touchStartPreventDefault: false,
          },
        },
      });
    } else {
    }

    var popSwiper = new Swiper(".const_status .tab_contents .img_slide", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 500,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: ".imgswiper_wrap .swiper-button-next",
        prevEl: ".imgswiper_wrap .swiper-button-prev",
      },
      pagination: {
        el: ".imgswiper_wrap .swiper-pagination",
        type: "fraction",
        formatFractionCurrent: function (number) {
          return ("0" + number).slice(-2);
        },
        formatFractionTotal: function (number) {
          return ("0" + number).slice(-2);
        },
        renderFraction: function (currentClass, totalClass) {
          return (
            '<span class="' +
            currentClass +
            '"></span>' +
            " / " +
            '<span class="' +
            totalClass +
            '"></span>'
          );
        },
      },
    });

    $(".pop_tab ul li").on("click", function () {
      $(".pop_tab ul li").removeClass("on");
      $(this).addClass("on");
      popSwiper.slideTo(0);
    });

    $(".contract_info .openPopup ").on("click", function () {
      $(".contract_info .const_status").show();
      let totalPercent = $(".top .progress_wrap p b").text(),
        currPercent = $(".tab_con .progress_bar .current_bar .num").text();
      console.log();

      $(".popup .const_status .top .progress_wrap .progress_bar span").css(
        "width",
        totalPercent
      );
      $(".popup .const_status .tab_con .progress_bar .current_bar").css(
        "width",
        currPercent
      );
    });

    $(".contract_info .pop_close ").on("click", function () {
      $(".popup .const_status .top .progress_wrap .progress_bar span").css(
        "width",
        "0"
      );
      $(".popup .const_status .tab_con .progress_bar .current_bar").css(
        "width",
        "0"
      );
    });
  },

  modEmail: () => {
    //selectbox
    var selectType = $("#email_self");
    // selectType.addClass("selectBox");
    selectChange(selectType);
    function selectChange(type) {
      type.change(function () {
        var select_name = selectType.children("option:selected").text();
        console.log("select_name" + $(select_name));
        $(this).siblings("label").text(select_name);

        if (select_name === "직접입력") {
          $("#selboxDirect").show();
          $(".email_cell").addClass("has_sel");
          $("#email_self").siblings("label").css("color", "#b2b2b2");
        } else {
          $("#selboxDirect").hide();
          $(".email_cell").removeClass("has_sel");
          $("#email_self").siblings("label").css("color", "#555");
        }
      });
    }
  },

  selLabelColor: () => {
    $('.reservation_apply .cont > ul:last-child select').on('change', function() {      
      $(this).siblings('label').css('color','#555');
    });
  },
};

var datepicker = {
  init: function () {
    this.reservation();
  },
  reservation: () => {
    "use strict";
    // 팝업 스크롤 블록 개별 제어
    let scrollPosition = 0;
    $(window).on("scroll", () => {
      scrollPosition = window.pageYOffset;
    });

    $("#datepicker").datetimepicker({
      // **jquery.datetimepicker.full.js 파일

      // 팝업영역 외부 클릭시 꺼지는 현상 2319줄 주석처리
      // 모바일 드래그 및 버튼 클릭 불가 현상 1359~ 1365줄 주석처리
      // 시간 선택박스 예약불가 클래스(disable) 걸려있을 경우 1976~ 1980 줄 코드 추가
      // 모바일일 경우 팝업 박스 "position: relative" 2214~ 2216 줄 코드 추가

      allowTimes: [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
      ],
    });

    $(document).ready(() => {
      // 기존 datepikcer 삭제 (중복 방지)
	    $('.popup .xdsoft_datetimepicker').remove();

      // jquery.datetimepicker.full.js 파일 1948줄 .book_tag 추가
      const dateSheet = $(".xdsoft_datetimepicker"),
        dateChildren = dateSheet.children("div"),
        booktag = $(".xdsoft_time_box .xdsoft_time .book_tag");

      dateSheet.appendTo(".popup");
      dateChildren.eq(0).wrap("<div class='datepicker_wrap'></div>");
      dateChildren.eq(1).wrap("<div class='timepicker_wrap'></div>");
      dateChildren.parent().prepend("<div class='picker_tit'></div>");
      dateSheet.prepend("<h2 class='pop_tit'>방문예약 일시선택</h2>");
      dateSheet.append(
        '<div class="btn_line"><a href="javascript:;">예약일시 선택하기</a></div>'
      );

      let selection = $(".picker_tit");

      selection.eq(0).html("<b>01.</b> 방문 희망일자 선택");
      selection.eq(1).html("<b>02.</b> 방문 희망시간 선택");

      $("#datepicker").on("click", function () {
        openProcessor();
      });

      $(".pop_close, .xdsoft_datetimepicker .btn_line > a").on(
        "click",
        function () {
          closeProcessor();
        }
      );

      // 팝업 열기 function [ 팝업 스크롤 블록 개별 제어(2) ]
      function openProcessor() {
        scrollPosition = window.pageYOffset;

        dateSheet.fadeIn(300);
        $(".pop_close").prependTo(dateSheet);
        $(".pop_close").addClass("mov_datepicker");
        $(".const_status").hide();

        $(".popup").addClass("on");
        $("html").addClass("blockScroll");

        $("body").css({ top: `-${scrollPosition}px` });
        $("header").hide();
      }

      // 팝업 닫기 function
      function closeProcessor() {
        dateSheet.fadeOut(300);
        $(".pop_close").prependTo($(".const_status"));
        $(".pop_close").removeClass("mov_datepicker");

        $("html").removeClass("blockScroll");
        $(".popup").removeClass("on");

        scrollPosition = $("body").css("top");
        scrollPosition = scrollPosition.replace("px", "");

        window.scrollTo(0, -scrollPosition);
        setTimeout(() => {
          $("body").removeProp("top");
        }, 300);
        $("header").show();
      }
    });
  },
};

function addressKindChange(e) {
  var livingroom = [
    "A/S 대상을 선택해 주세요.",
    "걸레받이",
    "공청TV",
    "도배",
    "목재문(틀)",
    "몰딩",
    "홈네트워크(비디오폰)",
    "아트월",
    "유리",
    "전등",
    "전화",
    "콘센트,스위치",
    "화재감지기",
    "PL창(틀)",
    "스피커",
    "기타",
  ];
  var bedroom = [
    "A/S 대상을 선택해 주세요.",
    "가구(붙박이장)",
    "걸레받이",
    "공청TV",
    "도배",
    "목재문(틀)",
    "몰딩",
    "바닥재(마루)",
    "아트월",
    "유리",
    "전등",
    "전화",
    "콘센트,스위치",
    "화재감지기",
    "AL창(틀)",
    "PL창(틀)",
    "기타",
  ];
  var kitchen = [
    "A/S 대상을 선택해 주세요.",
    "가스감지기",
    "걸레받이",
    "도배",
    "라디오/액정 TV",
    "렌지후드",
    "목재문(틀)",
    "몰딩",
    "바닥재(마루)",
    "수전류",
    "유리",
    "전등",
    "주방가구",
    "콘센트,스위치",
    "타일",
    "화재감지기",
    "AL창(틀)",
    "PL창(틀)",
    "빌트인 가스레인지",
    "빌트인 냉장고",
    "빌트인 세탁기",
    "빌트인 식기세척기",
    "빌트인 오븐렌지",
    "빌트인 잔반탈수기",
    "기타",
  ];
  var entrance = [
    "A/S 대상을 선택해 주세요.",
    "가구(신발장)",
    "걸레받이",
    "도배",
    "디지털 도아록",
    "몰딩",
    "바닥재(석재)",
    "바닥재(타일)",
    "실리콘(코킹)",
    "아트월",
    "유리",
    "일괄소등스위치",
    "전등",
    "철재문(틀)",
    "기타",
  ];
  var sharedBathroom = [
    "A/S 대상을 선택해 주세요.",
    "욕실장",
    "누수",
    "도배",
    "욕실문(틀)",
    "몰딩",
    "바닥 배수구",
    "비데",
    "샤워부스",
    "세면기",
    "수전류(샤워기 포함)",
    "실리콘(코킹)",
    "액세서리류",
    "양변기",
    "욕실폰",
    "욕조",
    "월풀욕조",
    "전등",
    "점검구",
    "콘센트,스위치",
    "타일",
    "천장 배기휀",
    "기타",
  ];
  var coupleBathroom = [
    "A/S 대상을 선택해 주세요.",
    "욕실장",
    "누수",
    "도배",
    "욕실문(틀)",
    "몰딩",
    "바닥 배수구",
    "비데",
    "샤워부스",
    "세면기",
    "수전류(샤워기 포함)",
    "실리콘(코킹)",
    "액세서리류",
    "양변기",
    "욕실폰",
    "욕조",
    "월풀욕조",
    "전등",
    "점검구",
    "콘센트,스위치",
    "타일",
    "천장 배기휀",
    "기타",
  ];
  var balcony = [
    "A/S 대상을 선택해 주세요.",
    "세탁선반",
    "난간대",
    "누수",
    "도장",
    "바닥 배수구",
    "선홈통",
    "수전류",
    "실리콘(코킹)",
    "전등",
    "콘센트,스위치",
    "타일",
    "균열",
    "PL창(틀)",
    "유리",
    "기타",
  ];
  var dressroom = [
    "A/S 대상을 선택해 주세요.",
    "문짝 및 문틀",
    "시스템 선반",
    "가구(화장대)",
    "도배",
    "목재문(틀)",
    "몰딩",
    "바닥재(마루)",
    "PL창(틀)",
    "유리",
    "전등",
    "콘센트,스위치",
    "기타",
  ];
  var outdoorroom = [
    "A/S 대상을 선택해 주세요.",
    "도장",
    "보일러",
    "실리콘(코킹)",
    "전등",
    "철재문(틀)",
    "콘센트,스위치",
    "AL창(틀)",
    "기타",
  ];
  var laundryroom = [
    "A/S 대상을 선택해 주세요.",
    "도장",
    "보일러",
    "실리콘(코킹)",
    "전등",
    "PL창(틀)",
    "유리",
    "콘센트,스위치",
    "기타",
  ];
  var direct = ["A/S 대상을 선택해 주세요.", "직접입력"];

  var target = document.getElementById("sel03");
  var selDirect = document.getElementById("selboxDirect");
  selDirect.style.display = "none";

  if (e.value == "1") var d = livingroom;
  else if (e.value == "2") var d = bedroom;
  else if (e.value == "3") var d = kitchen;
  else if (e.value == "4") var d = entrance;
  else if (e.value == "5") var d = sharedBathroom;
  else if (e.value == "6") var d = coupleBathroom;
  else if (e.value == "7") var d = balcony;
  else if (e.value == "8") var d = dressroom;
  else if (e.value == "9") var d = outdoorroom;
  else if (e.value == "10") var d = laundryroom;
  if (e.value == "direct") {
    var d = direct;
    selDirect.style.display = "block";
  } else {
    selDirect.style.display = "none";
  }

  target.options.length = 0;

  for (x in d) {
    var opt = document.createElement("option");
    opt.value = d[x];
    opt.innerHTML = d[x];
    target.appendChild(opt);
  }
  var sel03Direct = $("#sel03Direct");
  $(sel03Direct).hide();
  $("#sel03").on("change", function () {
    if (
      $("#sel03").siblings("label").text() == "직접입력" ||
      $("#sel03").siblings("label").text() == "기타"
    ) {
      $(sel03Direct).show();
      console.log("sel03Direct : " + sel03Direct);
    } else {
      $(sel03Direct).hide();
    }
  });
}

var fileNo = 0;
var filesArr = new Array();

/* 첨부파일 추가 */
function addFile(obj) {
  var maxFileCnt = 5; // 첨부파일 최대 개수
  var attFileCnt = document.querySelectorAll(".filebox").length; // 기존 추가된 첨부파일 개수
  var remainFileCnt = maxFileCnt - attFileCnt; // 추가로 첨부가능한 개수
  var curFileCnt = obj.files.length; // 현재 선택된 첨부파일 개수

  // 첨부파일 개수 확인
  if (curFileCnt > remainFileCnt) {
    alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
  }

  for (var i = 0; i < Math.min(curFileCnt, remainFileCnt); i++) {
    const file = obj.files[i];

    // 첨부파일 검증
    if (validation(file)) {
      // 파일 배열에 담기
      var reader = new FileReader();
      reader.onload = function () {
        filesArr.push(file);
      };
      reader.readAsDataURL(file);

      // 목록 추가
      let htmlData = "";
      htmlData += '<div id="file' + fileNo + '" class="filebox">';
      htmlData += '   <p class="name">' + file.name + "</p>";
      htmlData +=
        '   <a class="delete" onclick="deleteFile(' + fileNo + ');"></a>';
      htmlData += "</div>";
      $(".file-list").append(htmlData);
      fileNo++;
    } else {
      continue;
    }
  }
  // 초기화
  document.querySelector("input[type=file]").value = "";
}

/* 첨부파일 검증 */

// 파일 사이즈 체크
var maxSize = 10485760; //10MB

function validation(obj) {
  const fileTypes = [
    "image/gif",
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/bmp",
    "image/tif",
  ];
  if (obj.size > maxSize) {
    alert("최대 파일 용량인 10MB를 초과한 파일은 제외되었습니다.");
    return false;
  } else if (!fileTypes.includes(obj.type)) {
    alert("첨부가 불가능한 파일은 제외되었습니다.");
    return false;
  } else {
    return true;
  }
}

/* 첨부파일 삭제 */
function deleteFile(num) {
  document.querySelector("#file" + num).remove();
  filesArr[num].is_delete = true;
}

/* 폼 전송 */
function submitForm() {
  // 폼데이터 담기
  var form = document.querySelector("form");
  var formData = new FormData(form);
  for (var i = 0; i < filesArr.length; i++) {
    // 삭제되지 않은 파일만 폼데이터에 담기
    if (!filesArr[i].is_delete) {
      formData.append("attach_file", filesArr[i]);
    }
  }
}
