let pathToSVGIcons = _.path.source + '/resources/icons/**/*.svg';
let putSCSSFile = _.path.source + '/scss/';
let putSVGFile = _.path.dest + '/resources/images/';

module.exports = function(){
  _.gulp.task('spriteSvg', () => {

    let svgSprite = _.gulp.src(pathToSVGIcons)
      .pipe(_.svgmin({
        js2svg: { pretty: true }
      }))
      .pipe(_.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(_.replace('&gt;', '>'))
      .pipe(_.svgSprite({
        mode: {
          symbol: { dest: '.', sprite: 'sprite.svg', inline: true }
        }
      }))
      .pipe(_.replace('id="svg--', 'id="'))
      .pipe(_.gulpIf('*.scss', _.gulp.dest(putSCSSFile), _.gulp.dest(putSVGFile)));

    let fontAwesome = _.gulp.src('node_modules/@fortawesome/fontawesome-free/sprites/{brands,solid}.svg')
      .pipe(_.gulp.dest(_.path.dest + '/resources/images/'));

    return _.merge(svgSprite, fontAwesome)
      .pipe(_.browserSync.stream());
  });
}