'use strict';

import 'babel-polyfill';
import 'babel-register';

import gulp from 'gulp';
import runSequence from 'run-sequence';

// Load tasks
import './gulp/tasks/browsersync';
import './gulp/tasks/clean';
import './gulp/tasks/favicons';
import './gulp/tasks/img';
import './gulp/tasks/javascript';
import './gulp/tasks/sass';
import './gulp/tasks/serviceworker';
import './gulp/tasks/stylelint';
import './gulp/tasks/svg';

gulp.task('dev', (cb) => {
	return runSequence(
		'clean',
		['img', 'svg', 'sass', 'js'],
		['browsersync', 'img-watch', 'svg-watch', 'sass-watch', 'js-watch'],
		cb
	);
});

gulp.task('watch', (cb) => {
	return runSequence(
		'browsersync',
		['img-watch', 'svg-watch', 'sass-watch', 'js-watch'],
		cb
	);
});

gulp.task('dist', (cb) => runSequence(
	'clean',
	['img', 'svg', 'sass', 'js'],
	cb
));

gulp.task('lint', [
	'js-lint',
	'sass-lint'
]);

gulp.task('test', [
	'js-test'
]);