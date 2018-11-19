"use strict";

require(["config"], function () {
  require(["jquery", "template", "lunbo", "right", 'jquerycookie'], function ($, template, lunbo, right) {
    var userId = $.cookie("userid");
    var username = $.cookie("username");
    console.log("lunbo");
    $("#div1").lunbo({
      goPrev: "goPrev",
      goNext: "goNext"
    });
    new Promise(function (resolve, reject) {
      //已登录
      if (!username) {
        $(".registerbtn").css("display", "inline-block");
        $(".loginbtn").css("display", "inline-block");
        $(".username").css("display", "none");
        $(".loginout").css("display", "none");
      } else {
        $("#welcomeuser").html("Hi," + username);
        $(".registerbtn").css("display", "none");
        $(".loginbtn").css("display", "none");
        $(".username").html(username);
        $(".username").css("display", "inline-block");
        $(".loginout").css("display", "inline-block");
      }

      $("footer").load("/html/component/footer.html", function () {});
      $(".rightfix").load("/html/component/right.html", function () {
        right.nav();
      });
      resolve();
    }).then(function () {
      $("#showrightmenu").on("mouseenter", "li", function () {
        $("#listmenu").css("display", "block");
      });
      $("#showrightmenu").on("mouseleave", "li", function () {
        $("#listmenu").css("display", "none");
      });
      $("#listmenu").on("mousemove", function () {
        $("#listmenu").css("display", "block");
      });
      $("#listmenu").on("mouseleave", function () {
        $("#listmenu").css("display", "none");
      }); //退出登录

      $(".loginout").on("click", function (e) {
        $.cookie('username', null, {
          expires: -1,
          path: '/'
        });
        $.cookie('userid', null, {
          expires: -1,
          path: '/'
        });
        location.reload(true); //			window.location.href="/html/login.html";

        e.preventDefault();
      }); //头部移入狮子

      $(".menuBar").on("mousemove", "li", function () {
        $(this).children().last().css("bottom", "0px");
      });
      $(".menuBar").on("mouseleave", "li", function () {
        $(this).children().last().css("bottom", "-8px");
      });
    });
  });
});