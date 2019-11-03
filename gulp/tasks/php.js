let pathFromPHP = _.path.source + '/**/*.php';
let pathToPHP = _.path.dest;

module.exports = function(){
  _.gulp.task('php', () => {
    return _.gulp.src(pathFromPHP)
      .pipe(_.rename((path) => {
        path.dirname = '';
      }))
      .pipe(_.gulp.dest(pathToPHP))
      .pipe(_.browserSync.stream());
  });
}