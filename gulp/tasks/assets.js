module.exports = function(){
  _.gulp.task('assets', function() {
    let slickFonts =
      _.gulp.src([_.path.nodepath + '/slick-carousel/slick/fonts/**/*'])
        .pipe(_.gulp.dest(_.path.dest + '/css/fonts'));
    let slickAjaxLoader =
      _.gulp.src([_.path.nodepath + '/slick-carousel/slick/ajax-loader.gif'])
        .pipe(_.gulp.dest(_.path.dest + '/css'));
    return _.merge(slickFonts, slickAjaxLoader);
  });
}