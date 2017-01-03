/* jshint esversion: 6 */
import gulp from 'gulp';
import browserify from 'browserify';
import $ from 'gulp-load-plugins';
import babelify from 'babelify';
import through2 from 'through2';

const fileArray = [
  'index.js',
];

gulp.task('js', () => {
  fileArray.forEach((filePath) => buildJs(filePath));
});

gulp.task('js-prod', () => {
  fileArray.forEach((filePath) => buildJs(filePath, true));
});

function buildJs(filePath, uglify) {
  let transformed = transform(filePath);
  if (uglify) {
    transformed = transformed.pipe($().uglify());
  }
  transformed
    .pipe($().rename((path) => {
      path.extname = '.min.js';
    }))
    .pipe(gulp.dest('./.dest/'));
}

function transform(filePath) {
  return gulp.src(`./src/javascript/${filePath}`, { base: '' })
    .pipe($().plumber({ errorHandler: $().notify.onError('<%= error.message %>') }))
    .pipe(through2.obj(through2Cb));
}

function through2Cb(file, encode, callback) {
  browserify(file.path, { debug: false })
    .transform(babelify, { presets: [['es2015']] })
    .bundle((error, response) => {
      if (error) { return callback(error); }
      file.contents = response;
      callback(null, file);
    }
  );
}
