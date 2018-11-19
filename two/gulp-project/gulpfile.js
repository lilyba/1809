const gulp = require("gulp");
const miniCss = require("gulp-minify-css");
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const plumber = require('gulp-plumber');
gulp.task("default", () => {
	//执行任务
	console.log("gulp启动");
})
gulp.task("html", () => {
	gulp.src("app/index.html").pipe(plumber()).pipe(gulp.dest("dist")).pipe(connect.reload());
	gulp.src("app/html/**/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload());
})
//编译scss并压缩
gulp.task("css", () => {
	gulp.src("app/scss/**/*.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(miniCss())
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
})
gulp.task("js", () => {
	gulp.src("app/js/**/*.js")
		.pipe(plumber())
		.pipe(babel({
			presets: ['@babel/env']
		}))
//		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
})
gulp.task("module", function(){
	gulp.src("app/module/**/*.js")
		.pipe(plumber())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/module"))
		.pipe(connect.reload());
})
gulp.task("libs", function(){
	gulp.src("app/libs/**/*")
	.pipe(gulp.dest("dist/libs"))
	.pipe(connect.reload());
})
gulp.task("img", () => {
	gulp.src("app/img/**/*")
		.pipe(gulp.dest("dist/img"))
		.pipe(connect.reload());;
})

//制定一个开启服务的任务
gulp.task("server", () => {
	connect.server({
		livereload: true,
		port: 9090,
		root: "dist"
	});
})
gulp.task("watch", () => {
	gulp.watch("app/index.html",["html"]);
	gulp.watch("app/**/*.html", ["html"]);
	gulp.watch("app/css/**/*.scss", ["css"]);
	gulp.watch("app/js/**/*.js", ["js"]);
	gulp.watch("app/module/**/*.js", ["module"]);
	gulp.watch("app/imgages/**/*", ["img"]);

})
gulp.task("default", ["html", "css", "js", "module", "img", "libs", "server", "watch"]);