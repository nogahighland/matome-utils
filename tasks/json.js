import gulp from 'gulp';

gulp.task('json', (done) => {
  gulp
    .src('./src/manifest.json')
    .pipe(gulp.dest('./.dest', { overwrite: true }));
  done();
});
