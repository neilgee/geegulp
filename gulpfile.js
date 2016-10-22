var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var pixrem = require('gulp-pixrem');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


var pxtorem = require('gulp-pxtorem');

var pxtoremOptions = {
    replace: false,
	rootValue: 10
};

var postcssOptions = {
    map: true
};



//example
gulp.task('logo', function() {
	gutil.log('Workflows suck');
});

//act on a specific file - this was going the other way - work in rems and it adds px
gulp.task('remy', function(){
	gulp.src('style.css')
		.pipe(pixrem({ rootValue: 10 }))
		.pipe(gulp.dest('newstyle'));
});



//https://github.com/cuth/gulp-pxtorem
//https://github.com/cuth/postcss-pxtorem
gulp.task('rem', function() {
    gulp.src('style.css')
		.pipe(pxtorem(pxtoremOptions, postcssOptions))
        .pipe(gulp.dest('.'));
});

//autoprefix lets see if this works
gulp.task('prefix', function () {
	return gulp.src('style.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('newstyle'));
});


//fire up browserSync
gulp.task('sync', function() {
    browserSync.init({
        proxy: "my_site.dev",
		files: "*.css,*.php,css/*css,lib/*.php",
		xip: true

    });
});

//watching a file
gulp.task('watch', function(){
	gulp.watch('style.css', ['remy']);
});


//compressing the images
gulp.task('compress', () => {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

//the default task - just run gulp - pass in more tasks by adding the task in the array
gulp.task('default',['sync', 'compress']);
