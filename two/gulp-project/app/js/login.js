require(["config"], function() {
	require(["jquery", "template", 'tools', 'jquerycookie'], function($, template) {
		new Promise(function(resolve, reject) {
			$("footer").load("/html/component/footer.html .bottom", function() {
				resolve();
			});
			$("form").submit(function(e) {
				console.log("111");
				var name = $("#name").val();
				var pwd = $("#pwd").val();
			 	if(name.length ==0 || pwd.length ==0 ){
					alert("内容不能为空!");
					return;
				}
				var data = {
					username: $("#name").val(),
					password: $("#pwd").val()
				};
				$.ajax({
					type: "post",
					data: data,
					dataType: "json",
					url: "http://localhost/day02/login/api/v1/login.php",
					success: function(res) {
						if(res.code == 1) {
							alert("登录成功!");
							var userName = res.data[0].name;
							var userId = res.data[0].id;
							$.cookie("username", userName, {
								path: "/"
							});
							$.cookie("userid", userId, {
								path: "/"
							});
							console.log($.cookie("userid"));
							window.location.href = "/index.html";
						} else {
							alert("用户名或密码错误!");
						}
						
					}
				});
				e.preventDefault();
			});
			
		})
	})
})