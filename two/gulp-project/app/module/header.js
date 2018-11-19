define(["jquery","jquerycookie"],function($){
	function Header(){}
	Header.prototype.nav = function(){
		var username = $.cookie("username");
		if(!username){
			$(".registerbtn").css("display","inline-block");
			$(".loginbtn").css("display","inline-block");
			$(".username").css("display","none");
			$(".loginout").css("display","none");
		}else{
			$(".registerbtn").css("display","none");
			$(".loginbtn").css("display","none");
			$(".username").html(username);
			$(".username").css("display","inline-block");
			$(".loginout").css("display","inline-block");
		}
		$("#itemshow").on("mousemove",function(){
			$("#left").css("display","block");
		});
		$("#itemshow").on("mouseleave",function(){
			$("#left").css("display","none");
		});
		$("#left").on("mouseenter","li",function(){
			$(".listmenu").css("display","block");
		});
		
		$("#left").on("mouseleave","li",function(){
			
			$(".listmenu").css("display","none");
			
		});
		$("#left").on("mouseleave",function(){
			$("#left").css("display","none");
		});
		$(".listmenu").on("mousemove",function(){
			$(".listmenu").css("display","block");
			$("#left").css("display","block");
		});	
		$(".listmenu").on("mouseleave",function(){
			$(".listmenu").css("display","none");
			$("#left").css("display","none");
		});	
		$("#left").on("mousemove",function(){
			$(".listmenu").css("display","block");
			$("#left").css("display","block");
			
		});
		//头部移入狮子
		$(".menuBar").on("mousemove","li",function(){
			$(this).children().last().css("display","block");
		});
		$(".menuBar").on("mouseleave","li",function(){
			$(this).children().last().css("display","none");
		});
		
//		$("#left").on("mouseleave","li",function(){
//			if($(".listmenu").attr("display") == "block"){
//				$("#left").css("display","none");
//			}
//			
//		});
		//退出登录
		$(".loginout").on("click",function(e){
			$.cookie('username',null,{
				expires:-1,  
  				path:'/',
			});
			$.cookie('userid',null,{
				expires:-1,  
  				path:'/',
			});
			location.reload(true);
			e.preventDefault();
		});
		
	}
	Header.prototype.welcome = function(){
		var username = $.cookie("username");
		if(username){
			//已经登录
			//登录注册按钮隐藏，欢迎您,usernmae  显示
			console.log(username);
		}
	}

	return new Header();
})












