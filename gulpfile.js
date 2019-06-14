var gulp = require('gulp');
var sass = require('gulp-sass');






// Development Tasks
// -----------------
function style(){
  return gulp.src('./scss/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('css'))
}

function watch() {

  gulp.watch('./scss/**/*.scss', style);

}

exports.default = style;