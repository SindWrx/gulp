let pathFromCSS = _.path.source + '/scss/*.scss';
let pathToCSS = _.path.dest + '/css';
let nameCSS = 'main.min.css';

module.exports = function(){
  _.gulp.task('scss:build', () => {
    return _.gulp.src(pathFromCSS)
      .pipe(_.sass({
        includePaths: require('node-normalize-scss').includePaths
      }).on('error', _.sass.logError))
      .pipe(_.concat(nameCSS))
      .pipe(_.autoprefixer({
        cascade: false
      }))
      .pipe(_.cleanCSS({compatibility: 'ie8', level: 2}))
      .pipe(_.gulp.dest(pathToCSS))
      .pipe(_.browserSync.stream());
  });

  _.gulp.task('scss:dev', () => {
    return _.gulp.src(pathFromCSS)
      .pipe(_.gulpIf(_.isDevelopment, _.sourcemaps.init()))
      .pipe(_.sass({
        includePaths: require('node-normalize-scss').includePaths
      }).on('error', _.sass.logError))
      .pipe(_.concat(nameCSS))
      .pipe(_.autoprefixer({
        cascade: false
      }))
      .pipe(_.gulpIf(_.isDevelopment, _.sourcemaps.write()))
      .pipe(_.gulp.dest(pathToCSS))
      .pipe(_.browserSync.stream());
  });
}