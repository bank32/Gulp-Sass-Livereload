var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var paths = {
  sass: 'scss/**/*'
};

// Connect server
gulp.task('connect', function() {
  connect.server({
    root: '.',
    port: 5555,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(['*.html', './**/*.html'])
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src(['./js/*.js', './js/**/*.js'])
    .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass(({errLogToConsole: true})))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(['*.html', './**/*.html'], ['html']);
  gulp.watch(['./js/*.js', './js/**/*.js'], ['js']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'sass', 'html', 'js', 'connect']);
