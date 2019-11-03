let pathToBitmapIcons = _.path.source + '/resources/icons/**/*.{png,jpg,jpeg}';
let pathToSpriteSCSSFile = _.path.source + '/scss';
let pathToSpriteImgFile =  _.path.dest + '/resources/images/';
let nameOfSpriteImgFile = 'sprite.png';
let spriteOffsetPx = 10;

module.exports = function(){
  _.gulp.task('spriteBitmap:dev', function () {
    let spriteData = _.gulp.src(pathToBitmapIcons)
      .pipe(_.spritesmith({
        imgName: nameOfSpriteImgFile,
        imgPath: '../../resources/images/' + nameOfSpriteImgFile,
        cssName: 'bitmap-sprite.scss',
        padding: spriteOffsetPx,
      }));

    let imgStream = spriteData.img
      .pipe(_.gulp.dest(pathToSpriteImgFile));

    let cssStream = spriteData.css
      .pipe(_.gulp.dest(pathToSpriteSCSSFile));

    return _.merge(imgStream, cssStream);
  });

  _.gulp.task('spriteBitmap:build', function () {
    let spriteData = _.gulp.src(pathToBitmapIcons)
      .pipe(_.imagemin([
        _.imagemin.gifsicle({interlaced: true}),
        _.imagemin.jpegtran({progressive: true}),
        _.imagemin.optipng({optimizationLevel: 5}),
      ]))
      .pipe(_.spritesmith({
        imgName: nameOfSpriteImgFile,
        imgPath: '../../resources/images/' + nameOfSpriteImgFile,
        cssName: 'bitmap-sprite.scss',
        padding: spriteOffsetPx,
      }));

    let imgStream = spriteData.img
      .pipe(_.gulp.dest(pathToSpriteImgFile));

    let cssStream = spriteData.css
      .pipe(_.gulp.dest(pathToSpriteSCSSFile));

    return _.merge(imgStream, cssStream);
  });
}