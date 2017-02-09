'use strict';

import { clean as config } from '../conf';
import del from 'del';
import gulp from 'gulp';

gulp.task('clean', () => del.sync(config.dest));