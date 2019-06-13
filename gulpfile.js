var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();






// Development Tasks
// -----------------
function style(){
  return gulp.src('./scss/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('css'))
      .pipe(browserSync.stream());
}

function watch() {

  gulp.watch('./scss/**/*.scss', style);

}

exports.default = watch;