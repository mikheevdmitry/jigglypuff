import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('test', (callback) => {
  runSequence(
    'eslint',
    'karma',
    callback
  );
});
