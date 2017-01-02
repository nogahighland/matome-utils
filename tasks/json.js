import gulp from 'gulp';

gulp.task('json', () => {
  gulp
    .src('./src/manifest.json')
    .pipe(gulp.dest('./.dest', { overwrite: true }));
});
