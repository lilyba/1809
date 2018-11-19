"use strict";

require(["config"], function () {
  require(["jquery", "template", 'header', 'jquerycookie'], function ($, template, header) {
    //全局变量写在promise外面
    var userId = $.cookie("userid");
    new Promise(function (resolve, reject) {
      $("header").load("/html/component/header.html", function () {
        header.nav();
      });
      $("footer").load("/html/component/footer.html", function () {});
      var obj = {};
      obj.userId = userId;
      var str = "";
      $.ajax({
        data: obj,
        method: "POST",
        dataType: "json",
        url: "http://localhost/day02/login/api/v1/selectcart.php",
        success: function success(res) {
          if (res.code == 1) {
            var data = res.data;

            for (var i = 0; i < data.length; i++) {
              str += "<tr>\n\t\t\t\t\t\t\t<td><input type=\"checkbox\" class=\"checkItem\" name=\"checkItem\" value=\"\"  /></td>\n\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t<img class=\"itemdetail\" src=\"".concat(data[i].goodsImage, "\"/>\n\t\t\t\t\t\t\t\t<span>").concat(data[i].goodsname, "</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td>").concat(data[i].goodscansu, "</td>\n\t\t\t\t\t\t\t<td>\xA5 ").concat(data[i].goodsprice, "</td>\n\t\t\t\t\t\t\t<td><span class=\"jian\">-</span><input type=\"text\" name=\"num\" class=\"num\" readonly=\"readonly\" value=\"").concat(data[i].goodsnum, "\" />\n\t\t\t\t\t\t\t\t\t\t<span class=\"jia\">+</span>\n\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t<td> <span class=\"delete\">\u5220\u9664</span></td>\n\t\t\t\t\t\t\t<td style = \"display:none;\">").concat(data[i].goodsId, " </td>\n\t\t\t\t\t\t\t<td style = \"display:none;\">").concat(data[i].id, " </td>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t</tr>");
            }

            $("#tbody").append(str);
          }

          resolve();
        }
      });
    }).then(function () {
      //累加和
      $("#count").on("click", function () {
        var amount = 0;
        var $tr = $("#tbody").children().filter(function () {
          return $(this).children().first().children().first().is(":checked");
        });
        console.log($tr);

        for (var i = 0; i < $tr.length; i++) {
          var num = parseInt($tr.eq(i).children().eq(4).children().eq(1).val());
          var price = $tr.eq(i).children().eq(3).html();
          price = price.slice(2);
          amount += price * num;
          console.log(amount);
        }

        $("#countprice").html(amount);
        console.log(amount);
      }); //点击数量减

      $("#tbody").on("click", ".jian", function () {
        var num = $(this).next().val();

        if (--num < 2) {
          num = 1;
        }

        console.log(num);

        var _this = $(this); //					$(this).next().val(num);


        var obj = {};
        obj.goodsnum = num;
        obj.id = $(this).parent().siblings().last().html();
        obj.userId = userId;
        console.log(obj);
        $.ajax({
          data: obj,
          method: "POST",
          dataType: "json",
          url: "http://localhost/day02/login/api/v1/updatecart.php",
          success: function success(res) {
            if (res.code == 1) {
              _this.next().val(num);

              console.log("减少数量操作成功");
              $("#count").trigger("click");
            }
          }
        });
      }); //点击数量加

      $("#tbody").on("click", ".jia", function () {
        var num = $(this).prev().val();
        ++num;
        console.log(num);

        var _this = $(this); //					$(this).prev().val(num);


        var obj = {};
        obj.goodsnum = num;
        obj.id = $(this).parent().siblings().last().html();
        obj.userId = userId;
        console.log(obj);
        $.ajax({
          data: obj,
          method: "POST",
          dataType: "json",
          url: "http://localhost/day02/login/api/v1/updatecart.php",
          success: function success(res) {
            if (res.code == 1) {
              _this.prev().val(num);

              console.log("添加数量操作成功");
              $("#count").trigger("click");
            }
          }
        });
      }); //删除购物车中货物

      $("#tbody").on("click", ".delete", function () {
        var obj = {};
        obj.id = $(this).parent().siblings().last().html();

        var _this = $(this);

        $.ajax({
          data: obj,
          method: "POST",
          dataType: "json",
          url: "http://localhost/day02/login/api/v1/deletecart.php",
          success: function success(res) {
            if (res.code == 1) {
              console.log("删除操作成功");

              _this.parent().parent().remove();

              $("#count").trigger("click");
            }
          }
        });
      }); //跳转详情页

      $("#tbody").on("click", ".itemdetail", function () {
        var id = $(this).parent().siblings().last().prev().html();
        window.location.href = "/html/detail.html?id=" + id;
      }); //全选反选

      var n = 0;
      $("#all").on("change", function () {
        var $checkbox = $("#tbody").children().children().children("[name='checkItem']"); //					var $input = $("#tbody").children().each(function(){
        //						 $input1 =  $(this).children().first().children().first();
        //					});

        if ($(this).is(":checked")) {
          $checkbox.prop("checked", true);
          n = $checkbox.length;
        } else {
          $checkbox.prop("checked", false);
          n = 0;
        }

        $("#count").trigger("click");
      }); //checkbox 单个选择

      $("#tbody").on("change", ".checkItem", function () {
        var $checkbox = $("#tbody").children().children().children("[name='checkItem']");
        console.log($checkbox);
        console.log(1);
        $(this).prop("checked") ? n++ : n--;
        console.log(n);

        if (n == $checkbox.length) {
          $("#all").prop("checked", true);
        } else {
          $("#all").prop("checked", false);
        }

        $("#count").trigger("click");
      });
    });
  });
});