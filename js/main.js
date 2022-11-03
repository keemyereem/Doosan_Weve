
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **메인**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainEvent = {
	init:function(){
		this.initFullpage();
		this.headerEvent();
		this.footerEvent();
		// this.goTopEvent();
		this.S1_videoVisual();
		this.S2_videoVisual();
		this.S3_contHover();
	//	this.S4_snsScroll();
	}, 

	headerEvent: () => {
		$(window).on('scroll',function(){
            $("header").css("left",0-$(this).scrollLeft());
        });

	},

	footerEvent: () => {
        $(document).on("click",".family_site .site_selected",function(){
          var selElm = $(this).parent();
          if(!selElm.hasClass("open")){
              selElm.addClass("open");
          }else{
              selElm.removeClass("open");
          }
        });
    
        $(document).on("click",".family_site .site_list li a",function(){
          var selected = this.innerText,
              siteName = document.getElementsByClassName('site_selected')[0],
              familySite = this.parentNode.parentNode.parentNode;
    
          siteName.innerText = selected;
          familySite.classList.remove('open');
        });
    
    },

	initFullpage: () => {
		$(document).ready(function(){
			let _body = $("body");
			$('#pc #main_container').fullpage({
				// anchors: ['section01', 'section02', 'section03', 'section04', 'section05', 'footer'],
			//	responsiveWidth:1200,
				fitToSection: true,
				fitToSectionDelay: 0,
				scrollOverflow: true,
				animateAnchor :true,
				scrollBar: false,
				afterLoad: function(){
					cls();
				}
			});

			$('#mobile #main_container').fullpage({
				// anchors: ['section01', 'section02', 'section03', 'section04', 'section05', 'footer'],
				responsiveWidth:1200,
			});

			$(window).on("scroll" , function(){
				cls();
			});
		
			function cls(){
				if(_body.hasClass("fp-viewing-1")){
					$(".contBox02").addClass("motion2");
					$(".goTop").addClass("on");
				}else if(_body.hasClass("fp-viewing-2")){
					$(".contBox03").addClass("motion3");
					if($('#mobile').length){
						$(".goTop").removeClass("on");
					}else {
						$(".goTop").addClass("on");
					}
					
				}else if(_body.hasClass("fp-viewing-3")){
					$(".contBox04").addClass("motion4");
					$(".goTop").addClass("on");
				}else if(_body.hasClass("fp-viewing-4")){
					$(".contBox05").addClass("motion5");
					$(".goTop").addClass("on");
				}else{
					$(".goTop").removeClass("on");
				}
			}
		});
	},

	S1_videoVisual: () => {
		const video1 = document.querySelector("#visual_video_01");
		const video2 = document.querySelector("#visual_video_02");
    video1.load();

		$(function(){
			var slidemenu = ['We’ve', 'THE ZENITH']
			var mySwiper = new Swiper(".main_visual", {
				slidesPerView:1,
				slidesPerGroup:1,
				autoplay:{
					delay: 15000,
					disableOnInteraction: false
				},
				loop: true,
				allowTouchMove: false,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						return '<div class="' + className + '"><p>' + (slidemenu[index]) + '</p><em class="time"><i></i></em>' + '</div>';
					},
				},
			});

			mySwiper.on("slideChange",function(){
				if($(".swiper-slide.v01").hasClass("swiper-slide-active")){
					video1.currentTime = 0;
					video1.play();
				}else if($(".swiper-slide.v02").hasClass("swiper-slide-active")){
					video2.currentTime = 0;
					video2.play();
				}
			});

			video1.play();
		});
	},

	S2_videoVisual: () => {
		$(function(){
			var swiper = new Swiper("#pc .es_slider", {
				slidesPerView: 5
			});

			var swiper = new Swiper("#mobile .es_slider", {
				slidesPerView: 1,
				pagination: {
					el: ".es_slider .swiper-pagination"
				},
				on: {
					slideChange: function () {
						_this = $(this)[0].activeIndex + 1;
						$(".es_slider .bg_box").attr("class" , "bg_box").addClass("mbg" + _this);
						$(".es_slider .swiper-pagination span").removeClass(".es_slider swiper-pagination-bullet-active");
						$(".es_slider .swiper-pagination span:nth-child(" + _this + ")").addClass(".es_slider swiper-pagination-bullet-active");
						$(".es_slider").attr("class" , "es_slider");
						$(".es_slider").addClass("bg" + _this);
					}
				}
			});

			let _bg;
			$("#pc .es_slider .swiper-slide").hover(function(){
				_bg = $(this).attr("bg-type");
				$(".es_slider").attr("class" , "es_slider");
				$(".es_slider").addClass(_bg);
			}, function(){
				$(".es_slider").attr("class" , "es_slider");
			});
		});
	},

	S3_contHover: () => {
		$(function(){
			var houseSlider = new Swiper(".house_slider", {
				slidesPerView:1,
				slidesPerGroup:1,
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
						$(".contBox03 .bg_box").attr("class" , "bg_box").addClass("mbg" + _this);
						console.log(_this);
					}
				}
			});

			$(".house_slider .swiper-slide").hover(function(){
				_idx = $(this).index() + 1;
				$(this).closest(".house_slider").attr("class" , "house_slider").addClass("bg" + _idx);
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
}
