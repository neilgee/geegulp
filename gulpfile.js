// Install packages as listed in package.json file by running 'npm i' from working directory
// Updated for Gulp 4 & Node 12
// Ref - https://medium.com/swlh/setting-up-gulp-4-0-2-for-bootstrap-sass-and-browsersync-7917f5f5d2c5


const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sitename = 'shrink'; // set your siteName here
const username = 'neilg'; // set your macOS userName here


  function watch() {
    browserSync.init({

       proxy: sitename +'.test',
        // or if site is https comment out above line and uncomment lines below
      	// proxy: 'https://' + sitename + '.test',
        //       host: sitename + '.test',
        //       open: 'external',
        //       port: 8000,
        //       https: {
        //           key:
        //               '/Users/' + username + '/.config/valet/Certificates/' + sitename + '.test.key',
        //           cert:
        //               '/Users/' + username + '/.config/valet/Certificates/' + sitename + '.test.crt',
        // 	      },	
    });

	// Watched files paths
	gulp.watch('./*.php').on('change',browserSync.reload);
	gulp.watch('./includes-child/*.php').on('change',browserSync.reload);
	gulp.watch('./includes/*.php').on('change',browserSync.reload);
	gulp.watch('./js/*.js').on('change', browserSync.reload);
	gulp.watch('./css/*.css').on('change', browserSync.reload);
	gulp.watch('./*css').on('change', browserSync.reload);
	gulp.watch('./includes-child/woocommerce/*.php').on('change',browserSync.reload);
	gulp.watch('./includes-child/woocommerce/*.css').on('change',browserSync.reload);
}

exports.watch = watch;
