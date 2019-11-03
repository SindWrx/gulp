let pathFromImages = _.path.source + '/resources/images/**/*.{png,jpg,jpeg,gif}';
let pathToImages = _.path.dest + '/resources/images';

module.exports = function(){
  _.gulp.task('img:dev', function () {
    return _.gulp.src(pathFromImages)
      .pipe(_.gulp.dest(pathToImages))
      .pipe(_.browserSync.stream());
  });

  _.gulp.task('img:build', function () {
    return _.gulp.src(pathFromImages)
      .pipe(_.imagemin([
        _.imagemin.gifsicle({interlaced: true}),
        _.imagemin.jpegtran({progressive: true}),
        _.imagemin.optipng({optimizationLevel: 5}),
      ]))
      .pipe(_.gulp.dest(pathToImages))
  });
}