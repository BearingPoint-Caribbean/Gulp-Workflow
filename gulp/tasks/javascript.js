'use strict';

import {env} from '../conf';
import {js as conf} from '../conf';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';
import rollup from 'rollup-stream';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import legacy from 'rollup-plugin-legacy';
import eslint from 'rollup-plugin-eslint';
import conditional from "rollup-plugin-conditional";
import hash from "rollup-plugin-hash";
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';

gulp.task('rollup', () => {
	return rollup({
		entry: conf.src.main,
		format: 'iife',
		plugins: [
			resolve({
				jsnext: true,
				main: true,
				browser: true,
			}),
			legacy(conf.legacy),
			commonjs({
				include: 'node_modules/**',
			}),
			eslint(),
			babel({
				babelrc: false,
				presets: [
					[
						'es2015',
						{
							modules: false
						}
					]
				],
				plugins: [
					'external-helpers'
				]
			}),
			conditional(env.isProduction, [
				uglify(),
				hash({
					dest: 'main.[hash].js'
				})
		    ])
		]
	})
	.on('error', (e) => {
        console.error(`${e.stack}`);
    })
	.pipe(source('main.js', conf.src.base))
	.pipe(buffer())
	.pipe(gulpif(env.isDevelopment, sourcemaps.init({loadMaps: true})))
	.pipe(gulpif(env.isDevelopment, sourcemaps.write('.')))
	.pipe(gulp.dest(conf.dest.main))
	.pipe(gulpif(env.isDevelopment, browserSync.stream()))
	.pipe(notify('JS transpiled succesfully'));
});

/**
 * Task: JS Compile
 */
gulp.task('js', ['rollup']);

/**
 * Task: JS Watch
 */
gulp.task('js-watch', (cb) => {
    gulp.watch([conf.src.main, conf.src.modulesDir], () => gulp.start(['js'], cb));
});

/**
 * Task: JS Lint
 */
// gulp.task('js-lint', () => {
//     const src = [
//         './gulpfile.babel.js',
//         './tasks/**/*.js',
//         config.src.all,
//         config.src.components,
//         `!${config.src.polyfill}`,
//         `!${config.src.vendor}`
//     ];
//
//     return gulp.src(src)
//         .pipe(eslint({ fix: config.eslintAutofix }))
//         .pipe(eslint.format())
//         .pipe(gulpif(isFixed, gulp.dest(file => file.base)))
//         .pipe(eslint.failAfterError());
// });

/**
 * Task: JS unit tests
 * Todo: needs work
 */
// gulp.task('js-test', () => {
//     return gulp.src([config.src.tests])
//         .pipe(mocha());
// });