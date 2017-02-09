'use strict';

import pkg from '../../package.json';
import conf from '../conf';
import gulp from 'gulp';
import swPrecache from 'sw-precache';

gulp.task('generate-service-worker', (callback) => {
	const rootDir = conf.base.root;

	swPrecache.write(`${rootDir}/service-worker.js`, {
		cacheId: pkg.name,
		staticFileGlobs: [
			rootDir + '/assets/build/css/**.css',
			rootDir + '/assets/build/svg/**.svg',
			rootDir + '/assets/images/**.*',
			rootDir + '/assets/build/js/**.js',
			rootDir + '/**.html'
		],
		stripPrefix: rootDir,
		verbose: true
	}, callback);
});

gulp.task('sw', ['generate-service-worker']);