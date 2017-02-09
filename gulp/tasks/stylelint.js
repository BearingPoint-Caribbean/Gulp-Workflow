import {sass as conf} from '../conf';
import gulp from 'gulp';
import stylelint from 'gulp-stylelint';
import cached from 'gulp-cached';

gulp.task('stylelint', () => {
	return gulp
		.src(conf.src)
		.pipe(cached('stylelint'))
		.pipe(stylelint({
			failAfterError: true,
			reporters: [{
				formatter: 'string',
				console: true
			}]
		}));
});