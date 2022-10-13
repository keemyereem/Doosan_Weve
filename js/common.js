
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


    // 팝업 데이터 가져오기 [ 미완성 코드 :: 팝업 내부 검색기능도 value값 인식하게 해야 함 ]
    getVal = ()=> {
        const body = document.querySelector('body');
        let name = document.getElementById('find_name'),
            count = $('.result_box').length;

        
        if (name != null) {
            $('.popup.search > ul > li').eq(1).find('p .result').text("‘" + name.value + "’");
            $('.popup.search > ul > li').eq(1).find('p .num').text(count);
        }
    };
});
 


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **공통**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var commonEvent = {
	init:function(){
        this.headerEvent();
        this.bgAni();
        this.subUI();
        this.iptEvent();
        this.tabEvent();
        this.popup();
        this.goTopEvent();
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

    bgAni: function() {
        $(document).ready(function() {
            setTimeout(function() {
                $('.section1').addClass('ani');
            }, 100)
        })

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
        
                tabContainer.animate({scrollLeft: tbOn - tbWidth}, 0);
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
        // 스크롤 값 추적
        let scrollPosition = 0;
        $(window).on('scroll', ()=> {
            scrollPosition = window.pageYOffset;
        });

        // 분양안내용 팝업코드
        const list = $('.list').find('> ul > li'),
              popupUI = $('.popup > ul > li:last-child'),
              popupClose = $('.pop_close'),
              body = document.querySelector('body');

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
                    openProcessor();
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

        //공통 팝업코드
        $('.openPopup').on('click', ()=> {
            openProcessor();
        });

        // 팝업 닫기
        popupClose.on('click', ()=> {
            closeProcessor();
        });

        // 팝업 열기 function
        function openProcessor() {
            scrollPosition = window.pageYOffset;

            $(".popup").addClass('on');
            $('html').addClass('blockScroll');

            if ($('#mobile').length) {
                body.style.top = `-${scrollPosition}px`;
                $('header').hide();
            }
        }

        // 팝업 닫기 function
        function closeProcessor() {
            if($('.gallery_swiper').length){
                channelEvent.gallerySwiper();
            }

            $('html').removeClass('blockScroll');
            $('.popup').removeClass('on');
            
            if ($('#mobile').length) { 
                scrollPosition = body.style.top;
                scrollPosition = scrollPosition.replace('px', '');
    
                body.style.removeProperty('top');
                window.scrollTo(0, -(scrollPosition));
                $('header').show();
                
            }
        }

    },

    goTopEvent:() => {
        $(window).scroll(function() {
            // top button controll
            if ($(this).scrollTop() > 400) {
                $('#topButton').fadeIn();
            } else {
                $('#topButton').fadeOut();
            }
            var footerTop = $('footer').offset().top - $(window).outerHeight();
            var pos = $('footer').outerHeight() + Number(80);
            var pos_m = $('footer').outerHeight() + Number(35);
            
            if($(this).scrollTop() > footerTop){
                if($('#pc').length){
                    $('#topButton').addClass('on').css({'bottom':pos});
                }else {
                    $('#topButton').addClass('on').css({'bottom':pos_m});
                }
    
            }else {
                if($('#pc').length){
                    $('#topButton').removeClass('on').css({'bottom':'80px'});
                }else {
                    $('#topButton').removeClass('on').css({'bottom':'35px'});
                }
                
            }
        });
    
        $(document).on('click', '#topButton', function() {
            $('html, body').animate({scrollTop:0}, '300');
        });
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
                dataButton.css({'background': personalColor[2] + ' url(images/estate/' + icon[0] + ') 50% 50% no-repeat'});   
                mobileIconSize();
            } else {
                dataButton.css({'background': personalColor[2] + ' url(images/estate/' + icon[2] + ') 50% 50% no-repeat'});
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

            if(estSearchBar.hasClass('.active')){
                $(this).css('transition-duration','.5s').addClass('dd');
            }else {

            }
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
                    dataButton.css({'background': personalColor[3] + ' url(images/estate/' + icon[1] + ') 50% 50% no-repeat'});
                } else {
                    dataButton.css({'background': personalColor[3] + ' url(images/estate/' + icon[3] + ') 50% 50% no-repeat'});
                }
                mobileIconSize();

            }, function() {
                if (data >= 0 && data <= 2) {
                    dataButton.css({'background': personalColor[2] + ' url(images/estate/' + icon[0] + ') 50% 50% no-repeat'});
                } else {
                    dataButton.css({'background': personalColor[2] + ' url(images/estate/' + icon[2] + ') 50% 50% no-repeat'});
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
        this.DirectSelect();
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
                    $(this).parent().siblings($('#selboxDirect')).show();
                    
                }else {
                    $(this).parent().siblings($('#selboxDirect')).hide();
                }
            });
        };
	},

    DirectSelect : function(){
        //직접입력
        var sel03Direct = $('#sel03Direct');
        $(sel03Direct).hide();
        $('#sel03').on('change', function(){
            if($("#sel03").val() == "직접입력" || $("#sel03").val() == "기타") {
                $(sel03Direct).show();
                console.log(sel03Direct);
            }  else {
                $(sel03Direct).hide();
            }
        });

    },

}

function addressKindChange(e) {
    var livingroom = [ "A/S 대상을 선택해 주세요.", "걸레받이", "공청TV", "도배", "목재문(틀)",  "몰딩", "홈네트워크(비디오폰)", "아트월", "유리", "전등",  "전화", "콘센트,스위치", "화재감지기", "PL창(틀)", "스피커", "기타" ];
    var bedroom = [ "A/S 대상을 선택해 주세요.", "가구(붙박이장)", "걸레받이", "공청TV", "도배", "목재문(틀)", "몰딩", "바닥재(마루)", "아트월", "유리", "전등", "전화", "콘센트,스위치", "화재감지기", "AL창(틀)", "PL창(틀)", "기타" ];
    var kitchen = [ "A/S 대상을 선택해 주세요.", "가스감지기", "걸레받이", "도배", "라디오/액정 TV", "렌지후드", "목재문(틀)", "몰딩", "바닥재(마루)", "수전류", "유리", "전등", "주방가구", "콘센트,스위치", "타일", "화재감지기", "AL창(틀)", "PL창(틀)", "빌트인 가스레인지", "빌트인 냉장고", "빌트인 세탁기", "빌트인 식기세척기", "빌트인 오븐렌지", "빌트인 잔반탈수기", "기타" ];
    var entrance = [ "A/S 대상을 선택해 주세요.", "가구(신발장)", "걸레받이", "도배", "디지털 도아록", "몰딩", "바닥재(석재)", "바닥재(타일)", "실리콘(코킹)", "아트월", "유리", "일괄소등스위치", "전등", "철재문(틀)", "기타" ];
    var sharedBathroom = [ "A/S 대상을 선택해 주세요.", "욕실장", "누수", "도배", "욕실문(틀)", "몰딩", "바닥 배수구", "비데", "샤워부스", "세면기", "수전류(샤워기 포함)", "실리콘(코킹)", "액세서리류", "양변기", "욕실폰", "욕조", "월풀욕조", "전등", "점검구", "콘센트,스위치", "타일", "천장 배기휀", "기타" ];
    var coupleBathroom = [ "A/S 대상을 선택해 주세요.", "욕실장", "누수", "도배", "욕실문(틀)", "몰딩", "바닥 배수구", "비데", "샤워부스", "세면기", "수전류(샤워기 포함)", "실리콘(코킹)", "액세서리류", "양변기", "욕실폰", "욕조", "월풀욕조", "전등", "점검구", "콘센트,스위치", "타일", "천장 배기휀", "기타" ];
    var balcony = [ "A/S 대상을 선택해 주세요.", "세탁선반", "난간대", "누수", "도장", "바닥 배수구", "선홈통", "수전류", "실리콘(코킹)", "전등", "콘센트,스위치", "타일", "균열", "PL창(틀)", "유리", "기타" ];
    var dressroom = [ "A/S 대상을 선택해 주세요.", "문짝 및 문틀", "시스템 선반", "가구(화장대)", "도배", "목재문(틀)", "몰딩", "바닥재(마루)", "PL창(틀)", "유리", "전등", "콘센트,스위치", "기타" ];
    var outdoorroom = [ "A/S 대상을 선택해 주세요.", "도장", "보일러", "실리콘(코킹)", "전등", "철재문(틀)", "콘센트,스위치", "AL창(틀)", "기타" ];
    var laundryroom = [ "A/S 대상을 선택해 주세요.", "도장", "보일러", "실리콘(코킹)", "전등", "PL창(틀)", "유리", "콘센트,스위치", "기타" ];
    var direct = [ "A/S 대상을 선택해 주세요.", "직접입력" ];

    var target = document.getElementById("sel03");
    var selDirect = document.getElementById("selboxDirect");
    selDirect.style.display = 'none';

    if(e.value == "1") var d = livingroom;
    else if(e.value == "2") var d = bedroom;
    else if(e.value == "3") var d = kitchen;
    else if(e.value == "4") var d = entrance;
    else if(e.value == "5") var d = sharedBathroom;
    else if(e.value == "6") var d = coupleBathroom;
    else if(e.value == "7") var d = balcony;
    else if(e.value == "8") var d = dressroom;
    else if(e.value == "9") var d = outdoorroom;
    else if(e.value == "10") var d = laundryroom;
    if(e.value == "direct") {
        var d = direct;
        selDirect.style.display = 'block';
    }else {
        selDirect.style.display = 'none';
    }

    target.options.length = 0;

    for (x in d) {
        var opt = document.createElement("option");
        opt.value = d[x];
        opt.innerHTML = d[x];
        target.appendChild(opt);
    }

}

var fileNo = 0;
var filesArr = new Array();

/* 첨부파일 추가 */
function addFile(obj){
    var maxFileCnt = 5;   // 첨부파일 최대 개수
    var attFileCnt = document.querySelectorAll('.filebox').length;    // 기존 추가된 첨부파일 개수
    var remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
    var curFileCnt = obj.files.length;  // 현재 선택된 첨부파일 개수

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
            reader.readAsDataURL(file)

            // 목록 추가
            let htmlData = '';
            htmlData += '<div id="file' + fileNo + '" class="filebox">';
            htmlData += '   <p class="name">' + file.name + '</p>';
            htmlData += '   <a class="delete" onclick="deleteFile(' + fileNo + ');"></a>';
            htmlData += '</div>';
            $('.file-list').append(htmlData);
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

function validation(obj){
    const fileTypes = ['image/gif','image/jpg','image/jpeg','image/png','image/bmp','image/tif'];
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