/* jshint esversion: 6 */
import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./tasks', { recurse: true });

gulp.task('default', gulp.series(gulp.parallel('clean', 'js', 'watch', 'json')));
gulp.task('release', gulp.series(gulp.parallel('clean', 'js-prod', 'json')));
