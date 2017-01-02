/* jshint esversion: 6 */
import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./tasks', { recurse: true });

gulp.task('default', ['clean', 'js', 'watch', 'json']);
gulp.task('release', ['clean', 'js-prod', 'json']);
