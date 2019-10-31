'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const del = require('del');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const pugInheritance = require('gulp-pug-inheritance');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const	svgmin = require('gulp-svgmin');
const	cheerio = require('gulp-cheerio');
const	replace = require('gulp-replace');
const smartgrid = require('smart-grid');
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const connect = require('gulp-connect-php');


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const dest = './public';

var settings = {
  outputStyle: 'scss', /* less || scss || sass || styl */
  columns: 12, /* number of grid columns */
  offset: '30px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
      maxWidth: '1200px', /* max-width оn very large screen */
      fields: '15px' /* side fields */
  },
  breakPoints: {
      lg: {
        width: '970px',
        fields: '15px' /* set fields only if you want to change container.fields */
      },
      md: {
          width: '768px',
          fields: '15px' /* set fields only if you want to change container.fields */
      },
      xs: {
          width: '425px',
          fields: '15px'
      }
      /* 
      We can create any quantity of break points.
      some_name: {
          width: 'Npx',
          fields: 'N(px|%|rem)',
          offset: 'N(px|%|rem)'
      }
      */
  }
};

smartgrid('./src/scss', settings);

/* Сборки */
gulp.task('styles', () => {
  return gulp.src('./src/**/*.scss')
  .pipe(gulpIf(isDevelopment, sourcemaps.init()))
  .pipe(sass({
    includePaths: require('node-normalize-scss').includePaths
  }).on('error', sass.logError))
  .pipe(concat('main.min.css'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(cleanCSS({compatibility: 'ie8', level: 2}))
  .pipe(gulpIf(isDevelopment, sourcemaps.write()))
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src("./src/js/main.js")
    .pipe(rename("main.min.js"))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

gulp.task('pugs', () => {
  return gulp.src('./src/index.pug', { base: __dirname })
  .pipe(pugInheritance({basedir: './src', skip:'node_modules'}))
  .pipe(pug(
    {pretty: true}
  ))
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream());
});

gulp.task('phps', () => {
  return gulp.src('./src/**/*.php')
    .pipe(rename((path) => {
      path.dirname = '';
    }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src('./src/resources/images/*.*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
  ]))
  .pipe(gulp.dest(dest + '/resources/images'))
  .pipe(browserSync.stream());
});

/* Спрайты */
gulp.task('createSvgSprite', () => {
  return gulp.src('./src/resources/icons/*.svg')
  .pipe(svgmin({
    js2svg: {
      pretty: true
    }
  }))
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: {xmlMode: true}
  }))
  .pipe(replace('&gt;', '>'))
  .pipe(svgSprite({
    mode: {
      symbol: { dest: '.', sprite: './resources/images/sprite.svg', inline: true },
      /* css: {
        dest: '.', prefix: '@mixin %s', sprite: './resources/images/spriteBg.svg', bust: false, dimensions: true,
        render: { scss: { dest: 'sprite.scss' } }
      } */
    }
  }))
  .pipe(gulpIf('*.scss', gulp.dest('./src'), gulp.dest(dest + '/')))
  .pipe(browserSync.stream());
});

gulp.task('createSprite', function () {
  let spriteData = gulp.src('./src/resources/icons/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: './resources/images/sprite.png',
    cssName: 'sprite.scss',
    padding: 5
  }));
  
  let imgStream = spriteData.img
    .pipe(gulp.dest('./public/resources/images'));

  let cssStream = spriteData.css
    .pipe(gulp.dest('./src/scss'));
  
  return merge(imgStream, cssStream);
});


gulp.task('fontawesome', () => {
  return gulp.src('node_modules/@fortawesome/fontawesome-free/sprites/{brands,solid}.svg')
      .pipe(gulp.dest(dest+'/resources/images/'));
});

gulp.task('fonts', () => {
  return gulp.src('./src/fonts/**/*.*')
      .pipe(gulp.dest(dest+'/fonts/'));
});

/* Запуски/Слежения */

gulp.task('watch', () => {
  connect.server({}, function (){
    browserSync.init({
      proxy: 'gulp/',
      tunnel: true
    });
  });

  gulp.watch('./src/**/*.scss', gulp.series('styles'));
  gulp.watch('./src/**/*.js', gulp.series('scripts'));
  gulp.watch('./src/**/*.pug', gulp.series('pugs'));
  gulp.watch('./src/**/*.php', gulp.series('phps'));
});

gulp.task('clean', () => {
  return del([dest + '/*']);
});

gulp.task('build',  gulp.series('clean', 'fontawesome', 'fonts', 'createSvgSprite', gulp.parallel('styles', 'scripts', 'phps', 'images') ));
gulp.task('dev', gulp.series('build', 'watch'));