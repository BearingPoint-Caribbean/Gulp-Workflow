'use strict';

import env from '../conf';
import {sass as conf} from '../conf';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import watch from 'gulp-watch';
import notify from 'gulp-notify';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

gulp.task('sass', ['sass-lint'], () => {
	return gulp.src([conf.src])
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(autoprefixer(conf.autoprefixer.browsers))
		.pipe(gulpif(env.isDevelopment, sourcemaps.write('./')))
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpif(env.isDevelopment, browserSync.stream()))
		.pipe(notify('Sass sucessfully compiled!'));
});

/**
 * Task: CSS Watch
 */
gulp.task('sass-watch', (cb) => {
	watch([conf.src], () => gulp.start(['sass'], cb));
});

/**
 * Task: CSS Lint
 */
gulp.task('sass-lint', ['stylelint']);