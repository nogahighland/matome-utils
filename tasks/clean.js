/* jshint esversion: 6 */
import gulp from 'gulp';
import del from 'del';

gulp.task('clean', (done) => {
  del('./.dest');
  done();
});
