
/* --------------------- DoosanWeve Released 2022.08.24 --------------------- */
/* ----------------------- Published by 4m Creative ------------------------ */

$(function(){
	// 이미지 나오기
	$.fn.unveil = function(threshold, callback) {

		var $w = $(window),
			th = threshold || 0,
			retina = window.devicePixelRatio > 1,
			attrib = retina? "data-unveil-retina" : "data-unveil",
			images = this,
			loaded;
	
		this.one("unveil", function() {
		  var source = this.getAttribute(attrib);
		  source = source || this.getAttribute("data-unveil");
		  if (source) {
			if (!(this instanceof HTMLImageElement)){
				this.setAttribute("style", "background-image:url("+source+");");
			}else{
				this.setAttribute("src", source);
			}
			if (typeof callback === "function") callback.call(this);
		  }
		});
	
		function unveil() {
		  var inview = images.filter(function() {
			var $e = $(this);
			if ($e.is(":hidden")) return;
	
			var wt = $w.scrollTop(),
				wb = wt + $w.height(),
				et = $e.offset().top,
				eb = et + $e.height();
	
			return eb >= wt - th && et <= wb + th;
		  });
	
		  loaded = inview.trigger("unveil");
		  images = images.not(loaded);
		}
	
		$w.on("scroll.unveil resize.unveil lookup.unveil", unveil);
	
		unveil();
	
		return this;
	
	};


	/* ====================================================== */
	/* ===                                                === */
	/* ====================================================== */
	
	
});



'use strict';

/**
 * JT javascript UI library
 * @namespace
 * @description UI library create to help front end developement
 */
var JT = JT || {};

(function(win, $) {

    /**
     * Smooth scroll with gsap (TODO : make a plugin)
     *
     * @version 1.0.0
     * @since 2018-02-03
     * @author STUDIO-JT (NICO)
     * @requires gsap.min.js
     * @requires ScrollToPlugin.min.js
     */
    JT.smoothscroll = {

        passive : function(){
            var supportsPassive = false;
            try {
              document.addEventListener("test", null, { get passive() { supportsPassive = true }});
            } catch(e) {}

            return supportsPassive;
        },
        init : function(){

            if($('html').hasClass('mobile') || $('html').hasClass('mac')) return;

            var $window = $(window);
            var scrollTime = 1;
            var distance_offset = 2.5;
            var scrollDistance = $window.height() / distance_offset;

            if(this.passive()){
                window.addEventListener("wheel",this.scrolling,{passive: false});
            }else{
                $window.on("mousewheel DOMMouseScroll", this.scrolling);
            }

        },
        destroy : function(){

            if(this.passive()){
                window.removeEventListener("wheel",this.scrolling);
            }else{
               $(window).off("mousewheel DOMMouseScroll", this.scrolling);
            }
            gsap.killTweensOf($(window),{scrollTo:true});

        },
        scrolling : function(event){

            event.preventDefault();

            var $window = $(window);
            var scrollTime = 1;
            var distance_offset = 2.5;
            var scrollDistance = $window.height() / distance_offset;
            var delta = 0;

            if(JT.smoothscroll.passive()){
                delta = event.wheelDelta/120 || -event.deltaY/3;
            }else{
                if(typeof event.originalEvent.deltaY != "undefined"){
                    delta = -event.originalEvent.deltaY/120;
                }else{
                    delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
                }
            }

            var scrollTop = $window.scrollTop();
            var finalScroll = scrollTop - parseInt(delta*scrollDistance);

            gsap.to($window, {
                duration: scrollTime,
                scrollTo : { y: finalScroll, autoKill:true },
                ease: 'power3.out',
                overwrite: 5
            });

        }

    };







    /**
     * Check if screen is smaller than
     *
     * @description egal to css mediaqueries max-width
     * @version 1.0.0
     * @since 2018-02-12
     * @author STUDIO-JT (NICO)
     *
     * @example
     * // Basic usage :
     * JT.is_screen('767');
     */
    JT.is_screen = function(max_width){
        if(win.matchMedia){
            return win.matchMedia('(max-width:'+ max_width +'px)').matches;
        }else{
            return win.innerWidth <= max_width;
        }
    };



    /**
     * IOS friendly window height getter helper
     *
     * @description Check is is full screen (without address bar) or not and get the right window height
     * @version 1.0.0
     * @since 2020-12-11
     * @author STUDIO-JT (NICO)
     *
     * @example
     * // Basic usage :
     * var win_height = JT.win_height();
     */
    JT.win_height = function(){

        var win_height = 0;

        if(window.screen.height === window.innerHeight){
            // WITHOUT Address bar (fullscreen)
            win_height = window.screen.height;
        }else{
            win_height = window.innerHeight;
        }

        return win_height;
    };



    /**
     * Empty object will store all custom global of the site
     *
     * @description Sometime variables or functions need to be accessible globally.
     * Use this object to store them, it avoid potentiel conflict with third party script.
     * Please use this functionality with wisdom you avoid memory issue
     *
     * @version 1.0.0
     * @since 2018-02-12
     * @author STUDIO-JT (NICO)
     *
     * @example
     * // Add global variable :
     * JT.globals.my_var = 'somthing';
     *
     * // Add global fucntion :
     * JT.globals.my_function = function(){
     *   // alert('something')
     * };
     */
    JT.globals = {};




    /**
     * UI Helper
     *
     * @description UI 愿��� �⑥닔 愿�由ъ슜 �ы띁
     *
     * @version 1.0.0
     * @since 2018-04-12
     * @author STUDIO-JT (201)
     *
     * @example
     * // �깅줉�� 紐⑤뱺 �⑥닔 �ㅽ뻾�섍린
     * JT.ui.init();
     *
     * @example
     * // �⑥닔 �깅줉�섍린
     * JT.ui.add( function () {
     *   // alert('something')
     * };
     * JT.ui.add( test_func );
     * function test_func () {
     *     // alert( 'somethid' );
     * };
     *
     * @example
     * // �⑥닔紐�(string) �쇰줈 ��젣�섍린
     * JT.ui.del( func_name );
     * JT.ui.del( 'test_func' );
     *
     * @example
     * // �⑥닔紐�(string)�쇰줈 �⑥닔 媛��몄삤湲�
     * JT.ui.get( func_name );
     * JT.ui.get( 'test_func' );
     *
     * @example
     * // �⑥닔紐�(string)�쇰줈 �⑥닔 �ㅽ뻾�섍린
     * JT.ui.call( func_name );
     * JT.ui.call( 'test_func' );
     *
     * @�듬챸�⑥닔�� func_{timestamp} 濡� 異붽���
     */
    JT.ui = {

        list: {},

        init: function () {

            try {

                for ( var func_name in this.list ) {

                    if ( typeof this.list[ func_name ] === 'function' ) {

                        this.list[ func_name ].call();

                    }

                }

            } catch ( e ) {

                console.log( e );

            }

        },

        add: function ( func, exec_flag ) {

            try {

                if ( typeof func === 'function' ) {

                    var func_name = ( ! func.name ? func.toString().match(/^function\s*([^\s(]+)/)[1] : func.name );

                    this.list[ func_name ] = func;

                    if ( typeof exec_flag !== 'undefined' && exec_flag === true ) {

                        func.call();

                    }

                }

            } catch ( e ) {

                console.log( e );

            }

        },

        del: function ( func_name ) {

            try {

                delete this.list[ func_name ];

            } catch ( e ) {

                console.log( e );

            }

        },

        replace: function ( func_name, func ) {

            try {

                if ( typeof func === 'function' ) {

                    this.list[ func_name ] = func;

                }

            } catch ( e ) {

                console.log( e );

            }

        },

        get: function ( func_name ) {

            try {

                return this.list[ func_name ];

            } catch ( e ) {

                console.log( e );
                return null;

            }

        },

        call: function ( func_name ) {

            try {

                this.list[ func_name ].call();

            } catch ( e ) {

                console.log( e );

            }

        }

    };



     JT.killChildTweensOf = function( parent, complete ) {
        var parents = gsap.utils.toArray(parent),
            i = parents.length,
            _isDescendant = function(element) {
                while (element) {
                    element = element.parentNode;
                    if (element === parent) {
                        return true;
                    }
                }
            },
            j, tweens, targets;
        if (i > 1) {
            while (--i > -1) {
                killChildTweensOf(parents[i], complete);
            }
            return;
        }
        parent = parents[0];
        tweens = gsap.globalTimeline.getChildren(true, true, false);
        for (i = 0; i < tweens.length; i++) {
            targets = tweens[i].targets();
            j = targets.length;
            for (j = 0; j < targets.length; j++) {
                if (_isDescendant(targets[j])) {
                    if (complete) {
                        tweens[i].totalProgress(1);
                    }
                    tweens[i].kill();
                }
            }
        }
    }


    
})(window, jQuery);


/*
 * File       : js/jt-strap.js
 * Author     : STUDIO-JT (KMS, NICO, JUN, SUMI)
 * Guideline  : JTstyle.2.1
 *
 * SUMMARY:
 * 1) JT Functions INIT
 * 2) ON LOAD
 * 3) ON RESIZE
 * 4) JT Functions
 */



jQuery(function($) {



	// LAZYLOAD
	JT.ui.add( lazyload_init, true );


	
	/* **************************************** *
	 * ON RESIZE
	 * **************************************** */
	// INITIALIZE RESIZE
	function init_resize(){
	
		// setTimeout to fix IOS animation on rotate issue
		setTimeout(function(){
			
			// add here
	
		}, 400);
	
	}
	
	// Init resize on reisize
	$(window).on('resize',init_resize);
	
	
	
	
	/**
	 * Image Lazyload
	 *
	 * @version 1.0.0
	 * @author STUDIO-JT (KMS)
	 *
	 * @example
	 * Markup sample
	 * <figure class="jt-lazyload">
	 * 	 <span class="jt-lazyload__color-preview"></span>
	 * 	 <img width="120" height="120" data-unveil="some_img_url.jpg" src="blank.gif" alt="" />
	 * 	 <noscript><img src="some_img_url.jpg" alt="" /></noscript>
	 * </figure>
	 *
	 * @description masonry ���낆씪寃쎌슦 jt-lazyload�� jt-lazyload--masonry class瑜� 異붽�濡� 遺숈뿬二쇱꽭��
	 */
	function lazyload_init(){
	
		// lazyload
		$('[data-unveil]').unveil(300, function() {
			$(this).on('load',function() {
				if( $(this).closest('.jt-lazyload').length > 0 ) {
					$(this).closest('.jt-lazyload').addClass('jt-lazyload--loaded');
				} else {
					$(this).addClass('jt-lazyload--loaded');
				}
			});
		});
	
	}
	
	
	
}); // End jQuery

/*
 * File       : js/main.js
 * Author     : STUDIO-JT (KMS, NICO, HEE)
 * Guideline  : JTstyle.2.1
 *
 * SUMMARY:
 * 1) Global
 * 2) JT Default Functions INIT
 * 3) Other Functions INIT
 * 4) ON LOAD
 * 5) ON RESIZE
 * 6) JT Default Functions
 * 7) Other Functions
 * 8) Helpers
 */



jQuery(function($) {



	/* **************************************** *
	 * Global
	 * **************************************** */

	
	// Anchor click flag
	anchorScrolledHelper = false;
	

	
	var window_width = $(window).width();
	
	// Scroll helper
	var newsListSave = null;
	var newsListScrollSave = null;
	
	
	
	/* **************************************** *
	 * RUN
	 * **************************************** */
	init(true);
	JT.ui.add( init );
	
	
	
	/* **************************************** *
	 * INIT
	 * **************************************** */
	function init(loadonce){
	
		// Every load
		if(typeof gsap.killTweensOf !== 'undefined'){
			JT.killChildTweensOf( $('#barba-wrapper').find('*')[0] );
			// gsap.killTweensOf( $('#barba-wrapper').find('*') ); // killtween
		}
	
		if( ScrollTrigger.getAll().length > 0 ) {
			// kill scrolltrigger
			$.each( ScrollTrigger.getAll() , function(idx,st){ st.kill(); });
		}
	
		// smoothscroll
		if( !$('body').hasClass('home') && !$('body').hasClass('page-template-brand-story') && !$('body').hasClass('page-template-news') && !$('body').hasClass('single') && !$('body').hasClass('page-template-brand-play')){
			JT.smoothscroll.destroy();
			JT.smoothscroll.init();
		}else {
			JT.smoothscroll.destroy();
		}
	
		// functions
		gsap_config();
	
		scroll_top();
		scroll_down();
		jt_fullvid();
		article_visual_vid();
	
		privacy_ajax();
	
		parallax_motion();
	
		// sub_visual_motion();
	
		full_visual_height();
	
		global_motion_setting();
		
		sub_lines_motion();
	
		pagechange_memory();
		
		if( $('body').hasClass('page-template-brand-identity') ){
			identity_value_motion();
			identity_vision_motion();
			identity_brand_motion();
			jt_draw_line();
		}
	
		if( $('body').hasClass('page-template-brand-story') ) {
			story_fullpage();   
		}
	
		if( $('body').hasClass('page-template-style-architecture') ) {
			architecture_intro_motion();
			architecture_vision_motion();
			wave_marquee();
		}
	
		if( $('body').hasClass('page-template-style-landscape') ) {
			landscape_visual_bg_height();
		}
	
		if( $('body').hasClass('page-template-style-service') ) {
			service_icon_motion();
		}
	
		if( $('body').hasClass('single') ) {
			share_popup_init();
		}
	
		// First load
		if (typeof loadonce !== 'undefined' && loadonce === true) {
	
			barba_init();
	
			focus_on_tab_only();
			// screen_nav_a11y();
	
			minimize_header();
	
			// fix jquery 3 on load issue
			if( $('html').hasClass('safari') ){
				setTimeout(function(){
					init_onload();
				}, 1000);
			}
	
		// >=2nd load
		}else{
	
			init_onload();
	
		}
	
		// Hack trigger resize to debug some stuff
		$(window).trigger('resize');
	
	}
	

	
	
	/* **************************************** *
	 * ON RESIZE
	 * **************************************** */
	// INITIALIZE RESIZE
	function init_resize(){
	
		// setTimeout to fix IOS animation on rotate issue
		setTimeout(function(){
	
			// only width resize check not height ( minimize address bar debugging )
			if ($(this).width() !== window_width) {
				full_visual_height();
	
				if( $('body').hasClass('page-template-style-landscape') ) {
					landscape_visual_bg_height();
				}
			}
	
		}, 400);
	
	}
	
	// Init resize on reisize
	$(window).on('resize',init_resize);
	
	


	
	
	/* **************************************** *
	 * JT Default Functions
	 * **************************************** */
	/**
	 * CUSTOM GSAP CONFIG ( Remove gsap warning from console )
	 *
	 * @version 1.0.0
	 * @author STUDIO-JT (Nico)
	 * @requires gsap.min.js
	 */
	function gsap_config(){
	
		gsap.config({
			nullTargetWarn: false,
			trialWarn: false
		});
	
	}
	
	
		

	
	
	/**
	 * fixed scroll top button, animate scroll top
	 *
	 * @version 1.0.0
	 * @author STUDIO-JT (KMS)
	 */
	function scroll_top(){
	
		var $scrollBtn = $('.go-top');
	
		$scrollBtn.on('click',function(e){ 
			e.preventDefault(); 
	
			if( $('body').hasClass('home') ) {
	
				$('body').removeClass('main-fullpage--show-footer');
	
				gsap.to('.main-fullpage', { duration: 1, y: 0, force3D: true });
				gsap.to('#footer', { duration: 1, y: '100%', force3D: true });
	
				$('.main-fullpage')[0].swiper.slideTo(0, 1200);
	
				if( !$('html').hasClass('mobile') ) {
					setTimeout(function () { $('.main-fullpage')[0].swiper.mousewheel.enable(); }, 1200);
				}
	
			} else if ( $('body').hasClass('page-template-brand-story') ) {
	
				$('body').removeClass('story-fullpage--show-footer');
	
				gsap.to('.story-fullpage', { duration: 1, y: 0, force3D: true });
				gsap.to('#footer', { duration: 1, y: '100%', force3D: true });
	
				$('.story-fullpage')[0].swiper.slideTo(0, 1200);
	
				if( !$('html').hasClass('mobile') ) {
					setTimeout(function () { $('.story-fullpage')[0].swiper.mousewheel.enable(); }, 1200);
				}
	
			} else {
				gsap.to(window, {duration: .4,scrollTo: 0,ease: 'power3.out'}); 
			}
		});
	
	}
	
	
	
	/**
	 * animate scroll down
	 *
	 * @version 1.0.0
	 * @author STUDIO-JT (KMS)
	 */
	function scroll_down(){
	
		$('.go-down').on('click',function(e){
			e.preventDefault(); 
	
			if( $('body').hasClass('home') ) {
	
				$('.main-fullpage')[0].swiper.slideNext();
	
			} else if ( $('body').hasClass('page-template-brand-story')) {
	
				$('.story-fullpage')[0].swiper.slideNext();
	
			} else {
	
				var target = $(this).attr('href');
				var targetTop = $(target).offset().top;
				var headerHeight = $('#header').height();
	
				gsap.to(window, { duration: .6, scrollTo: (targetTop - headerHeight), ease: 'power3.out' });
						
			}
	
		});
	
	}
	
	
	
	/**
	 * JT embed fullvid
	 *
	 * @version 1.0.0
	 * @author STUDIO-JT (Nico)
	 */
	function jt_fullvid(){
	
		var $video = $('iframe.jt-fullvid');
	
		// resize function
		JT.globals.fullvid_resize = function(){
	
			setTimeout(function(){
	
				$video.each(function(){
					var $iframe = $(this);
					var $container = $iframe.closest('.jt-fullvid-container');
					var ratio = $iframe.attr('data-ratio');
	
					var containerWidth = $container.width() + 10;
					var containerHeight = $container.height() + 10;
	
					var newIframeWidth = containerWidth;
					var newIframeHeight = containerWidth * ratio;
	
					if(newIframeHeight < containerHeight){
						newIframeHeight = containerHeight;
						newIframeWidth = containerHeight / ratio;
					}
	
					$iframe.css({width:newIframeWidth, height:newIframeHeight});
				});
	
			}, 100);
	
		}
		$(window).on('resize', JT.globals.fullvid_resize);
	
		//
		$video.each(function(idx,item){
			var $iframe = $(this);
			var iframe_width = $iframe.width() + 10;
			var iframe_height = $iframe.height() + 10;
			var ratio = iframe_height / iframe_width;
	
			$iframe.attr('data-ratio' , ratio);
	
			var $container = $iframe.closest('.jt-fullvid-container');
			var containerWidth = $container.width() + 10;
			var containerHeight = $container.height() + 10;
	
			var newIframeWidth = containerWidth;
			var newIframeHeight = containerWidth * ratio;
	
			if(newIframeHeight < containerHeight){
				newIframeHeight = containerHeight;
				newIframeWidth = containerHeight / ratio;
			}
	
			$iframe.css({display: 'block',width: newIframeWidth,height: newIframeHeight,position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%,-50%)'});
	
		});
	
	}
	
	
	

	



	
	// Article Visual Video
	function article_visual_vid(){
	
		var $visual_bg = $('.article-visual__bg');
		var $video = $visual_bg.find('iframe');
	
		if( !!$video.length ){
			JT.globals.jt_vimeo_ready(function(){
				var video = new Vimeo.Player($video[0]);
				var $poster = $video.closest('.jt-fullvid-container').find('.jt-fullvid__poster-bg');
	
				video.getDuration().then(function(duration){
	
					video.setCurrentTime(0);
					video.play();
	
					sub_visual_motion();
	
					video.on('timeupdate', function(data) {
						
	
						if(data.seconds > 0) {
							video.off('timeupdate');
	
							if( $poster.is(':visible') ){
								gsap.to($poster, .2, {autoAlpha: 0,onComplete: function() {$poster.hide();}});
							}
						}
					});
	
					// video not working
					video.on('error', function(data){
						var $bg = $video.closest('.article-visual__bg');
						var $bgLow = $bg.find('.jt-fullvid__poster-bg--low');
						if( !!$bgLow.length ) {
							$bgLow.css('display','block');
							gsap.to($bg.find('.jt-fullvid__poster-bg'), .3, {autoAlpha: 0, delay: .3, 
								onComplete: function(){
									$bg.find('.jt-fullvid__poster-bg').hide();
									// sub_visual_motion();
								}
							});
						}
					});
	
				});
			});
	
		}else {
	
			sub_visual_motion();
		}
	}
	

	
	
	// Privacy Modal
	function privacy_ajax() {
	
		$('.privacy-popup-link').magnificPopup({
			type: 'ajax',
			ajax: {
				settings: null,
				cursor: 'mfp-ajax-cur',
				tError: '而⑦뀗痢좊� 遺덈윭�ㅻ뒗�� �ㅽ뙣�덉뒿�덈떎.'
			},
			mainClass: 'privacy-popup',
			removalDelay: 160,
			preloader: false,
			closeOnBgClick: false,
			showCloseBtn: false,
			fixedContentPos: true,
			callbacks: {
				parseAjax: function(mfpResponse) {
					mfpResponse.data = $(mfpResponse.data).find('.main-container');
	
					// ui call
					setTimeout(function(){
						JT.ui.call('jt_accordion');
						JT.ui.call('selectric_init');
						JT.ui.call('privacy_form_submit');
					}, 50)
	
					// prevent smoothscroll
					if( !$('body').hasClass('home') && !$('body').hasClass('page-template-brand-story') && !$('body').hasClass('page-template-news') && !$('body').hasClass('single')){
						JT.smoothscroll.destroy();
					}
	
					// Scroll
					if ( JT.is_screen(540) ) {
	
						var scroll_storage = $(window).scrollTop();
						$('body').addClass('open-popup-fixed').attr('data-scrolltop' , scroll_storage);
	
						setTimeout(function(){
							$('body').css('position', 'fixed');
						}, 300);
					}
				},
				beforeOpen: function() {
					var html = '<button class="privacy-modal__close">';
							html += '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">';
								html += '<path d="M43.0117 2L1.99952 43.0122" stroke="black" stroke-width="2"/>';
								html += '<path d="M2.01172 2L43.0239 43.0122" stroke="black" stroke-width="2"/>';
							html += '</svg>';
						html += '</button>';
	
					if( $('.privacy-modal__close').length === 0 ){
						$('body').append(html);
					}
	
					// close addeventlistener
					$(document).on('click', '.privacy-modal__close', function(e){
						gsap.fromTo('.privacy-modal__close', {autoAlpha: 1,scale: 1,ease: Power2.easeOut}, {duration: .2, autoAlpha: 0,scale: 0,transformOrigin: "50% 50%",
							onComplete: function() {
								gsap.to('.privacy-popup', {duration: .2, autoAlpha: 0, 
									onStart: function(){
										if( JT.is_screen(540) ){
											$('body').removeAttr('style');
											window.scrollTo(0 , $('body').attr('data-scrolltop'));
										}
									}, 
									onComplete: function(){
										$.magnificPopup.close();
									}
								})
							}
						});
					});
	
				},
				open: function() {
					if(!$('body').hasClass('privacy-popup-open')){
						$('body').addClass('privacy-popup-open');
					}
					
					$('.privacy-modal__close').show(300);
				},
				close: function(){ 
	
					$('body').removeClass('privacy-popup-open open-popup-fixed');
	
					if( $('.privacy-modal__close').length ){
						$('.privacy-modal__close').remove();
					}
	
					// reinit smoothscroll
					if( !$('body').hasClass('home') && !$('body').hasClass('page-template-brand-story') && !$('body').hasClass('page-template-news') && !$('body').hasClass('single')){
						JT.smoothscroll.destroy();
						JT.smoothscroll.init();
					}
	
				}
			}
		});
	
	}
	
	
	
	// Sub line Motion (spread lines)
	function sub_lines_motion(){
		
		var $lines = $('.sub-lines').find('> span')
	
		if( !!$lines.length ) { 
	
			// line motion
			$lines.each(function(i){
				var $this = $(this);
				var start_pos = $this.offset().left;
				var total = $lines.length;
	
				gsap.fromTo($this,{
					x: -(start_pos / total * i / 4)
				},{
					x: 0,
					duration: 1,
					scrollTrigger: {
						trigger: $this,
						start: 'top 100%',
						scrub: true,
					},
					
				})
			})
		}
	
	
		var $vertical_line = $('.sub-vertical-line');
	
		if( !!$vertical_line.length && !$('html').hasClass('mobile') ) { 
	
			$vertical_line.each(function(){
	
				var $this = $(this);
				var origin_height = $this.height();
						
				gsap.fromTo($this, {
					height: 0,
				},{
					height: origin_height,
					duration: 1,
					ease: Power1.easeOut,
					scrollTrigger: {
						trigger: $this,
						start: 'top 90%',
					}
	
				})
			})
		}
	
	}
	
	
	
	// Identity Value Motion (icon timeline)
	function identity_value_motion(){
	
		var $section = $('.identity-value__list');
	
		var tl_moment = new TimelineLite({paused:true, repeat: -1});
		var tl_experience = new TimelineLite({paused:true, repeat: -1});
		var tl_space = new TimelineLite({paused:true, repeat: -1});
		var tl_focus = new TimelineLite({paused:true, repeat: -1, repeatDelay: 1});
	
		// set(moment)
		gsap.set('.identity-value__item--moment .identity-value__illust', { filter: 'blur(0)'});
	
		// set(experience)
		gsap.set('.identity-value__item--experience .identity-value__illust', { rotation: -180, transformOrigin:"50% 50%" });
		
		// set(space)
		gsap.set('.identity-value__item--space .identity-value__illust path.st1',  {drawSVG: "0% 50%"});
		gsap.set('.identity-value__item--space .identity-value__illust path.st2', {drawSVG: "50% 100%"});
		gsap.set('.identity-value__item--space .identity-value__illust path.st3', {drawSVG: "50% 100%"});
		gsap.set('.identity-value__item--space .identity-value__illust path.st4', {drawSVG: "0% 50%"});
		
		// animation(moment)
		tl_moment.to('.identity-value__item--moment .identity-value__illust', {duration: 3.2, filter: 'blur(20rem)', ease: Power1.easeOut });
		tl_moment.to('.identity-value__item--moment .identity-value__illust', {duration: 3.2, filter: 'blur(0rem)', ease: Power1.easeOut });
		
		// animation(experience)
		tl_experience.to('.identity-value__item--experience .identity-value__illust', { duration: 1.6, rotation: 0, ease: Power1.easeOut });
		
		// animation(space)
		tl_space.fromTo('.identity-value__item--space .identity-value__illust path.st1', {drawSVG: "0% 50%"}, {duration: 1.2, drawSVG: "0% 99.9%", ease: Circ.easeOut });
		tl_space.fromTo('.identity-value__item--space .identity-value__illust path.st2', {drawSVG: "50% 100%"}, {duration: 1.2, drawSVG: "0% 99.9%", ease: Circ.easeOut }, "-=1.2");
		tl_space.fromTo('.identity-value__item--space .identity-value__illust path.st3', {drawSVG: "50% 100%"}, {duration: 1.2, drawSVG: "0% 99.9%", ease: Circ.easeOut }, "-=1.2");
		tl_space.fromTo('.identity-value__item--space .identity-value__illust path.st4', {drawSVG: "0% 50%"}, {duration: 1.2, drawSVG: "0% 99.9%", ease: Circ.easeOut }, "-=1.2");
		tl_space.fromTo('.identity-value__item--space .identity-value__illust path.st1', {drawSVG: "0% 99.9%"}, {duration: .8, drawSVG: "0% 50%", delay: 1.6, ease: Circ.easeOut });
		tl_space.fromTo('.identity-value__item--space .identity-value__illust path.st2', {drawSVG: "0% 99.9%"}, {duration: .8, drawSVG: "50% 100%", ease: Circ.easeOut }, "-=.8");
		tl_space.fromTo('.identity-value__item--space .identity-value__illust path.st3', {drawSVG: "0% 99.9%"}, {duration: .8, drawSVG: "50% 100%", ease: Circ.easeOut }, "-=.8");
		tl_space.fromTo('.identity-value__item--space .identity-value__illust path.st4', {drawSVG: "0% 99.9%"}, {duration: .8, drawSVG: "0% 50%", ease: Circ.easeOut }, "-=.8");
		
		// animation(focus)
		tl_focus.to('.identity-value__item--focus .identity-value__illust', { duration: 1.2, rotation: 45, ease: Power1.easeOut });
		tl_focus.to('.identity-value__item--focus .identity-value__illust', { duration: 1.2, rotation: 90, ease: Power1.easeOut }, "+=1");
		tl_focus.to('.identity-value__item--focus .identity-value__illust', { duration: 1.2, rotation: 135, ease: Power1.easeOut }, "+=1");
		tl_focus.to('.identity-value__item--focus .identity-value__illust', { duration: 1.2, rotation: 180, ease: Power1.easeOut }, "+=1");
	
		// action
		ScrollTrigger.create({
			trigger: $section,
			start: "0% 80%",
			onEnter: function(){
				tl_moment.play();
				tl_experience.play();
				tl_space.play();
				tl_focus.play();
			}
		})
	}
	
	
	
	// Identity Vision Motion (spread lines)
	function identity_vision_motion(){
	
		var $lines = $('.identity-vision__item--mission').find('path')
	
		// line motion
		$lines.each(function(i){
			var $this = $(this);
			
			gsap.fromTo($this,{
				rotation: -(45 * i),
				transformOrigin:"50% 50%",
			},{
				rotation: 0,
				//duration: 1,
				scrollTrigger: {
					trigger: $this,
					start: 'top 100%',
					end: 'bottom 50%',
					scrub: true,
				},
				
			})
		});
	
	}
	
	
	
	// Identity Brand Motion (add "animate" class)
	function identity_brand_motion(){
	
		var $bg = $('.identity-brand__bg');
	
		ScrollTrigger.create({
			trigger: $bg,
			start: "top 70%",
			onEnter: function(){
				$bg.addClass('animate');
			},
		});
	}
	
	
	
	// Jt Draw Line Motion
	function jt_draw_line(){
	
		$('.jt-draw-line svg').each(function() {
	
			var $svg = $(this);
			var $paths = $svg.find('path');
			var tl = new TimelineLite({paused:true});
	
			gsap.set($paths,{drawSVG:'0%'});
			tl.staggerTo($paths, 1.2, {drawSVG:'100%', ease: Power3.easeOut}, .2);
			
			gsap.to($svg,{
				scrollTrigger: {
					trigger: $svg,
					start: 'top 90%',
					onEnter: function(){
						tl.play();
					}
				}
			});
	
		});
	
	}
	
	
	
	// Architecture Intro Motion (pin content, image motion)
	function architecture_intro_motion(){
	
		// content pin
		$('.archt-intro__section').each(function(){
			
			var $this = $(this);
			var $content = $this.find('.archt-intro__content');
	
			gsap.set($content, {autoAlpha: 0});
	
			var start_pos = "top 50%";
			var end_pos =  "bottom 50%";
	
			if ($this.index() == 0) {
	
				if(!JT.is_screen(1023)){
					start_pos = "top 40%"
				}else {
					start_pos = "top 30%"
				}
			}
	
			if ($this.index() == $('.archt-intro__section').length - 1){
	
				if(!JT.is_screen(1023)){
					end_pos = "bottom 60%"
				}else {
					end_pos = "bottom 70%"
				}
			}
	
			ScrollTrigger.create({
				trigger: $this,
				// markers: true,
				start: start_pos, 
				end: end_pos,
				// markers: true,
				scrub: true,
				onEnter: function(){
					gsap.to($content, {
						duration: .3,
						autoAlpha: 1,
					})
				},
				onEnterBack: function(){
					gsap.to($content, {
						duration: .3,
						autoAlpha: 1,
					})
				},
				onLeaveBack: function(){
					gsap.to($content, {
						duration: .3,
						autoAlpha: 0,
					})
				},
				onLeave: function(){
					gsap.to($content, {
						duration: .3,
						autoAlpha: 0,
					})
				}
			})
	
		});
	
		// image motion
		$('.archt-intro__img').each(function(){
			var $this = $(this);
	
			gsap.fromTo($this,{
				opacity: 0,
				y: 100,
			},{
				opacity: 1,
				y: 0,
				duration: 1,
				scrollTrigger: {
					trigger: $this,
					start: 'top 80%',
					onEnter: function(){
						$this.addClass('animate');
					}
				},
				ease: 'power2.out',            
			});
	
		});
	}
	
	
	
	// Parallax Motion Setting
	function parallax_motion(){
		
		$('.parallax-motion-y').each(function(){
		
			var $this = $(this);
			var bottomTop = $this.attr('data-bottom-top');
			var topBottom = $this.attr('data-top-bottom');
		
			gsap.fromTo($this,{
				y: bottomTop
			},{
				y: topBottom,
				ease: 'none',
				scrollTrigger : {
					trigger : $this,
					scrub : true
				}
			});
		
		})
	
	}
	
	
	
	// Sub Visual Motion (text apper, bg overlay)
	function sub_visual_motion(){
	
		var $visual = $('.article-visual');
	
		if (!$visual.length) return;
	
		// title motion
		gsap.killTweensOf($visual.find('.article-visual__title'));
	
		gsap.fromTo($visual.find('.article-visual__title'), { 
			y: 20, 
			opacity: 0, 
			rotation: 0.1,
			force3D: true,
		}, { 
			duration: 1.3,
			y: 0, 
			opacity: 1, 
			rotation: 0, 
			delay: .3,
			ease: 'power2.out', 
		});
	
		// bg overlay motion
		gsap.fromTo($visual.find('.article-visual__bg-overlay'), { 
			autoAlpha: 0, 
			rotation: 0.1 
		}, { 
			autoAlpha: 1, 
			rotation: 0,
			scrollTrigger: {
				trigger: $('.article-body'),
				start: "top 100%",
				end: "top 50%",
				scrub : true,
			}
		});
	
		// bg overlay motion
		gsap.fromTo($visual.find('.go-down'), { 
			autoAlpha: 1, 
			rotation: 0.1 
		}, { 
			autoAlpha: 0, 
			rotation: 0,
			scrollTrigger: {
				trigger: $('.article-body'),
				start: "top 100%",
				end: "top 50%",
				scrub : true,
			}
		});
	}
	
	
	
	// Full Visual Height (for device status bar)
	function full_visual_height(){
	
		// height size
		$('.jt-full-h').each(function(){
	
			var $this = $(this);
	
			if(window.screen.height === window.innerHeight){
				win_height = window.screen.height;
			}else{
				win_height = window.innerHeight;
			}
	
			$this.css('height',win_height);
	
		});
	
	}
	
	
	
	// Architecture Vision Motion (add "animate" class)
	function architecture_vision_motion(){
	
		var $diagram = $('.archt-vision__diagram');
		var $diagram_circle = $diagram.find('> li');
		
		if ( !$diagram.length ) return;
	
		ScrollTrigger.create({
			trigger: $diagram,
			start: "top 70%",
			//markers: true,
			onEnter: function(){
				if( !JT.is_screen(540) ) {
					$diagram_circle.addClass('animate');
				}
			},
		});
		
	}
	
	
	
	// Global Motion Setting (text fade, bg zoom)
	function global_motion_setting(){
	
		/*
		 * SIMPLE TEXT MOTION
		 *
		 * example    : class="jt-motion--appear" data-motion-type="fade" data-motion-offset="top 80%" data-motion-duration=".7"
		 */
		var $motion_txt = $('.jt-motion--appear');
	
		$motion_txt.each(function(){
			
			var $this = $(this);
			var offset = $this.attr('data-motion-offset');
			var duration = $this.attr('data-motion-duration');
				
			if( offset == undefined ) { offset = 'top 80%'; }
			
			if( duration == undefined ) { duration = .7; }
	
			gsap.set($this, {opacity: 0, rotation: 0.1});
	
			// trigger
			ScrollTrigger.create({
				trigger: $this,
				start: offset,
				once: true,
				onEnter: function(){
					gsap.to($this, parseFloat(duration), {
						y: 0,
						opacity: 1,
						rotation: 0,
						force3D: true,
						ease: 'power1.out',
					});
				}
			});
		});
	
		/*
		 * BG ZOOM IN ( overflow YES )
		 *
		 * example    : class="jt-motion--zoom" data-motion-offset="top 70%"
		 */
		var $motion_bg = $('.jt-motion--zoom');
	
		$motion_bg.each(function(){
			
			var $this = $(this);
			var offset = $this.attr('data-motion-offset');
	
			if( offset == undefined ) { offset = 'top 70%'; }
	
			ScrollTrigger.create({
				trigger: $this,
				start: offset,
				onEnter: function(){
					$this.addClass('animate');
				},
			});
		})
	
		/*
		 * IMAGE PARALLAX
		 *
		 * example    :
		 */
		var $motion_img = $('.jt-motion-image');
	
		$motion_img.find('[data-scroll]').each(function(){
	
			if( $('html').hasClass('mobile') ) { return; }
	
			var $this = $(this);
			var lerp  = $this.attr('data-scroll-delay');
			var speed = $this.attr('data-scroll-speed');
	
			var dist  = ($this.outerHeight()/100)*(parseFloat(speed)*14);
	
			gsap.fromTo($this, {
				y: dist
			}, {
				y: -(dist),
				ease: 'none',
				force3D: true,
				scrollTrigger: {
					trigger: $this,
					scrub: parseFloat(lerp)
				}
			});
	
		})
	
	}
	
	
	
	// Service Icon Motion (same as identity)
	function service_icon_motion(){
		var $section = $('.service-list');
	
		var tl_safety = new TimelineLite({paused:true, repeat: -1});
		var tl_health = new TimelineLite({paused:true, repeat: -1});
		var tl_convenience = new TimelineLite({paused:true, repeat: -1});
	
		// set(safety)
		gsap.set('.service-list__img--safety', { filter: 'blur(0)'});
	
		// set(health)
		gsap.set('.service-list__img--health', { rotation: -180, transformOrigin:"50% 50%" });
		
		// set(convenience)
		gsap.set('.service-list__img--convenience path.st1',  {drawSVG: "0% 50%"});
		gsap.set('.service-list__img--convenience path.st2', {drawSVG: "50% 100%"});
		gsap.set('.service-list__img--convenience path.st3', {drawSVG: "50% 100%"});
		gsap.set('.service-list__img--convenience path.st4', {drawSVG: "0% 50%"});
		
		// animation(safety)
		tl_safety.to('.service-list__img--safety', {duration: 3.2, filter: 'blur(20rem)', ease: Power1.easeOut });
		tl_safety.to('.service-list__img--safety', {duration: 3.2, filter: 'blur(0rem)', ease: Power1.easeOut });
		
		// animation(health)
		tl_health.to('.service-list__img--health', { duration: 1.6, rotation: 0, ease: Power1.easeOut });
		
		// animation(convenience)
		tl_convenience.fromTo('.service-list__img--convenience path.st1', {drawSVG: "0% 50%"}, {duration: 1.2, drawSVG: "0% 99.9%", ease: Circ.easeOut });
		tl_convenience.fromTo('.service-list__img--convenience path.st2', {drawSVG: "50% 100%"}, {duration: 1.2, drawSVG: "0% 99.9%", ease: Circ.easeOut }, "-=1.2");
		tl_convenience.fromTo('.service-list__img--convenience path.st3', {drawSVG: "50% 100%"}, {duration: 1.2, drawSVG: "0% 99.9%", ease: Circ.easeOut }, "-=1.2");
		tl_convenience.fromTo('.service-list__img--convenience path.st4', {drawSVG: "0% 50%"}, {duration: 1.2, drawSVG: "0% 99.9%", ease: Circ.easeOut }, "-=1.2");
		tl_convenience.fromTo('.service-list__img--convenience path.st1', {drawSVG: "0% 99.9%"}, {duration: .8, drawSVG: "0% 50%", delay: 1.6, ease: Circ.easeOut });
		tl_convenience.fromTo('.service-list__img--convenience path.st2', {drawSVG: "0% 99.9%"}, {duration: .8, drawSVG: "50% 100%", ease: Circ.easeOut }, "-=.8");
		tl_convenience.fromTo('.service-list__img--convenience path.st3', {drawSVG: "0% 99.9%"}, {duration: .8, drawSVG: "50% 100%", ease: Circ.easeOut }, "-=.8");
		tl_convenience.fromTo('.service-list__img--convenience path.st4', {drawSVG: "0% 99.9%"}, {duration: .8, drawSVG: "0% 50%", ease: Circ.easeOut }, "-=.8");
	
		ScrollTrigger.create({
			trigger: $section,
			start: "0% 80%",
			onEnter: function(){
				tl_safety.play();
				tl_health.play();
				tl_convenience.play();
			}
		})
	}
	
	
	
	// Architecture Marquee Clone
	function wave_marquee(){
		
		var $selector = $('.archt-concept__wave');
	
		//Init
		$selector.each(function( idx ){
	
			var $element = $(this);
	
			$element.addClass('wave-marquee');
			
			var $elementItem = $element.find('.archt-concept__wave-inner');
			var containerWidth = $element.width();
			var itemWidth = $elementItem.width();
			var itemLength = Math.ceil(containerWidth/itemWidth) + 1;
	
			// Clone item
			for(var i=0; i<itemLength; i++){
				$elementItem.clone().appendTo($element);
			}
			
			if( ($selector.length-1) == idx ) {
				$selector.removeClass('archt-concept__wave--load');
			}
	
		});
	
	}
	
	
	
	// Carculate Bg Height (landscape)
	function landscape_visual_bg_height(){
	
		var $visual_bg = $('.article-visual__bg');
		var $content = $('.landscape-section--01 .landscape-section__content');
	
		if(window.screen.height === window.innerHeight){
			win_height = window.screen.height;
		}else{
			win_height = window.innerHeight;
		}
		
		$visual_bg.css('height',win_height + $content.outerHeight());
	}
	
	
	
	// barba + history helper
	function pagechange_memory(){
	
		if( $('body').hasClass('page-template-news') ) {
	
			$('#jt-news-list-wrap').off().on('click', '.jt-news-list__link', function(){
				newsListSave = $('#jt-news-list-wrap').clone().end();
				newsListScrollSave = $(window).scrollTop();
			});
	
		}
	
	}
	
	
		
	}); // End jQuery



//BI 팝업
function popup(popConts) {
	var popthis = $(".popup."+popConts);
	popthis.fadeIn(300);

	popthis.find(".pop_close").click(function(){
		popthis.fadeOut(300);
	});
}

var brandStory = {
	init: function() {
		this.s5Hover();
		this.submenuEvent();
	},

	s5Hover: () => {
		$('.section5 > ul > li').each(function(i){
			$('.section5 > ul > li').eq(i).hover(function(){
				$('.section5').find('img').eq(i).css('z-index','1');
			}, function(){
				$('.section5').find('img').eq(i).css('z-index','-1');
			});
		});
	},

	submenuEvent: () => {
        $(document).on('click', '.depth_tab ul li', function(){
            $(this).addClass("on");
			$(this).siblings().removeClass("on");
        });

		
        $(window).on('scroll', function() {
			let st = $(window).scrollTop();
			const subMenu = document.querySelector(".depth_tab");
			const fixMenu = $('.article-visual').outerHeight();
			
			console.log(fixMenu);
			console.log(st);
          

          if(st >= fixMenu) {
            subMenu.classList.add('fixed');
          } else {
            subMenu.classList.remove('fixed');
          }

        });

    },
}

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