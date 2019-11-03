'use strict';

global._ = {
  gulp: require('gulp'),
  concat: require('gulp-concat'),
  autoprefixer: require('gulp-autoprefixer'),
  cleanCSS: require('gulp-clean-css'),
  del: require('del'),
  browserSync: require('browser-sync').create(),
  pug: require('gulp-pug'),
  pugInheritance: require('gulp-pug-inheritance'),
  gulpIf: require('gulp-if'),
  sourcemaps: require('gulp-sourcemaps'),
  imagemin: require('gulp-imagemin'),
  svgSprite: require('gulp-svg-sprite'),
  spritesmith: require('gulp.spritesmith'),
  merge: require('merge-stream'),
  svgmin: require('gulp-svgmin'),
  cheerio: require('gulp-cheerio'),
  replace: require('gulp-replace'),
  rename: require("gulp-rename"),
  babel: require('gulp-babel'),
  uglify: require('gulp-uglify-es').default,
  connect: require('gulp-connect-php'),
  cached: require('gulp-cached'),
  remember: require('gulp-remember'),
  sass: require('gulp-sass'),
  smartGrid: require('smart-grid'),
  smartGridConfig: require('./gulp/config/smart-grid-config.js'),

  path: {
    tasks: require('./gulp/config/tasks.js'),
    source: 'src',
    dest: 'public',
    nodepath: './node_modules',
  },

  isDevelopment: true,
}

_.smartGrid(_.path.source + '/scss', _.smartGridConfig());

_.path.tasks.forEach(function(taskPath) {
  require(taskPath)();
})

_.gulp.task('init:build', _.gulp.parallel('js:lib', 'img:build', 'spriteBitmap:build', 'spriteSvg', 'fonts', 'assets'));
_.gulp.task('init:dev', _.gulp.parallel('js:lib', 'img:dev', 'spriteBitmap:dev', 'spriteSvg', 'fonts', 'assets'));

_.gulp.task('build',  _.gulp.series('clean', 'init:build', _.gulp.parallel('scss:build', 'js:build', 'php', 'pug:build')));
_.gulp.task('dev',  _.gulp.series('clean', 'init:dev', _.gulp.parallel('scss:dev', 'js:dev', 'php', 'pug:dev'), 'watch'));
