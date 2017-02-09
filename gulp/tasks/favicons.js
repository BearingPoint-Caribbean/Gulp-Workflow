import {favicons as conf} from '../conf';
import gulp from 'gulp';
import notify from 'gulp-notify';
import fs from 'fs';
import realFavicon from 'gulp-real-favicon';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('favicons', (done) => {
    realFavicon.generateFavicon({
        masterPicture: conf.src,
        dest: conf.dest,
        iconsPath: conf.dest.substring(1),
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: conf.colors.bg,
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: conf.colors.bg,
                manifest: {
                    name: 'test',
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'blackAndWhite',
                threshold: 75,
                themeColor: conf.colors.fg
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: true
        },
        markupFile: conf.json
    }, () => {
        done();
        notify('Succesfully generated favicons!');
        console.log('Copy paste the following snippet in the <head>:');
        console.log(JSON.parse(fs.readFileSync(conf.json)).favicon.html_code);
    });
});