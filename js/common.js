
/* --------------------- DoosanWeve Released 2022.08.24 --------------------- */
/* ----------------------- Published by 4m Creative ------------------------ */


$(function(){
    

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
        this.subUI();
        this.iptEvent();
        this.tabEvent();
	}, 

    subUI: () => {
        if ($('nav').length) {
            const subMenu = document.querySelector("nav");
            const fixMenu = subMenu.offsetTop;
    
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
    
            $('nav ul li').on('click', function(){
                $(this).siblings().removeClass('on');
                $(this).addClass('on');
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
}

var channelEvent = {
    init: function(){
        this.ytPopup();
        this.adVideo();
        this.awardScroll();
    },
    ytPopup : () => {
        $(".sns .youtube a").click(function() {
            $(".video_modal_popup").addClass("reveal"),
            $(".video_modal_popup .video-wrapper").remove(),
            $(".video_modal_popup").append("<div class='video-wrapper'><iframe width='560' height='315' src='https://youtube.com/embed/" + $(this).data("video") + "?rel=0&playsinline=1&autoplay=1$mute=1' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>")
        }),
        $(".video_modal_popup-closer").click(function() {
            $(".video_modal_popup .video-wrapper").remove(),
            $(".video_modal_popup").removeClass("reveal")
        });
    },

    adVideo : () => {
        $(".ad .youtube a").click(function() {
            $(".ad .video_modal_popup .video-wrapper").remove(),
            $(".ad .big_video img").hide(),
            $(".ad .video_modal_popup").append("<div class='video-wrapper'><iframe width='560' height='315' src='https://youtube.com/embed/" + $(this).data("video") + "?rel=0&playsinline=1&autoplay=1$mute=1' allow='autoplay; encrypted-media' allowfullscreen></iframe></div>")
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
                let getFixedMargin = 18;
                let lastUl = $information.find('.desc-info ul').last(); // 연혁 마지막 내용 위치값
                let lastBottom = lastUl.offset().top + lastUl.height(); // 연혁 마지막 내용 끝 지점

                $information.find('.year-info li').each(function (index) {
                    // 반응형 변수값 교체
                    if ($(window).width() < 768) {
                        gapYear = 50;
                        currentPosition = $(window).scrollTop() + 50;
                        getFixedMargin = 12; 
                    }

                    if (currentPosition < sectionOffset - gap) {
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
                                $information.find('.year-info').css({'top': '80px', 'bottom': 'auto', 'position': 'fixed', 'margin-top': '' + getFixedMargin + 'px'});
                                $information.find('.year-info ul').css({'margin-top': '-' + (gapYear * index) + 'px', 'position': 'relative', 'bottom': 'unset'});
                                $information.find('.year-info li').eq(index).addClass('active').siblings().removeClass('active');
                                $information.find('.desc-info ul').eq(index).addClass('active').siblings().removeClass('active');
                            }
                            
                        } else {
                            if (currentPosition > $information.find('.desc-info ul').eq(index).offset().top) {
                                // 연혁 내용 마지막 위치값 안으로 진입할 경우 연도 fixed
                                if (currentPosition < lastBottom) {
                                    $information.find('.year-info').css({'top': '80px', 'bottom': 'auto', 'position': 'fixed', 'margin-top': '' + getFixedMargin + 'px'});
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
        const board = $('.estBoard').children('li');
        const estAlert01 = board.find('.block_2depth li:first-child');
        const estButton = board.find('.block_2depth li:last-child a');

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
        const list = $('.estList').find('> ul > li');
        const estAlert02 = list.children('p');
        const estSearchBar = $('.estSearch').children('ul');

        estAlert02.each((index) => {
            data = estAlert02.eq(index).attr('data-process');
            let dataButton =  estAlert02.eq(index).siblings('a');

            if (data == 0) {
                estAlert02.eq(index).css({'background': '#005eb8', 'color': '#fff'}).text('분양중');
            } else if (data == 1) {
                estAlert02.eq(index).css({'border': '1px solid #888888', 'color': '#888888'}).text('분양완료');
            } else if (data == 2) {
                estAlert02.eq(index).css({'background': '#fff', 'border': '1px solid #005eb8', 'color': '#005eb8'}).text('분양예정');
            } else if (data == 3) {
                estAlert02.eq(index).css({'background': '#888888', 'color': '#fff'}).text('공사중');
            } else if (data == 4) {
                estAlert02.eq(index).css({'background': '#005eb8', 'color': '#fff'}).text('입주중');
            } else if (data == 5) {
                estAlert02.eq(index).css({'background': '#fff', 'border': '1px solid #005eb8', 'color': '#005eb8'}).text('입주예정');
            }

            if (data >= 0 && data <= 2) {
                dataButton.css({'background': '#f5f5f5 url(../images/estate/list_homepage_icon.png) 50% 50% no-repeat'});
            } else {
                dataButton.css({'background': '#f5f5f5 url(../images/estate/list_map_icon.png) 50% 50% no-repeat'});
            }

            list.hover(function() {
                if (data >= 0 && data <= 2) {
                    $(this).children('a').css({'background': '#005eb8 url(../images/estate/list_homepage_icon_hover.png) 50% 50% no-repeat'});
                } else {
                    $(this).children('a').css({'background': '#005eb8 url(../images/estate/list_map_icon_hover.png) 50% 50% no-repeat'});
                }
                
            }, function() {
                if (data >= 0 && data <= 2) {
                    $(this).children('a').css({'background': '#f5f5f5 url(../images/estate/list_homepage_icon.png) 50% 50% no-repeat'});
                } else {
                    $(this).children('a').css({'background': '#f5f5f5 url(../images/estate/list_map_icon.png) 50% 50% no-repeat'});
                }
            });
        });

        estSearchBar.find('> li p').click(() => {
            estSearchBar.toggleClass('active');
        })

        $('.estSearch .block_2depth > li').on('click', function() {
            $(this).toggleClass('on');

            let data = $(this).attr('data-process');
            console.log('data control | ' + data);
        });

        
        
    },
}

var csEvent = {
    init: function(){
        this.faqToggle();
    },
    
    faqToggle: function(){
        $(".que").click(function() {
            $(this).next(".ans").stop().slideToggle(300);
            $(this).toggleClass('on').siblings().removeClass('on');
            $(this).next(".ans").siblings(".ans").slideUp(300);
         });
    },
}