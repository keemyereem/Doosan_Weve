
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
	var popthis = $(".popup."+popConts);
    $('body').addClass('blockScroll');
	popthis.fadeIn(300);

	popthis.find(".pop_close").click(function(){
        $('body').removeClass('blockScroll');
		popthis.fadeOut(300);
	});
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **공통**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var commonEvent = {
	init:function(){
        this.headerEvent();
        this.subUI();
        this.iptEvent();
        this.tabEvent();
        this.popup();
	}, 

    headerEvent: () => {
        if ($('#mobile').length) {
            // 모바일 메뉴

        } else {
            // PC 메뉴
            $("#gnb ul, #siteMap").hover(function(){
                $("body").addClass("menuOn");
            }, function(){
                $("body").removeClass("menuOn");
            });
        }
        
    },

    subUI: () => {
        if ($('nav').length) {
            const subMenu = document.querySelector("nav"),
                  fixMenu = subMenu.offsetTop,
                  navHeight = Math.abs($('nav').height()),
                  awardMarginTop = Math.abs($('.contents').css('margin-top').replace('px', ''));

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

            // nav바 스크롤 고정시 contents박스 높이값 조절 및 뒤틀림 방지
            $(window).on('load resize scroll', ()=> {
                if ($('nav').hasClass('fixed')) {
                    $('.contents').css('margin-top', '' + (awardMarginTop + navHeight) + 'px');
                } else {
                    $('.contents').css('margin-top', '' + (awardMarginTop) + 'px');
                }
            });
        }
    },

    iptEvent: () => {
        //selectbox
        var selectType = $(".select_row>select");
        selectType.addClass("selectBox");
        selectChange(selectType);
        function selectChange(type) {
            type.change(function () {
                var select_name = $(this).children("option:selected").text();
                $(this).siblings("label").text(select_name);

            });
        };
    
        //file
        var fileTarget = $('#upload_file');
        fileTarget.on('change', function(){
            var cur =$ (".file_row input[type='file']").val();
            $(".upload_name").val(cur);
        });
    
    },
    
    tabEvent: () => {
        if($(window).width() < 768){
            const tabContainer = $('.tab_box > .inner')
            const tabBox = tabContainer.find('> .tab_slide');
            const tabButton = tabBox.find('> li');
            let size = tabButton.length;
            let tbIndex = 0;
        
            if (tabBox.length) {
              $(document).ready(function(){
                let tbOn = Math.floor(tabBox.find('> li.on').position().left);
                let tbWidth = tabButton.width();
        
                tabContainer.animate({scrollLeft: tbOn - tbWidth}, 1000);
              });
        
              tabContainer.on('load resize scroll', ()=> {
                  tabBoxPosition = Math.abs(tabBox.position().left);
        
                  tabButton.each((index)=> {
                    tabButtonPosition = Math.floor(tabButton.eq(index).position().left);
        
                    if (size !== index + 1) {
                      nextIndexPosition = Math.floor(tabButton.eq(index).next().position().left);
        
                      if (tabBoxPosition > tabButtonPosition && tabBoxPosition <= nextIndexPosition) {
                        tbIndex = index;
                      }
                    }
        
                  });
        
              });
        
              $('.control').on('click', function() {
                if ($(this).hasClass('prev')) {
                    tsMove = Math.floor(tabButton.eq(tbIndex).position().left);
        
                    tabContainer.animate({scrollLeft: tsMove}, 200)
                } else {
                    tsmoveTrigger = Math.abs(tabBox.position().left);
                    
                    if (Math.ceil(tsmoveTrigger) == Math.floor(tabButton.eq(tbIndex).next().position().left)) {
                        tbIndex = tbIndex + 1;
                    } else {
                        tbIndex = tbIndex;
                    }
        
                    tsMove = Math.floor(tabButton.eq(tbIndex).next().position().left);
                    tabContainer.animate({scrollLeft: tsMove}, 200);
                }
              })
            }
        }
      },

      popup: ()=> {
        const list = $('.list').find('> ul > li'),
              popupUI = $('.popup > ul > li:last-child'),
              popupClose = $('.popup > ul > li:first-child'),
              body = document.querySelector('body');
        
        let scrollPosition = 0;
        $(window).on('scroll', ()=> {
            scrollPosition = window.pageYOffset;
        });

        list.each((index) => {
            list.eq(index).children('a').on('click', ()=> {
                let data = list.eq(index).children('p').attr('data-process'),
                    title = list.eq(index).find('dl dt').text();
                    locate = list.eq(index).find('dl dd:first-of-type').text();
                    
                locate = locate.replace('위치', '');
                
                popupUI.find('dl dt').text(title);
                popupUI.find('dl dd').text(locate);

                if (data >= 0 && data <= 2) {
                    return;
                } else {
                    $('.popup').addClass('on');
                    
                    if ($('#mobile').length) {
                        body.style.top = `-${scrollPosition}px`;
                        $('body').addClass('blockScroll_m');
                    } else {
                        $('body').addClass('blockScroll_pc');
                    }
                    
                }
                
            });
        });

        popupUI.children('a').hover(function() {
            $(this).find('img:first-child').removeClass('on');
            $(this).find('img:last-child').addClass('on');
            
        }, function() {
            $(this).find('img:last-child').removeClass('on');
            $(this).find('img:first-child').addClass('on');
        });

        popupClose.on('click', ()=> {
            closeProcessor();
        });

        function closeProcessor() {
            $('.popup').removeClass('on');
            if($('.gallery_swiper').length){
                channelEvent.gallerySwiper();
            }

            if ($('#mobile').length) { 
                $('body').removeClass('blockScroll_m');
                scrollPosition = body.style.top;
                scrollPosition = scrollPosition.replace('px', '');
    
                body.style.removeProperty('top');
                window.scrollTo(0, -(scrollPosition));
            } else {
                $('body').removeClass('blockScroll_pc');
            }
        }
    },
}

var channelEvent = {
    init: function(){
        this.gallerySwiper();
        this.adVideo();
        this.awardScroll();
    },
    
    gallerySwiper : () => {
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
                el: '.gallery_swiper .swiper-pagination',
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    return ('0' + number).slice(-2);
                },
                formatFractionTotal: function (number) {
                    return ('0' + number).slice(-2);
                },
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' +
                           ' / ' +
                           '<span class="' + totalClass + '"></span>';
                }
            },
        });
    },

    adVideo : () => {
        $(".ad .youtube a").click(function() {
            $(".ad .video_modal_popup .video-wrapper").remove(),
            $(".ad .big_video img").hide(),
            $(".ad .video_modal_popup").append("<div class='video-wrapper'><iframe max-width='900' width='100%' height='506' src='https://youtube.com/embed/" + $(this).data("video") + "?rel=0&playsinline=1&autoplay=1$mute=1' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>")
        });
    },

    awardScroll: () => {
        // 연혁 인터랙션
        $(document).ready(function () {
            var section = $('._historySection');
            var sectionOn = $('._historySection.on');
            let sectionLength = section.length;
            
            // 연도와 내용 높이값 맞추기
            section.find('.desc-info').each(function (idx) {
                let sectionHeight = section.eq(idx).find('.desc-info').height();
                section.eq(idx).find('.year-info').css('height', sectionHeight / 10 + 'rem')
            })

            $(window).on('scroll resize', function (){
                var currentPosition = $(window).scrollTop();
                var scrollEnd = $(document).height() - $(window).height();

                for (var i = 0; i < sectionLength; i++) {
                     setHistoryScroll(section.eq(i));
                }


                // 연혁 연도 마지막 active일 때, 내용 마지막 active 또는 스크롤 맨 끝 도달 시
                if ($('.tab_contents.on .year-info').find('li:last-child').hasClass('active') || $(window).scrollTop() >= scrollEnd) {
                    $('.tab_contents.on .year-info').find('li:last-child').addClass('active');
                    $('.tab_contents.on .year-info').find('li:not(:last-child)').removeClass('active');
                    $('.tab_contents.on .desc-info').find('ul:last-child').addClass('active');
                    $('.tab_contents.on .desc-info').find('ul:not(:last-child)').removeClass('active');
                }
            })
        
            function setHistoryScroll($information) {
                var sectionOffset = $information.find('.desc-info ul').eq(0).offset().top;
                var size = $information.find('.year-info li').length;
                let gap = 20; 
                let gapYear = 120;
                let currentPosition = $(window).scrollTop() + 175;
                let getFixedMargin = 180;
                let lastUl = $information.find('.desc-info ul').last(); // 연혁 마지막 내용 위치값
                let lastBottom = lastUl.offset().top + lastUl.height(); // 연혁 마지막 내용 끝 지점

                $information.find('.year-info li').each(function (index) {
                    // 반응형 변수값 교체
                    if ($(window).width() < 768) {
                        gap = 150;
                        gapYear = 100;
                        currentPosition = $(window).scrollTop() + 50;
                        getFixedMargin = 50; 
                    }

                    if (currentPosition < sectionOffset) {
                        //섹션 이전 화면에서는 absolute상태
                        $information.find('.year-info').css({'top' : 'auto', 'position' : 'absolute', 'margin-top': '0'});
                        $information.find('.year-info ul').css({'position': 'relative', 'margin-top': '0'});

                        // 반응형 태블릿 연도 좌우 고정풀기
                        if($(window).width()<=1400 && $(window).width()>767){
                            $(window).scroll(function(){
                                $(".year-info").css("left",0 - $(this).scrollLeft());
                            });
                            
                        }else{
                            $(window).scroll(function(){
                                $(".year-info").css("left","initial");
                            });
                        };
                        
                    } else if ($information.hasClass('on') && currentPosition > lastBottom && $(window).height() < 851) {
                        // 연혁 내용 마지막 위치값 이상 넘어갈 경우 연도 고정
                        $information.find('.year-info').css({'top' : 'auto', 'bottom': '0', 'position' : 'absolute', 'margin-top': '0'});
                        $information.find('.year-info ul').css({'position': 'absolute', 'bottom': '50px'});
                        $('.tab_contents .year-info').find('li:last-child').addClass('active');
                        // $('.tab_contents .year-info').find('li:not(:last-child)').removeClass('active');

                    } else {
                        //섹션 안으로 들어오면 fixed 상태
                        if (size !== index + 1) {
                            if (currentPosition > $information.find('.desc-info ul').eq(index).offset().top - gap && currentPosition < $information.find('.desc-info ul').eq(index + 1).offset().top - gap) {
                                $information.find('.year-info').css({'top': '0px', 'bottom': 'auto', 'position': 'fixed', 'margin-top': '' + getFixedMargin + 'px'});
                                $information.find('.year-info ul').css({'margin-top': '-' + (gapYear * index) + 'px', 'position': 'relative', 'bottom': 'unset'});
                                $information.find('.year-info li').eq(index).addClass('active').siblings().removeClass('active');
                                $information.find('.desc-info ul').eq(index).addClass('active').siblings().removeClass('active');
                            }
                            
                        } else {
                            if (currentPosition > $information.find('.desc-info ul').eq(index).offset().top - gap) {
                                // 연혁 내용 마지막 위치값 안으로 진입할 경우 연도 fixed
                                if (currentPosition < lastBottom) {
                                    $information.find('.year-info').css({'top': '0', 'bottom': 'auto', 'position': 'fixed', 'margin-top': '' + getFixedMargin + 'px'});
                                    $information.find('.year-info ul').css({'margin-top': '-' + (gapYear * index) + 'px', 'position': 'relative', 'bottom': 'unset'});
                                }
                                $information.find('.desc-info ul').eq(index).addClass('active').siblings().removeClass('active');
                                $information.find('.year-info li').eq(index).addClass('active').siblings().removeClass('active');
                            }
                        }
                    }

                })
            }
        })
    },
}

var estateEvent = {
	init: function(){
        this.historySlider();
        this.estList();
	}, 

    historySlider: () => {
        const board = $('.estBoard').children('li'),
              estAlert01 = board.find('.block_2depth li:first-child'),
              estButton = board.find('.block_2depth li:last-child a');

        var estSlider = new Swiper(".estSlider", {
            slidesPerView: 3,
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
                init: function() {
                    board.eq(this.activeIndex).addClass('active');
                },
                activeIndexChange: function() {
                    let idx = this.activeIndex;
                    board.not(':eq(' + idx + ')').removeClass('active');
                    board.eq(idx).addClass('active');
                }
            }
        });

        estAlert01.each((index) => {
            let data = estAlert01.eq(index).attr('data-process');

            if (data == 0) {
                estAlert01.eq(index).css({'background': '#005eb8'}).text('분양중');
            } else if (data == 1) {
                estAlert01.eq(index).css({'background': '#888888'}).text('분양완료');
            } else if (data == 2) {
                estAlert01.eq(index).css({'background': '#fff', 'border': '1px solid #005eb8', 'color': '#005eb8'}).text('분양예정');
            }
        })

        estButton.hover(function() {
            $(this).find('img:first-child').removeClass('on');
            $(this).find('img:last-child').addClass('on');
            
        }, function() {
            $(this).find('img:last-child').removeClass('on');
            $(this).find('img:first-child').addClass('on');
        })
    },

    estList: ()=> {
        const estlist = $('.estList').find('> ul > li'),
              estAlert02 = estlist.children('p'),
              estSearchBar = $('.estSearch').children('ul'),
              personalColor = ['#005eb8', '#888888', '#f5f5f5', '#005eb8'],
              icon = ['list_homepage_icon.png', 'list_homepage_icon_hover.png', 'list_map_icon.png', 'list_map_icon_hover.png'];
              
        estAlert02.each((index) => {
            data = estAlert02.eq(index).attr('data-process');
            let dataButton =  estAlert02.eq(index).siblings('a');
            
            // set process
            if (data == 0) {
                estAlert02.eq(index).css({'background': + '' + personalColor[0] + '', 'color': '#fff'}).text('분양중');
            } else if (data == 1) {
                estAlert02.eq(index).css({'border': '1px solid ' + personalColor[1] + '', 'color': personalColor[1]}).text('분양완료');
            } else if (data == 2) {
                estAlert02.eq(index).css({'background': '#fff', 'border': '1px solid ' + personalColor[0] + '', 'color': personalColor[0]}).text('분양예정');
            } else if (data == 3) {
                estAlert02.eq(index).css({'background': + '' + personalColor[1] + '', 'color': '#fff'}).text('공사중');
            } else if (data == 4) {
                estAlert02.eq(index).css({'background': + '' + personalColor[0] + '', 'color': '#fff'}).text('입주중');
            } else if (data == 5) {
                estAlert02.eq(index).css({'background': '#fff', 'border': '1px solid ' + personalColor[0] + '', 'color': personalColor[0]}).text('입주예정');
            }

            // set icon
            if (data >= 0 && data <= 2) {
                dataButton.css({'background': personalColor[2] + ' url(../images/estate/' + icon[0] + ') 50% 50% no-repeat'});   
                mobileIconSize();
            } else {
                dataButton.css({'background': personalColor[2] + ' url(../images/estate/' + icon[2] + ') 50% 50% no-repeat'});
                mobileIconSize();
            }

            // mobile icon size adjustment
            function mobileIconSize() {
                if ($('#mobile').length) {
                    dataButton.css({'background-size': '40%'});
                }
            }
        });

        // option spread
        if($('#pc').length) {
            estSearchBar.find('> li p').click(() => {
                estSearchBar.toggleClass('active');
            })
        } else {
            if($('#mobile .mob_select').length){
                estSearchBar.find('.mob_select').click(() => {
                    estSearchBar.toggleClass('active');
    
                    if(estSearchBar.hasClass('active')){
                        $('.mob_select').text('상세검색 닫기')
                    }else {
                        $('.mob_select').text('상세검색 열기')
                    }
                });
            }else{
                estSearchBar.find('> li p').click(() => {
                    estSearchBar.toggleClass('active');
                })
            }
        }

        // option data getter
        $('.estSearch .block_2depth > li').on('click', function() {
            $(this).toggleClass('on');

            let data = $(this).attr('data-process');
            console.log('data control | ' + data);
        });

        // effect chenge icon when each list hovering
        estlist.each((index) => {
            estlist.eq(index).hover(function() {
                data = $(this).children('p').attr('data-process');
                dataButton = $(this).children('p').siblings('a');

                if (data >= 0 && data <= 2) {
                    dataButton.css({'background': personalColor[3] + ' url(../images/estate/' + icon[1] + ') 50% 50% no-repeat'});
                } else {
                    dataButton.css({'background': personalColor[3] + ' url(../images/estate/' + icon[3] + ') 50% 50% no-repeat'});
                }
                mobileIconSize();

            }, function() {
                if (data >= 0 && data <= 2) {
                    dataButton.css({'background': personalColor[2] + ' url(../images/estate/' + icon[0] + ') 50% 50% no-repeat'});
                } else {
                    dataButton.css({'background': personalColor[2] + ' url(../images/estate/' + icon[2] + ') 50% 50% no-repeat'});
                }
                mobileIconSize();
            });

            // mobile icon size adjustment
            function mobileIconSize() {
                if ($('#mobile').length) {
                    dataButton.css({'background-size': '40%'});
                }
            }
        })

        
        
    },

}

var csEvent = {
    init: function(){
        this.faqToggle();
        this.inqEmail();
    },
    
    faqToggle: function(){
        $(".que").click(function() {
            $(this).next(".ans").stop().slideToggle(300);
            $(this).toggleClass('on').siblings().removeClass('on');
            $(this).next(".ans").siblings(".ans").slideUp(300);
         });
    },

    inqEmail : function() {
        //selectbox
        var selectType = $(".select_row>select");
        selectType.addClass("selectBox");
        selectChange(selectType);
        function selectChange(type) {
            type.change(function () {
                var select_name = $(this).children("option:selected").text();
                $(this).siblings("label").text(select_name);

                if(select_name === '직접입력') {
                    $('.cs .inquiry .row .ipt_cell.email_cell > div:nth-of-type(2)').show();
                }else {
                    $('.cs .inquiry .row .ipt_cell.email_cell > div:nth-of-type(2)').hide();
                }
            });
        };



	},
}