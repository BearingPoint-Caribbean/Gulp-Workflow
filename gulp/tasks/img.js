import { img as conf } from '../conf';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';
import watch from 'gulp-watch';
import changed from 'gulp-changed';

/**
 * Task: Image optimizer
 */
gulp.task('img', () => {
    return gulp.src(conf.all)
        .pipe(changed(conf.cache))
        .pipe(imagemin({
        	progressive: true,
	        interlaced: true
        }))
        .pipe(gulp.dest(conf.cache))
        .pipe(gulp.dest(conf.dest))
	    .pipe(notify('Images sucessfully optimized!'));
});

/**
 * Task: Image Watch
 */
gulp.task('img-watch', cb => {
    watch(conf.all, () => gulp.start(['img'], cb));
});