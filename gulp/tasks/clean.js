const pathToClean = _.path.dest + '/*';

module.exports = function(){
  _.gulp.task('clean', () => {
    return _.del(pathToClean);
  });
}