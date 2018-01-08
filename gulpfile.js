// Install packahes as listed in package.json file by running 'npm i' from working directory
// http://stackoverflow.com/questions/34922749/how-to-install-multiple-gulp-packages-at-once-using-node

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



// Example
gulp.task('logo', function() {
	gutil.log('Workflows suck');
});

// Act on a specific file - this was going the other way - work in rems and it adds px
gulp.task('remy', function(){
	gulp.src('style.css')
		.pipe(pixrem({ rootValue: 10 }))
		.pipe(gulp.dest('newstyle'));
});



// https://github.com/cuth/gulp-pxtorem
// https://github.com/cuth/postcss-pxtorem
gulp.task('rem', function() {
    gulp.src('style.css')
		.pipe(pxtorem(pxtoremOptions, postcssOptions))
        .pipe(gulp.dest('.'));
});

// Autoprefix last 3 versions - override existing stylesheet
gulp.task('prefix', function () {
	return gulp.src('style.css')
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./'));
});


// Fire up browserSync
gulp.task('sync', function() {
    browserSync.init({
        proxy: "my_site.test",
	files: ["./*.css","*.php","css/*css","lib/*.php", "includes/*.php", "includes-child/*.php", "includes-child/woocommerce/*.php", "includes-child/woocommerce/*.css"],
	xip: true

    });

});

// Watching a file
gulp.task('watch', function(){
	gulp.watch('style.css', ['remy']);
});


// Compressing the images
gulp.task('compress', () => {
    return gulp.src('./../../uploads/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./../../uploads/'));

});

// The default task - just run gulp - pass in more tasks by adding the task in the array
gulp.task('default',['sync', 'compress']);
