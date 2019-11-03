let pathFromFonts = _.path.source + '/fonts/**/*.*';
let pathToFonts = _.path.dest + '/css/fonts';

module.exports = function(){
  _.gulp.task('fonts', function() {
    return _.gulp.src(pathFromFonts)
        .pipe(_.gulp.dest(pathToFonts));
  });
}