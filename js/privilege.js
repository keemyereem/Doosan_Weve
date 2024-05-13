/*
https://gsap.com/docs/v3/Plugins/ScrollTrigger
https://gsap.com/docs/v3/GSAP/Tween
https://gsap.com/docs/v3/GSAP/Timeline
https://agal.tistory.com/m/210

- 참고 소스
https://codepen.io/BrianCross/pen/PoWapLP
https://codepen.io/GreenSock/pen/ExEOeJQ
https://codepen.io/cassie-codes/pen/vYWvwXV
https://codepen.io/urbgimtam/pen/XWXdypQ
-- 탭
https://codepen.io/chrispanayotoff/pen/qBbmLr

http://everylastdrop.co.uk/
https://lpla.tistory.com/107



.privilege #have.panel ~ .privilege #solve.panel >> 배경 이미지 사이즈 조절해주세요
*/
var privEvent = {
  init: function () {
    this.setScrollMotion();

    if ($(window).width() <= 768) {
      this.privMSwiper();
    }
  },
  setScrollMotion: () => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollList = gsap.utils.toArray(
      '[gsap-motion-scene],[gsap-motion-panel]'
    );
    /*
    const $panelList = gsap.utils.toArray('[gsap-motion-panel]');
    const $navButtons = $('.anchor-nav a').filter('[href^=#]');
    const pageHeight = window.innerHeight;
    */

    let currentPanel;
    let isAnimating;

    const markerConf = {
      timeline: false,
      /*{
        startColor: 'black',
        endColor: 'black',
        fontWeight: 'bold',
        indent: 200,
      }*/
      timelinePanel: false,
      /*{
        startColor: 'green',
        endColor: 'green',
        fontWeight: 'bold',
        indent: 400,
      }*/
      scroll: {
        startColor: 'red',
        endColor: 'red',
        fontWeight: 'bold',
        indent: 0,
      },
      scrollPanel: {
        startColor: 'blue',
        endColor: 'blue',
        fontWeight: 'bold',
        indent: 300,
      },
    };
    /* >>>>>  set time line : header */
    const getSceneTimeLineHeader = () => {
      const tl = gsap.timeline({
        markers: markerConf.timeline,
        paused: true, //정지된 상태로 변수 생성
        onUpdate: (e) => {
          if (tl._time > 5) {
            $('.sec0-list').addClass('open');
          } else {
            $('.sec0-list').removeClass('open');
          }
        },
        onStart: () => {
          console.log('@@@ onStart', 'getSceneTimeLineHeader');
        },
        onComplete: () => {
          console.log('@@@ onComplete', 'getSceneTimeLineHeader');
        },
      });
      return tl
        .to('.sec0-tit01', { y: -40, duration: 2 })
        .to('.sec0-tit02', { y: -10, opacity: '1', duration: 2 })
        .to('.sec0-tit01, .sec0-tit02', {
          transform: 'scale(0.8)',
          duration: 4,
        })
        .to('.sec0-list01', { opacity: '1', duration: 1 }, 12)
        .to('.sec0-list02', { opacity: '1', duration: 1 })
        .to('.sec0-list03', { opacity: '1', duration: 1 })
        .to('.sec0-list04', { opacity: '1', duration: 1 })
        .to('.sec0-list05', { opacity: '1', duration: 1 })
        .to('.sec0-list05', { opacity: '1', duration: 5 });
    };

    /* >>>>>  set panel scroll & time line : body */
    const getSceneTimeLineBody = () => {
      //empty
    };

    /* >>>>>  set time line : bottom */
    const getSceneTimeLineBottom = () => {
      let txt2MaxW = 5000,
        txt2MaxH = 5000,
        txt1H = 140;

      if ($('#pc').length) {
        (txt1H = 140), (txt2MaxW = 0), (txt2MaxH = 5000);
      } else if ($('#mobile').length) {
        (txt1H = 85), (txt2MaxW = 5000), (txt2MaxH = 0);
      }
      const tl = gsap.timeline({
        markers: markerConf.timeline,
        onUpdate: (e) => {
          // onUpdate
        },
        onStart: () => {
          console.log('@@@ onStart', tl);
        },
        onComplete: () => {
          console.log('@@@ onComplete', tl);
        },
      });
      return tl
        .to('.gsap3', { opacity: 1, y: 0, duration: 0.3 })
        .to('.gsap3-2', {
          maxWidth: txt2MaxW,
          maxHeight: txt2MaxH,
          duration: 0.6,
        })
        .to('.gsap3-1', { height: txt1H, duration: 0.2 })
        .to('.gsap3-1', { opacity: 0, duration: 0.2 })
        .to('.gsap3-3', { opacity: 1, duration: 0.2 })
        .to('.gsap3', { zIndex: 1, delay: 0.1 });
    };

    const getSceneTimeline = (sectionId) => {
      //console.log('** getSceneTimeline', sectionId);
      switch (sectionId) {
        case 'header':
          return getSceneTimeLineHeader();
        case 'body':
          return getSceneTimeLineBody();
        case 'bottom':
          return getSceneTimeLineBottom();
      }
      return null;
    };
    const setSceneScrollEvent = (section, sectionId, tl) => {
      ScrollTrigger.create({
        markers: markerConf.scroll,
        trigger: section,
        start: 'top top',
        //end: 'bottom bottom',
        /*
        end: (self) => {
          const scrub = self.vars.scrub;
          let resEnd = 0;
          if (!scrub) {
            // 자동 애니메이션일 경우
            // TODO : 애니메이션이 끝나면 다음 장면으로 넘어가도록 스크립트 추가 필요
            resEnd = `+=${self.end * 2000}`;
          } else {
            // 스크롤 애니메이션일 경우
            // TODO : 속도는 배율로 조정하세요
            resEnd = `+=${Number(section.offsetHeight)}`;
            /*
            resEnd = `+=${
              section.offsetHeight * 7 / *
              (sectionId === 'body' ? panelList.length : 1)* /
            }`;
            * /
          }
          return resEnd;
        },
      */
        scrub: true, // 스크롤로 애니메이션을 제어
        pin: true,
        pinSpacing: true,
        animation: tl,
        onEnter: (self) => {
          // TODO 자동 애니메이션일 경우 주석 해제
          //console.log('### onEnter');
          //tl.play();
        },
        onEnterBack: (self) => {
          // TODO 자동 애니메이션일 경우 아래중 택일 주석 해제
          //console.log('### onEnterBack');
          // 아래에서 위로 진입시 역방향 재생을 원할 경우
          //tl.reverse();
          // 아래에서 위로 진입시 정방향 재생을 원할 경우
          //tl.restart(true, false);
        },
      });
    };
    const getPanelTimeline = ($panels) => {
      const $panelCon = $panels.querySelector('.panel-con'),
        $panelBg = $panels.querySelector('.panel-bg'),
        $tag = $panels.querySelector('.con_tag'),
        $tit1 = $panels.querySelector('.con_tit01'),
        $tit2 = $panels.querySelector('.con_tit02'),
        $txt = $panels.querySelector('.con_txt'),
        $conList = $panels.querySelector('.con_list'),
        $conListBox = $panels.querySelectorAll('.con_list li'),
        $page = $panels.querySelector('.swiper-pagination'),
        $nav = document.querySelector('.anchor-nav'),
        dataColor = $panels.getAttribute('data-color'),
        dataBg = $panels.getAttribute('data-bg');

      let panelPadding = '120px 200px';
      if ($(window).width() <= 768) {
        panelPadding = '80px 20px';
      } else if ($(window).width() <= 1500 && $(window).width() > 768) {
        panelPadding = '120px 100px';
      } else {
        panelPadding = '120px 200px';
      }

      const tl = gsap.timeline({
        markers: markerConf.timelinePanel,
      });
      tl.from($panels, { height: '100vh' })
        .from($panelCon, {
          width: 'calc(100% - 34px)',
          height: '688px',
          borderRadius: '20px',
          top: '140px',
        })
        // card 1 숨김
        .to($panels, {
          width: '100vw',
          height: '100vh',
          top: 0,
          // background: dataColor,
          borderRadius: 0,
          duration: 3,
        })
        .to($nav, { opacity: 1, duration: 0.2,},'<')
        .to($tit1, { opacity: 0, duration: 1 })
        .to($txt, { opacity: 0, duration: 1 })
        .to($panelCon, { background: 'none', duration: 1 })
        .to($tit1, { display: 'none', duration: 2 })
        .to($txt, { display: 'none', duration: 2 })
        .to($panelBg, { width: '100%', height: '100%', /* padding: '0', */ duration: 2, delay: 1, },'<')
        .to($panelBg, {background: dataColor, duration: 0, },'<')
        .to($panelCon, { width: '100%', height: '100%', borderRadius: '0', bottom: 0, padding: panelPadding, duration: 2, delay: 1, },'+=5')
        .to($panelCon, {top: 0, duration: 0, },'<')
        // card 1 노출
        .to($tag, { display: 'inline-flex', duration: 1 })
        .to($tit2, { display: 'flex', duration: 0 })
        .to($conList, { display: 'block', opacity: 1 })
        .to($tag, { opacity: 1, duration: 0.3 })
        .to($tit2, { opacity: 1, duration: 0.3 })
        .to($conListBox, { opacity: 1, stagger: 0.5 })
        .to($page, { opacity: 1 });
      return tl;
    };
    const setPanelScrollEvent = (panel, panelId, tl) => {
      /* 탭 & 배경 컬러 셋팅 */
      const setActivePanel = (panel) => {
        if (panel !== currentPanel) {
          const activeId = panel.getAttribute('id');
          const anchor = document.querySelector(`.anchor[href="#${activeId}"]`);
          const currentAnchor = document.querySelector('.anchor.active');
          if (currentPanel) {
            gsap.timeline().to(currentPanel, { autoAlpha: 0, duration: 0.2 });
          }
          gsap.timeline().to(panel, {
            autoAlpha: 1,
            duration: 0.2,
          });
          if (anchor) {
            if (currentAnchor) {
              currentAnchor.classList.remove('active');
              anchor.classList.add('active');
            }
            currentPanel = panel;
          }
        }
      };
      ScrollTrigger.create({
        markers: markerConf.scrollPanel,
        trigger: panel,
        start: 'top top',
        //end: 'bottom bottom',
        /*
        end: (self) => {
          const scrub = self.vars.scrub;
          let resEnd = 0;
          if (!scrub) {
            // 자동 애니메이션일 경우
            // TODO : 애니메이션이 끝나면 다음 장면으로 넘어가도록 스크립트 추가 필요
            resEnd = `+=${tl._time * 2000}`;
          } else {
            // 스크롤 애니메이션일 경우
            // TODO : 속도는 배율로 조정하세요
            resEnd = `+=${Number(panel.offsetHeight)}`;
          }
          console.log('::::: end', panelId, panel.offsetHeight, resEnd);
          return resEnd;
        },
        */
        scrub: true, // 스크롤로 애니메이션을 제어
        pin: true,
        pinSpacing: true,
        animation: tl,
        onToggle: (self) => {
          console.log(panelId, self.isActive);
          self.isActive && setActivePanel(panel);
        },
        onEnter: (self) => {
          // TODO 자동 애니메이션일 경우 주석 해제
          //console.log('### onEnter');
          //tl.play();
        },
        onEnterBack: (self) => {
          // TODO 자동 애니메이션일 경우 아래중 택일 주석 해제
          //console.log('### onEnterBack');
          // 아래에서 위로 진입시 역방향 재생을 원할 경우
          //tl.reverse();
          // 아래에서 위로 진입시 정방향 재생을 원할 경우
          //tl.restart(true, false);
        },
      });
    };

    /* >>>>>  set  scroll event : gsap-motion-scene */
    scrollList.forEach((scrollObj, i) => {
      let id = scrollObj.getAttribute('gsap-motion-scene');
      let scrollType;
      if (id) {
        scrollType = 'section';
        console.log('::::: init', 'scrollList', scrollType, id);
        setSceneScrollEvent(scrollObj, id, getSceneTimeline(id));
      } else {
        scrollType = 'panel';
        id = scrollObj.getAttribute('gsap-motion-panel');
        console.log('::::: init', 'scrollList', scrollType, id);
        setPanelScrollEvent(scrollObj, id, getPanelTimeline(scrollObj));
      }
      return;
    });

    /* >>>>>  set  tabl button event : gsap-motion-scene */
    /*
    function onSlideChangeEnd() {
      isAnimating = false;
    }
    function goToSlide($slide) {
      if (!isAnimating && $slide.length) {
        isAnimating = true;
        $currentSlide = $slide;
        const posY = pageHeight * ($currentSlide.index() + 1);
        console.log(pageHeight, $currentSlide.index() + 1);
        TweenLite.to(window, 1, {
          scrollTo: { y: pageHeight * ($currentSlide.index() + 1) },
          onComplete: onSlideChangeEnd,
          onCompleteScope: this,
        });

        //Animating menu items
        TweenLite.to($navButtons.filter('.active'), 0.5, {
          className: 'anchor anchor02 ',
        });

        TweenLite.to(
          $navButtons.filter('[href=#' + $currentSlide.attr('id') + ']'),
          0.5,
          { className: 'anchor anchor02 active' }
        );
      }
    }
    function onNavButtonClick(event) {
      //The clicked button
      var $button = $(this);

      //The slide the button points to
      var $slide = $($button.attr('href'));
      console.log($slide);

      //If the slide exists, we go to it
      if ($slide.length) {
        goToSlide($slide);
        event.preventDefault();
      }
    }
    $navButtons.on('click', onNavButtonClick);
    */
  },
  privMSwiper: () => {
    var $sections = document.querySelectorAll('.privilege .section');
    $sections.forEach((item, index) => {
      let privSlider = new Swiper(item.querySelector('.con_list'), {
        slidesPerView: 3,
        grid: {
          rows: 2,
          fill: 'row',
        },
        slidesPerGroup: 3,
        observer: true,
        spaceBetween: 20,
        speed: 1000,
        allowTouchMove: true,
        pagination: {
          el: item.querySelector('.swiper-pagination'),
          clickable: true,
        },
      });
    });
  },
};
