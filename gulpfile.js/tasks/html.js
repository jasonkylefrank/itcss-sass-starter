'use strict';

/** ====================================================================================
    ====================================================================================
    COPY HTML FROM ASSETS TO PUBLIC (AND MINIFIY IF SO DESIRED)
    ====================================================================================
    ==================================================================================== */

import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import watch from 'gulp-watch';
import browserSync from 'browser-sync';
const reload = browserSync.reload;
const config = {
    src: ['./assets/**.html', './assets/**/**.html' ],
    dest: './public'
};

gulp.task('html', () => {
    let html = gulp.src(config.src)
        .pipe( htmlmin({collapseWhitespace: false}) )
        .pipe( gulp.dest(config.dest) );
    return Promise.resolve(html)
    .then(() => {
        return watch(config.src, () => {
            gulp.start('html');
        });
    }).catch((err) => {
        console.log(err);
    });
});
