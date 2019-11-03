let siteUrl = 'somelie/';
let siteDirectory = 'public/';

module.exports = function(){
  _.gulp.task('watch', () => {
    _.connect.server({}, function (){
      _.browserSync.init({
        proxy: siteUrl,
        //baseDir: siteDirectory,
        //tunnel: true
      });
    });

    _.gulp.watch('src/**/*.scss', _.gulp.series('scss:dev'));
    _.gulp.watch('src/**/*.js', _.gulp.series('js:dev'));
    _.gulp.watch('src/**/*.pug', _.gulp.series('pug:dev'));
    _.gulp.watch('src/resources/images/**/*.pug', _.gulp.series('img:dev'));
    _.gulp.watch('src/**/*.php', _.gulp.series('php'));
    _.gulp.watch('src/resources/images/**/*.{jpg,jpeg,png,gif}', _.gulp.series('img:dev'));
  });
}
