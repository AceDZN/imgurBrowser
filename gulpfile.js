var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var notifier = require('node-notifier');
var server = require('gulp-server-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var cssnano = require('gulp-cssnano');
var rename = require( 'gulp-rename' );

var watch = require('gulp-watch');

var uglify = require('gulp-uglify');

var notify = function(error) {
  var message = 'In: ';
  var title = 'Error: ';

  if(error.description) {
    title += error.description;
  } else if (error.message) {
    title += error.message;
  }

  if(error.filename) {
    var file = error.filename.split('/');
    message += file[file.length-1];
  }

  if(error.lineNumber) {
    message += '\nOn Line: ' + error.lineNumber;
  }

  notifier.notify({title: title, message: message});
};

var bundler = watchify(browserify({
  entries: ['./src/app.jsx'],
  transform: [reactify],
  extensions: ['.jsx'],
  debug: false,
  cache: {},
  packageCache: {},
  fullPaths: false
})
);

function bundle() {
  return bundler
    .bundle()
    .on('error', notify)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./'));
}
bundler.on('update', bundle);

gulp.task('compress', function() {
 return gulp.src('main.js')
   .pipe(uglify().on('error', notify))
   .pipe(rename({suffix:'.min'}))
   .pipe(gulp.dest('./'));
 });
gulp.watch('main.js', ['compress']);

gulp.task('build', function() {
  bundle()
});

gulp.task('serve', function(done) {
  gulp.src('')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function(filePath, cb) {
          if(/main.js/.test(filePath)) {
            cb(true)
          } else if(/style.css/.test(filePath)){
            cb(true)
          }
        }
      },
      open: true
    })
    );
});
gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', notify))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./'))
    .pipe( cssnano() )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( gulp.dest( './' ) );
});

gulp.task('default', ['apply-prod-environment','build', 'serve', 'compress', 'sass','watch']);

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
