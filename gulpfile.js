var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    flatmap = require('gulp-flatmap');

function saas() {
return gulp.src('./css/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css'));
}

function sass_watch() {
  gulp.watch('./css/*.scss', saas);
}

function browser_sync() {
  var files = ['./*.html', './css/*.css', './images/*.{png, jpg, gif}', './js/*.js'];
  browserSync.init(files, {
    server: {
      baseDir: './'
    }
  });
}

function clean() {
  return del('dist');
}

function copyFonts() {
  return gulp.src('./node_modules/open-iconic/font/fonts/*')
  .pipe(gulp.dest('dist/fonts'));
}

function image_min() {
  return gulp.src('./images/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/images'));
}

function use_min() {
  return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file) {
      return stream
        .pipe(usemin({
          css: [ rev() ],
          html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
          js: [ uglify(), rev() ],
          inlinejs: [ uglify() ],
          inlinecss: [ cleanCss(), 'concat' ]
        }))
    }))
    .pipe(gulp.dest('dist/'));
}

exports.default = gulp.parallel(browser_sync, sass_watch);
exports.build = gulp.series(clean, copyFonts, image_min, use_min);