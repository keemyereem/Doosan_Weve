$(function(){
	function nav(){
		if ("matchMedia" in window) {
			if (window.matchMedia("screen and (max-width:1024px)").matches) {
				$("body").addClass("mobile");
				$("body").removeClass("pc");
			}
			else {
				$("body").addClass("pc");
				$("body").removeClass("mobile");
			}
		}
	}
	nav();

	window.addEventListener('resize', function() {
		nav();
	}, true);

	// PC 메뉴
	// $("header, #siteMap").hover(function(){
	// 	$("body").addClass("menuOn");
	// }, function(){
	// 	$("body").removeClass("menuOn");
	// });


	$("#gnb ul, #siteMap").hover(function(){
		$("body").addClass("menuOn");
	}, function(){
		$("body").removeClass("menuOn");
	});


	// $(document).on("mouseover" , ".menuOn header" , function(){
	// 	$("body").addClass("menuOn");
	// });
});
