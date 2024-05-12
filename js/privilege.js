/*
https://agal.tistory.com/m/210

- 참고 소스
https://codepen.io/BrianCross/pen/PoWapLP
https://codepen.io/GreenSock/pen/ExEOeJQ
https://codepen.io/cassie-codes/pen/vYWvwXV

http://everylastdrop.co.uk/
https://lpla.tistory.com/107
*/
var privEvent = {
  init: function () {
    this.setScrollMotion();

    if ($(window).width() <= 768) {
      this.privMSwiper();
    }
  },
  setScrollMotion: () => {
    let sectionList = gsap.utils.toArray('[gsap-motion-scene]');
    const markerConf = {
      timeline: {
        startColor: 'black',
        endColor: 'black',
        fontWeight: 'bold',
        indent: 200,
      },
      scroll: {
        startColor: 'red',
        endColor: 'red',
        fontWeight: 'bold',
        indent: 0,
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
          console.log('@@@ onStart', tl);
        },
        onComplete: () => {
          console.log('@@@ onComplete', tl);
        },
      });
      return tl
        .to('.sec0-tit01', { y: -40, duration: 1.5 })
        .to('.sec0-tit02', { y: -10, opacity: '1', duration: 1.5 })
        .to('.sec0-tit01, .sec0-tit02', {
          transform: 'scale(0.8)',
          duration: 1,
        })
        .to('.sec0-list01', { opacity: '1', duration: 1 }, 8)
        .to('.sec0-list02', { opacity: '1', duration: 1 })
        .to('.sec0-list03', { opacity: '1', duration: 1 })
        .to('.sec0-list04', { opacity: '1', duration: 1 })
        .to('.sec0-list05', { opacity: '1', duration: 1 });
    };

    const getSceneTimeLineBody = () => {
      var // $panels = sections[i],
        $panels = document.querySelector('.panel.active'),
        $panelCon = $panels.querySelector('.panel-con'),
        $anchors = $panels.querySelector('.anchor-nav'),
        $tag = $panels.querySelector('.con_tag'),
        $tit1 = $panels.querySelector('.con_tit01'),
        $tit2 = $panels.querySelector('.con_tit02'),
        $txt = $panels.querySelector('.con_txt'),
        $conList = $panels.querySelector('.con_list'),
        $conListBox = $panels.querySelectorAll('.con_list li'),
        $page = $panels.querySelector('.swiper-pagination'),
        $nav = document.querySelector('.anchor-nav'),
        dataColor = $panels.getAttribute('data-color'),
        dataBg = $panels.getAttribute('data-bg'),
        panelPadding = '120px 200px';
      if ($(window).width() <= 768) {
        panelPadding = '80px 20px';
      } else if ($(window).width() <= 1500 && $(window).width() > 768) {
        panelPadding = '120px 100px';
      } else {
        panelPadding = '120px 200px';
      }
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
          console.log('@@@ onStart', tl);
        },
        onComplete: () => {
          console.log('@@@ onComplete', tl);
        },
      });
      return tl.from($panels, { height: '851px' }).from($panelCon, {
        width: 'calc(100% - 34px)',
        height: '688px',
        borderRadius: '20px',
      });

      tl2_1
        .to('.panel_wrap', { backgroundColor: dataBg }, '<')
        .to($tit1, { opacity: 0, duration: 0.3, delay: 1 }, '<')
        .to($txt, { opacity: 0, duration: 0.3, delay: 1 }, '<')
        .to($tit1, { display: 'none', duration: 0, delay: 1 }, '<')
        .to($txt, { display: 'none', duration: 0, delay: 1 }, '<')
        .to($panelCon, { background: dataColor, duration: 0 }, '<')
        .to(
          $panelCon,
          {
            width: '100%',
            height: '100%',
            borderRadius: '0',
            bottom: 0,
            padding: panelPadding,
            duration: 2,
            delay: 1,
          },
          '+=5'
        )
        .to(
          $panels,
          {
            width: '100%',
            height: '100%',
            /* padding: '0', */ duration: 2,
            delay: 1,
          },
          '<'
        )
        // .to($nav, { opacity: 0, duration: 0,},'<')

        .to($tag, { display: 'inline-flex', duration: 0 }, '+=5')
        .to($tit2, { display: 'flex', duration: 0 }, '<')
        .to($conList, { display: 'block', opacity: 1 }, '<')
        .to($tag, { opacity: 1, duration: 0.3 }, '+=5')
        .to($tit2, { opacity: 1, duration: 0.3 }, '+=0.5')
        .to($conListBox, { opacity: 1, stagger: 0.5 }, '+=10')
        .to($panelCon, { backgroundColor: dataColor, duration: 5 }, '<')
        .to($page, { opacity: 1 }, '+=5')
        .to($panelCon, { backgroundColor: dataColor, duration: 5 }, '+=5')
        .reverse();
    };

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

    const getTimeline = (sectionId) => {
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

    /* >>>>>  set  scroll event : gsap-motion-scene */
    gsap.registerPlugin(ScrollTrigger);
    sectionList.forEach((section, i) => {
      const sectionId = section.getAttribute('gsap-motion-scene');
      const tl = getTimeline(sectionId);
      console.log('!!! init', sectionId, tl);
      ScrollTrigger.create({
        markers: markerConf.scroll,
        trigger: section,
        //        start: 'top top',
        end: (self) => {
          const scrub = self.vars.scrub;
          if (!scrub) {
            // 자동 애니메이션일 경우
            // TODO : 애니메이션이 끝나면 다음 장면으로 넘어가도록 스크립트 추가 필요
            return `+=${tlSceneHeader._end * 2000}`;
          } else {
            // 스크롤 애니메이션일 경우
            // TODO : 속도는 배율로 조정하세요
            return `+=${section.offsetHeight * 5}`;
          }
        },
        scrub: true, // 스크롤로 애니메이션을 제어
        pin: true,
        pinSpacing: true,
        animation: tl,
        onToggle: (self) => console.log('toggled, isActive:', self.isActive),
        onUpdate: (self) => {
          console.log(
            'progress:',
            self.progress.toFixed(3),
            'direction:',
            self.direction,
            'velocity',
            self.getVelocity()
          );
        },
        onEnter: (self) => {
          console.log('### onEnter');
          //tl.play();
        },
        onEnterBack: (self) => {
          console.log('### onEnterBack');
          // 아래에서 위로 진입시 역방향 재생을 원할 경우
          //tl.reverse();
          // 아래에서 위로 진입시 정방향 재생을 원할 경우
          //tl.restart(true, false);
        },
      });
    });
  },
  setTest: () => {},
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
