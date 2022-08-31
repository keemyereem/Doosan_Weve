
/* --------------------- DoosanWeve Released 2022.08.24 --------------------- */
/* ----------------------- Published by 4m Creative ------------------------ */

$(function(){
	
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                         **메인**                                                                   ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mainEvent = {
	init:function(){
		this.initFullpage();
		this.headerEvent();
		this.S1_videoVisual();
		this.S3_contHover();
		this.S4_snsScroll();
	}, 

	headerEvent: () => {
		$(window).on('scroll',function(){
            $("header").css("left",0-$(this).scrollLeft());
        });

	},

	initFullpage: () => {
		$(document).ready(function(){
			let _body = $("body");
			$('#main_container').fullpage({
				anchors: ['section01', 'section02', 'section03', 'section04', 'section05', 'footer'],
				// responsiveWidth:1200,
				fitToSection: true,
				fitToSectionDelay: 0,
				scrollOverflow: true,
				animateAnchor :true,
				scrollBar: false,
				afterLoad: function(){
					cls();
				}
			});
			$(window).on("scroll" , function(){
				cls();
			});
		
			function cls(){
				if(_body.hasClass("fp-viewing-section02")){
					$(".contBox02").addClass("motion2");
				}else if(_body.hasClass("fp-viewing-section03")){
					$(".contBox03").addClass("motion3");
				}else if(_body.hasClass("fp-viewing-section04")){
					$(".contBox04").addClass("motion4");
				}else if(_body.hasClass("fp-viewing-section05")){
					$(".contBox05").addClass("motion5");
				}
			}
		});
	},

	S1_videoVisual: () => {
		const video1 = document.querySelector("#visual_video_01");
		const video2 = document.querySelector("#visual_video_02");

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
					}
				}
			});

			$(".house_slider .swiper-slide").hover(function(){
				_idx = $(this).index() + 1;
				$(this).closest(".house_slider").attr("class" , "house_slider").addClass("bg" + _idx);
			});
		});
	},

	S4_snsScroll: () => {
		$(".sns_wrap").mCustomScrollbar({
			axis:"x",
			advanced:{autoExpandHorizontalScroll:true}
		});
	},
}
