/* jshint esversion: 6 */
import gulp from 'gulp';

gulp.task('watch', (done) => {
  gulp.watch(['./src/javascript/**/*.js'], gulp.task('js'));
  gulp.watch(['./src/manifest.json'], gulp.task('json'));
  done();
});
