let pathFromPug = _.path.source + '/**/*.pug';
let pathToPug = _.path.dest;

module.exports = function(){
  _.gulp.task('pug:build', () => {
    return _.gulp.src(pathFromPug, { base: __dirname })
      .pipe(_.pugInheritance({basedir: _.path.source, skip:'node_modules'}))
      .pipe(_.pug())
      .pipe(_.gulp.dest(_.path.dest))
      .pipe(_.browserSync.stream());
  });

  _.gulp.task('pug:dev', () => {
    return _.gulp.src(pathFromPug, { base: __dirname })
      .pipe(_.pugInheritance({basedir: _.path.source, skip:'node_modules'}))
      .pipe(_.pug(
        { pretty: true }
      ))
      .pipe(_.gulp.dest(_.path.dest))
      .pipe(_.browserSync.stream());
  });
}