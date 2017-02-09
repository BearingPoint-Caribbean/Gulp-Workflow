'use strict';

import { svg as conf } from '../conf';
import gulp from 'gulp';
import notify from 'gulp-notify';
import svgstore from 'gulp-svgstore';
import imagemin from 'gulp-imagemin';
import svg2png from 'gulp-svg2png';
import rename from 'gulp-rename';
import watch from 'gulp-watch';

gulp.task('svgconcat', () => {
	return gulp.src(conf.src)
			.pipe(svgstore())
			.pipe(imagemin([
				imagemin.svgo({
					plugins: [{
						removeTitle: true
					},
					{
						removeDesc: true
					},
					{
						removeUselessDefs: false
					},
					{
						cleanupIDs: false
					}]
				})
			]))
			.pipe(rename('dist.svg'))
			.pipe(gulp.dest(conf.dest))
			.pipe(notify('SVG concatenation succeeded'));
});

gulp.task('svg2png', function () {
	return gulp.src(conf.src)
			.pipe(svg2png())
			.on('error', function(err){ console.log(err.message); this.emit('end');})
			.pipe(rename(function (path) {
				path.basename = `dist.svg.${path.basename}`;
			}))
			.on('error', function(err){ console.log(err.message); this.emit('end');})
			.pipe(gulp.dest(conf.dest))
			.pipe(notify('SVG to PNG conversion succeeded'));
});

/**
 * Task: SVG
 */
gulp.task('svg', ['svgconcat', 'svg2png']);

/**
 * Task: CSS Watch
 */
gulp.task('svg-watch', (cb) => {
    watch(conf.src, () => gulp.start(['svg'], cb));
});