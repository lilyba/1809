require(["config"], function() {
	require(["jquery", "template", "header", "jquerycookie"], function($, template, header) {
		var allData;
		new Promise(function(resolve, reject) {
			$("header").load("/html/component/header.html", function() {
				header.nav();
			});
			$("footer").load("/html/component/footer.html", function() {
				//footer的交互代码
			});

			var str = location.search.slice(1);
			var arr = str.split("="); // ["id","3"];
			var obj = {};
			obj[arr[0]] = arr[1];
			
			$.ajax({
				url: "http://localhost/day02/login/api/v1/selectDetail2.php",
				data: obj,
				method: "POST",
				dataType: "json",
				success: function(res) {
					console.log(res);
					allData = res.data[0];
					if(res.code == 1) {
						var str = template("detil-template", {
							data: res.data
						});
						$("#leftcontent").html(str);
						var str = template("detil-template1", {
							data: res.data
						});
						$("#titilecontent").html(str);
						var str = template("detil-template2", {
							data: res.data
						});
						$("#pricecontent").html(str);
						resolve();
					}
				}
			});
			
		}).then(function() {
			$("#add").on("click", function() {
				console.log(1);
				var arr = [];
				var obj = {};
				obj.id = allData.id;
				obj.num = 0;
				//判断list在cookie中是否存在
				var jsonData = $.cookie("list");
				var flag = true; //判断cookie中是否存在

				if(jsonData) {
					arr = JSON.parse(jsonData);
					for(var i = 0; i < arr.length; i++) {
						if(arr[i].id == obj.id) {
							flag = false;
							arr[i].num = parseInt(arr[i].num) + 1;
						}
					}
				}

				if(flag) {
					obj.num = 1;
					arr.push(obj);
				}

				var str = JSON.stringify(arr);
				$.cookie("list", str, {
					path: "/"
				});
				console.log($.cookie("list"));
				var userId = $.cookie("userid");
				console.log(userId);
				//添加数据到购物车表里
				var num = $("#num").val();
				var cartobj = {};
				console.log(allData.id);
				cartobj.goodsId = allData.id;
				cartobj.userId = userId;
				cartobj.goodsname = allData.name;
				cartobj.goodsprice = allData.price;
				cartobj.goodsnum = num;
				cartobj.goodscansu = allData.cansu;
				cartobj.goodsImage = allData.pic;
//				"https://imgservice.suning.cn/uimg1/b2c/image/dDPfy_DSEmikYB9gqFjkog.jpg_800w_800h_4e";
				//	      	goodsId,goodsname,goodsprice,goodsnum,goodscansu,goodsImage
				$.ajax({
					url: "http://localhost/day02/login/api/v1/insertcart.php",
					data: cartobj,
					method: "POST",
					dataType: "json",
					success: function(res) {
						if(res.code == 1) {
							console.log("添加或更新到cart表成功！");
							alert("加入购物车成功!");
						}
					}
				});
			});
			//imgchange 点击小图，大图切换
			$("#leftcontent").on("click",".imgchange",function() {
				var imgsrc = $(this).attr("src");
				$(".bigbigimg").attr("src",imgsrc);
			});
			//放大镜
			var box = $(".top");
			var fdj = $("#fdj");
			var big = $(".big");
			var bigImg = $("#bigImg");
			console.log(box, fdj, big, bigImg);
//			fdj.attr("display", "block");
			box.on("mousemove", function(e) {
				$("#bigImg").attr("src",$(".bigbigimg").attr("src"));
				var _left = e.pageX - box.offset().left - fdj.width() / 2;;
				var _top = e.pageY - box.offset().top - fdj.height() / 2;
				if(_left < 0) _left = 0;
				if(_top < 0) _top = 0;
				if(_left > box.width() - fdj.width()) _left = box.width() - fdj.width();
				if(_top > box.height() - fdj.height()) _top = box.height() - fdj.height();
				//放大镜和大盒子显示
				big.css({
					"display": "block"
				});
				fdj.css("display", "block");
				//				//放大镜的坐标
				fdj.css("left", _left + "px");
				fdj.css("top", _top + "px");
				bigImg.css("left", - 2 * _left + "px");
				bigImg.css("top", - 2 * _top + "px");
			});
			box.on("mouseleave", function() {
				big.css({
					"display": "none"
				});
				fdj.css("display", "none");
			});
			
			//tab页的切换
			
			var tab = $(".tabButtom");
			tab.on("click","li",function(){
				$(this).addClass("ac").siblings().removeClass("ac");
				$(".content .item").eq($(this).index()).show().siblings().hide();
			});

		})
		//页面逻辑
		//点击减号
		$(".buy").on("click", ".jian", function() {
			var num = $(this).next().val();
			if(--num < 2) {
				num = 1;
			}
			$(this).next().val(num);

		});
		//点击减号
		$(".buy").on("click", ".jia", function() {
			$(this).prev().val(parseInt($(this).prev().val()) + 1);

		});

	})
})