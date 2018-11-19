require(["config"], function() {
	require(["jquery", "template", 'tools', 'jquerycookie'], function($, template) {
		new Promise(function(resolve, reject) {
			$("footer").load("/html/component/footer.html", function() {
				//footer的交互代码
			});
			var flag ;
			console.log("111");
			$("#tel").on("blur", function() {
				console.log(22);
				var reg = /^1\d{10}$/;
				if(!reg.test($(this).val())) {
					$(this).parent().css("border", "1px solid red");
					flag = false;
				}else{
					flag = true;
				}
			});
			
			$("form :input.require").each(function(){
				console.log($(this));
				var $required = $("<span class='high'>*</span>");
				$(this).parent().append($required);
			});
			$("form :input").blur(function(){
				var $parent = $(this).parent();
				$parent.find(".msg").remove();
				if($(this).is("#name")){
					var name = $.trim(this.value);
					console.log(name);
					if(name =="" || name.length < 6 ){
						var errorMsg = "名字非空，长度4位以上";
						$parent.append("<span class='msg onError'>"+errorMsg +"</span>");
						flag = false;
					} else{
	                    var okMsg=" 输入正确";
	                    $parent.find(".high").remove();
	                    $parent.append("<span class='msg onSuccess'>" + okMsg + "</span>");
					flag = true;
	                    
	                }
				}
				if($(this).is("#email")){
					var emailVal = $.trim(this.value);
					console.log(emailVal);
					var regEmail =/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
					if(emailVal =="" || (emailVal!="" && regEmail.test(emailVal))){
						var errorMsg = "请输入正确的email";
						$parent.append("<span class='msg onError'>" + errorMsg + "</span>");
						flag = false;
					} else{
	                    var okMsg=" 输入正确";
	                    $parent.find(".high").remove();
	                    $parent.append("<span class='msg onSuccess'>" + okMsg + "</span>");
					flag = true;
	                    
	                }
				}
			});
			
			$("form").submit(function(e) {
				var name = $("#name").val();
				var pwd = $("#pwd").val();
				var tel = $("#tel").val();
				if(name.length == 0 || pwd.length == 0 || tel.length == 0) {
					alert("内容不能为空!");
					flag = false;
				}
				if(!$("#checkbox").prop("checked")) {
					alert("请勾选选框!");
					flag = false;
				}
				var data = {
					username: $("#name").val(),
					password: $("#pwd").val(),
					tel: $("#tel").val()
				};
				if(flag){
					$.ajax({
						type: "post",
						data: data,
						dataType: "json",
						url: "http://localhost/day02/login/api/v1/suningregister.php",
						success: function(res) {
							if(res.code == 1) {
								alert("注册成功,请登录!");
								window.location.href = "/html/login.html";
							} else if(res.code == 2) {
								alert("号码已注册,请登录!");
								window.location.href = "/html/login.html";
							} else {
								alert("注册失败!请重新注册.");
							}
	
						}
					});
				}
				
				e.preventDefault();
			});
			resolve();
		}).then(function() {
			
			
		})
	})
})