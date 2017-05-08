// 引入gulp模块
// commonjs规范引用模块
var gulp = require('gulp');
var sass = require('gulp-sass'); 


//这里创建gulp任务
//用来编译sass文件
gulp.task('compileSass',function(){
	//先查找sass文件所在的位置
	gulp.src('src/sass/*.scss')

	// 通过pipe 方法导入到 gulp 的插件中实现编译sass
	.pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))

	// 把编译后的文件输出
	.pipe(gulp.dest('src/css'));
});

// 监听文件修改，执行相应任务
gulp.task('jtSass',function(){
	// 监听sass文件，如果有修改，则编译
	gulp.watch('src/sass/*.scss',['compileSass']);
});

// 压缩css
var ysCss = require("gulp-clean-css");
gulp.task("hgCss",function(){
   var opt = {
  advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
  compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
  keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
  keepSpecialComments: '*'
  //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
}

//带参数使用
gulp.src('css/*.css')
 .pipe(concat('hbcss.css')) 
 .pipe(gulp.dest('style/css/')) //输出合并的css
  .pipe(ysCss(opt))
  .pipe(rename({
        suffix:'.min'   //这里需要改名字，不然会覆盖上面的
    }))
  .pipe(gulp.dest('style/css'));//输出合并压缩后文件夹


})




// 用于js文件的压缩
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
gulp.task('compressJS',function(){
	gulp.src('js/*.js')

	// 合并成什么文件名
	.pipe(concat('page.js'))

	// 输出合并后但未压缩的版本
	.pipe(gulp.dest('dist/js/'))

	// 压缩,mangle是否改变变量名，compress是否完全压缩
	.pipe(uglify({
		mangle:false,
		compress:false
	}))

	// 重命名
	.pipe(rename({
		suffix:'.min'
	}))

	// 输出压缩版本带有min后缀的
	.pipe(gulp.dest('dist/js/'))
});

// 同步任务
var browserSync = require('browser-sync');
gulp.task('server',function(){
	browserSync({
		// server: "./src",

		// 代理服务器
		proxy:'http://localhost/h5_1701/',

		// 自定义端口
		port:999,

		// 监听文件修改，自动刷新浏览器
		files:['./src/*.html','./src/css/*.css']
	});

	// 监听sass文件修改，执行编译sass文件
	gulp.watch('src/sass/*.scss',['compileSass']);
});