define(["jquery", "jquerycookie"], function($) {
	function Right() {}
	Right.prototype.nav = function() {
		var username = $.cookie("username");
		if(!username) {
			$(".userlogin").css("display", "inline-block");
			$(".username").css("display", "none");
		} else {
			$(".userlogin").css("display", "none");
			$(".username").html(username);
			$(".username").css("display", "inline-block");
		}
		$(".xin").on("click", "img", function() {
			$(this).toggleClass("ac");
			$(".sidebars").toggleClass("display");
		});

		$(".useritem").on("click", function() {
			$(".usersidebar").toggleClass("usersidebarleft");
		});
		$(".cart").on("click", "a", function() {
			$(".cartshow").toggleClass("cartshowdisplay");
		});
		
		$(".cartshow").on("click", "span", function() {
			location.href = "/html/cart.html";
		});
		$(".msg").on("mouseenter", function() {
			$(".msgsidebars").animate({
				"right": "35px"
			}, "slow");
		});
		$(".msg").on("mouseleave", function() {
			//					   $(".msgsidebar").toggleClass("usersidebarleft");
			$(".msgsidebars").animate({
				"right": "-100px"
			}, "slow");
		});

		$(".returntop").on("mouseenter", function() {
			$(".topsidebar").animate({
				"right": "35px"
			}, "slow");
		});

		$(".returntop").on("mouseleave", function() {
			$(".topsidebar").animate({
				"right": "-100px"
			}, "slow");
		});
		$(".topsidebar").on("mousemove", function() {
			$(".topsidebar").css("right", "35px");
		});
		$("#returntop").on("click", function(e) {
			//					var top = document.body.scrollTop;
			console.log($("body").scrollTop());
			var top = $("body").scrollTop();
			var _this = $(this);
			var time = 1000;
			var speed;
			var startTime = +new Date();
			var timer;
			timer = setInterval(function() {
				var date = Math.min(+new Date() - startTime, time);
				speed = -top / time * date + top;
				$("body").scrollTop(speed);
				if(speed <= 0) {
					clearInterval(timer);
				}
			}, 1000 / 60);

		});

	}
	return new Right();
})