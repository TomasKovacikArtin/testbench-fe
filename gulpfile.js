var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var less = require('gulp-less');
var gutil = require('gulp-util');

var scriptsMatcher = ['./app/scripts/**/*.js', './app/libs/ace-builds/src-noconflict/ace.js'];
var lessMatcher = ['./app/less/*.less'];
var cssMatcher = ['./app/css/*.css'];


gulp.task('build', ['inject']);

gulp.task('default', ['inject'], function() {
  watch(scriptsMatcher.concat(lessMatcher), function() {
    gulp.run('inject');
  });
});

gulp.task('inject', ['less'], function () {
  var scripts = gulp.src(scriptsMatcher, {read: false});
  var css = gulp.src(cssMatcher, {read: false});

  gulp.src('./index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', addRootSlash: false}))
    .pipe(inject(scripts, {addRootSlash: false}))
    .pipe(inject(css, {addRootSlash: false}))
    .pipe(gulp.dest('./'));
});

gulp.task('less', function() {
  gulp.src(lessMatcher)
    .pipe(less())
    .on('error', gutil.log)
    .pipe(gulp.dest('./app/css'));
});
