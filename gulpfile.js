// Include gulp
var gulp = require('gulp'); 
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');

var paths = {
  scripts: [ 
    './app/**/*.js', 
    '!./app/bower_components/**/*.js' 
  ],
  html: [
    './app/**/*.html',
    '!./app/index.html',
    '!./app/bower_components/**/*.html'
  ],
  index: './app/index.html',
  build: './build/'
}
/* 1 */
gulp.task('clean', function(){
  gulp.src( paths.build, { read: false } )
    .pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
    gulp.src(['./app/assets/img/**/*'])
        .pipe(gulp.dest('build/img/'));
    
    gulp.src(['./app/bower_components/**/*.js'])
        .pipe(gulp.dest('build/bower_components/'));
    
    gulp.src(paths.html)
        .pipe(gulp.dest('build/'));
});

gulp.task('usemin', [ 'copy' ], function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
//      js: [],
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( paths.build ))
});

gulp.task('build', ['usemin']);

// connect
gulp.task('connect', function() {
  connect.server({
    root: 'app/',
    port: 8080
  });
});

gulp.task('connect-build', function() {
  connect.server({
    root: 'build/',
    port: 8000
  });
});


gulp.task('default', ['connect']);
