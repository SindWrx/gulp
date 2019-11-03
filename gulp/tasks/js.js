let pathFromJs = _.path.source + '/js/**/*.js';
let pathToJs = _.path.dest + '/js';
let pathFromLibs = [
  _.path.nodepath + '/jquery/dist/jquery.min.js',
  _.path.nodepath + '/slick-carousel/slick/slick.min.js',
  ];

module.exports = function(){
  _.gulp.task('js:build', () => {
    return _.gulp.src(pathFromJs)
      .pipe(_.concat('main.min.js'))
      .pipe(_.babel({
        presets: ['@babel/env']
      }))
      .pipe(_.uglify())
      .pipe(_.gulp.dest(pathToJs))
      .pipe(_.browserSync.stream());
  });

  _.gulp.task('js:dev', () => {
    return _.gulp.src(pathFromJs)
      .pipe(_.gulpIf(_.isDevelopment, _.sourcemaps.init()))
      .pipe(_.concat('main.min.js'))
      .pipe(_.gulpIf(_.isDevelopment, _.sourcemaps.write()))
      .pipe(_.gulp.dest(pathToJs))
      .pipe(_.browserSync.stream());
  });

  _.gulp.task('js:lib', () => {
    return _.gulp.src(pathFromLibs)
      .pipe(_.concat('libs.min.js'))
      .pipe(_.babel({
        presets: ['@babel/env']
      }))
      .pipe(_.uglify())
      .pipe(_.gulp.dest(pathToJs))
      .pipe(_.browserSync.stream());
  });
}
