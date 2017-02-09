'use strict';

import { browsersync as config } from '../conf';
import browserSync from 'browser-sync';
import gulp from 'gulp';

/**
 * Task: BrowserSync HTTP server
 */
gulp.task('browsersync', () => {
    browserSync.init(config);
    gulp.watch(['**/*.html', '**/*.css', 'assets/build/js/main.js']).on('change', browserSync.reload);
});
