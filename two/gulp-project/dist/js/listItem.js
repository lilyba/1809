"use strict";

require(["config"], function () {
  require(["jquery", "template", "header", 'tools'], function ($, template, header, tools) {
    var data;
    new Promise(function (resolve, reject) {
      $("header").load("/html/component/header.html", function () {
        header.nav();
      });
      $("footer").load("/html/component/footer.html", function () {});
      $.ajax({
        method: "POST",
        dataType: "json",
        url: "http://localhost/day02/login/api/v1/selectDetail2.php",
        success: function success(res) {
          if (res.code == 1) {
            console.log("success");
          }

          console.log(res);
          data = res.data;
          var html = template("itemList", {
            data: res.data
          });
          $("#detail").append(html);
          resolve();
        }
      });
    }).then(function () {
      $("#detail").on("click", ".link", function (e) {
        var id = $(this).attr("data-index");
        window.location.href = "/html/detail.html?listItemId=" + id;
        e.preventDefault();
      }); //			$("#detail").on("click",".link",function(e){
      //				var id = $(this).attr("data-index");
      //				var obj ={};
      //				console.log(1);
      //				for(var i = 0;i<data.length;i++){
      ////					if(data[i].id == id){
      //						var obj ={};
      //						var datas = data[i];
      //						obj.listItemId = datas.id;
      //						obj.name = datas.name;
      //						obj.description = datas.description;
      //						obj.price = datas.price;
      //						obj.imgItem = datas.imgItem;
      //						obj.detail = datas.detail;
      //						obj.pic = datas.pic;
      //						obj.cansu = datas.cansu;
      //						obj.pinglun = datas.pinglun;
      ////						break;
      ////					}
      //					
      //					$.ajax({
      //						data: obj,
      //						method:"POST",
      //						dataType:"json",
      //						url:"http://localhost/day02/login/api/v1/insertgoods.php",
      //						success: function(res){
      //								if(res.code ==1){
      //									console.log("存储成功!");
      ////									window.location.href = "/html/detail.html?listItemId="+id;
      //								}
      //							}
      //					});
      //					
      //				
      ////				e.preventDefault();
      //			});
    });
  });
});