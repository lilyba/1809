"use strict";

require.config({
  baseUrl: "/",
  paths: {
    "jquery": "libs/jquery/jquery-1.11.3",
    "bootstrap": "libs/bootstrap/js/bootstrap",
    "tools": "libs/tools",
    "template": "libs/template-web",
    "lunbo": "module/lunbo",
    "jquerycookie": "libs/jquery.cookie",
    "header": "module/header",
    "right": "module/right"
  },
  shim: {
    "bootstrap": {
      deps: ["jquery"]
    }
  }
});