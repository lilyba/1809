"use strict";define(["jquery"],function(f){f.fn.extend({lunbo:function(n){var e=f("#"+n.goPrev),i=f("#"+n.goNext),t=(this.find("ul"),this.find("ul li")),c=this.find("ol li"),s=0,l=!1,a=null;c.click(function(){l||(l=!0,f(this).addClass("ac").siblings().removeClass("ac"),t.eq(s).fadeOut(),s=f(this).index(),t.eq(s).fadeIn(function(){l=!1}))}),e.click(function(){l||(l=!0,t.eq(s).fadeOut(),--s<0&&(s=t.length-1),c.eq(s).addClass("ac").siblings().removeClass("ac"),t.eq(s).fadeIn(function(){l=!1}))}),i.click(function(){l||(l=!0,t.eq(s).fadeOut(),++s>=t.length&&(s=0),c.eq(s).addClass("ac").siblings().removeClass("ac"),t.eq(s).fadeIn(function(){l=!1}))}),this.hover(function(){clearInterval(a)},function n(){return a=setInterval(function(){i.trigger("click")},2e3),n}())}})});