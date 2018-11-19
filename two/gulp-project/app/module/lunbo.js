define(["jquery"], function($) {

	$.fn.extend({
		lunbo: function(obj) {

			var goPrev = $("#" + obj.goPrev);
			var goNext = $("#" + obj.goNext);

			var $ul = this.find("ul"),
				$imgs = this.find("ul li"),
				$btns = this.find("ol li");

			var index = 0,
				flag = false,
				timer = null;
			$btns.click(function() {
				if(!flag) {
					flag = true;
					$(this).addClass("ac").siblings().removeClass("ac");
					$imgs.eq(index).fadeOut();
					index = $(this).index();
					$imgs.eq(index).fadeIn(function() {
						flag = false;
					})
				}
			})

			goPrev.click(function() {
				if(!flag) {
					flag = true;
					$imgs.eq(index).fadeOut();
					if(--index < 0) {
						index = $imgs.length - 1;
					}
					$btns.eq(index).addClass("ac").siblings().removeClass("ac");
					$imgs.eq(index).fadeIn(function() {
						flag = false;
					});
				}

			})

			goNext.click(function() {
				if(!flag) {
					flag = true;
					$imgs.eq(index).fadeOut();
					if(++index >= $imgs.length) {
						index = 0;
					}
					$btns.eq(index).addClass("ac").siblings().removeClass("ac");
					$imgs.eq(index).fadeIn(function() {
						flag = false;
					});
				}
			})
			this.hover(function() {
				clearInterval(timer);
			}, (function autoPlay() {
				timer = setInterval(function() {
					goNext.trigger("click");
				}, 2000);
				return autoPlay;
			})());

		}
	})

})