/* jshint esversion: 6 */
import gulp from 'gulp';

gulp.task('watch', () => {
  gulp.watch('./src/javascript/**/*.{js,jsx}', ['js']);
});
