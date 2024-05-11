var privEvent = {
  init: function () {
    this.scrollMotion();

    if ($(window).width() <= 768) {
      this.privMSwiper();
    }
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

  scrollMotion: () => {
    // 1400px 이하 가로스크롤 이동 시 헤더 위치 변경(fixed 속성 대안)
    $(window).on('scroll', function () {
      $(
        '.privilege .section00, .privilege .section, .privilege .section06'
      ).css('left', 0 - $(this).scrollLeft());
    });

    var tl1 = gsap.timeline({
      scrollTrigger: {
        // markers: true,
        trigger: '.section00',
        pin: '.section00',
        pinSpacing: true,
        scrub: true,
        start: 'top top',
        end: '+=100%',
        // end: () => `+=${document.querySelector('.section00').offsetHeight}`,
        onUpdate: function (scrollTrigger) {
          var progress = scrollTrigger.progress;

          // 스크롤 진행률이 특정 값 이상인 경우 클래스 토글
          if (progress > 0.4) {
            $('.sec0-list').addClass('open');
          } else {
            $('.sec0-list').removeClass('open');
          }
        },
      },
    });

    tl1
      .to('.sec0-tit01', { y: -40, duration: 3 })
      .to('.sec0-tit02', { y: -10, opacity: '1', duration: 3 })
      .to('.sec0-tit01, .sec0-tit02', {
        transform: 'scale(0.8)',
        /* fontSize: '60px', */ duration: 2,
      })
      .to('.sec0-list01', { opacity: '1', duration: 2 }, 16)
      .to('.sec0-list02', { opacity: '1', duration: 2 })
      .to('.sec0-list03', { opacity: '1', duration: 2 })
      .to('.sec0-list04', { opacity: '1', duration: 2 })
      .to('.sec0-list05', { opacity: '1', duration: 12 });

    var $sections = document.querySelectorAll('.section');
    $sections.forEach((item, index) => {
      tl2 = gsap.timeline({
        scrollTrigger: {
          // markers: true,
          trigger: item,
          // pin: true,
          pinSpacing: false,
          scrub: 3,
          start: 'top bottom',
          end: '20% 100%',
          ease: 'none',
        },
      });

      tl2_1 = gsap.timeline({
        scrollTrigger: {
          // markers: {
          // startColor: "blue",
          // endColor: "yellow"
          // },
          trigger: item,
          pin: true,
          pinSpacing: false,
          scrub: 1,
          start: 'top 100%',
          end: 'bottom 70%',
          ease: 'none',
        },
      });

      var $panels = item.querySelectorAll('.panel'),
        $panelCon = item.querySelector('.panel-con'),
        $anchors = item.querySelector('.anchor-nav'),
        $tag = item.querySelector('.con_tag'),
        $tit1 = item.querySelector('.con_tit01'),
        $tit2 = item.querySelector('.con_tit02'),
        $txt = item.querySelector('.con_txt'),
        $conList = item.querySelector('.con_list'),
        $conListBox = item.querySelectorAll('.con_list li'),
        $page = item.querySelector('.swiper-pagination'),
        $nav = item.querySelector('.anchor-nav'),
        dataColor = item.getAttribute('data-color'),
        panelPadding = '120px 200px';

      if ($(window).width() <= 768) {
        panelPadding = '80px 20px';
      } else if ($(window).width() <= 1500 && $(window).width() > 768) {
        panelPadding = '120px 100px';
      } else {
        panelPadding = '120px 200px';
      }

      tl2
        .to($sections[index], { yPercent: -100, duration: 0.4 }, 0)
        .to($panels, { y: 0, duration: 0.6, delay: 0.2 }, 0);

      tl2_1
        .to($tit1, { opacity: 0, duration: 0.2, delay: 1 }, 4)
        .to($txt, { opacity: 0, duration: 0.2, delay: 1 }, 4)
        .to($tit1, { display: 'none', duration: 0, delay: 1 }, 4)
        .to($txt, { display: 'none', duration: 0, delay: 1 }, 4)
        .to($panelCon, { zIndex: 1 }, 4)
        .to($panelCon, { background: dataColor, duration: 0 }, 5)
        .to($panelCon, { height: '100%', duration: 1 }, 6)
        .to($panels, { width: '100%', height: '100%', duration: 1 }, 6)
        .to($sections[index], { padding: '0', duration: 1 }, 6)
        .to(
          $panelCon,
          {
            width: '100%',
            height: '100%',
            borderRadius: '0',
            bottom: 0,
            padding: panelPadding,
            duration: 1.2,
          },
          6
        )
        .to($nav, { opacity: 0, duration: 0 }, 6)

        .to($tag, { display: 'inline-flex', duration: 0 }, 7)
        .to($tit2, { display: 'flex', duration: 0 }, 7)
        .to($conList, { display: 'block', opacity: 1 }, 7)
        .to($tag, { opacity: 1, duration: 0.2 }, 8)
        .to($tit2, { opacity: 1, duration: 0.2, delay: 0.3 }, 8)
        .to($conListBox, { opacity: 1, stagger: 0.2, delay: 0.6 }, 8)
        .to($panelCon, { backgroundColor: dataColor, duration: 5 }, 8)
        .to($page, { opacity: 1 }, 10)
        .to($panelCon, { backgroundColor: dataColor, duration: 5 }, 12);
    });

    gsap.registerPlugin(ScrollToPlugin);

    /* Main navigation */
    document.querySelectorAll('.anchor').forEach((anchor, index) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        let navIndex = (index + 1) % 5;
        if (navIndex == 0) {
          navIndex = 5;
        }

        gsap.to(window, {
          scrollTo: {
            y: (navIndex + 1) * window.innerHeight - window.innerHeight * 0.8,
          },
          duration: 1,
          ease: 'none',
        });
      });
    });

    let maxW = 5000,
      maxH = 5000;

    if ($('#pc').length) {
      (gsap3_1 = 140), (maxW = 0);
      maxH = 5000;
    } else if ($('#mobile').length) {
      (gsap3_1 = 85), (maxW = 5000);
      maxH = 0;
    }

    var tlWeve = gsap.timeline({
      scrollTrigger: {
        // markers: true,
        trigger: '.section06',
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    });
    tlWeve
      .to('.gsap3', { opacity: 1, y: 0, duration: 0.3 })
      .to('.gsap3-2', { maxWidth: maxW, maxHeight: maxH, duration: 0.6 })
      .to('.gsap3-1', { height: gsap3_1, duration: 0.2 })
      .to('.gsap3-1', { opacity: 0, duration: 0.2 })
      .to('.gsap3-3', { opacity: 1, duration: 0.2 })

      .to('.gsap3', { zIndex: 1, delay: 0.1 });
  },
};
