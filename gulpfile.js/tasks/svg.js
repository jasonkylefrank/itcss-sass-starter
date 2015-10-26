'use strict';
// FYI     https://www.npmjs.com/package/svg-to-react

/** ====================================================================================
    ====================================================================================
    SVG TASK FROM G2
    ====================================================================================
    ==================================================================================== */

import gulp from 'gulp';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import inject from 'gulp-inject';
import debug from 'gulp-debug';
import notify from '../util/notify';
import rename from 'gulp-rename';
import cheerio from 'gulp-cheerio';

const fileContents = (filePath, file) => {
    return file.contents.toString();
}

gulp.task('svg', () => {
    let svgs = gulp
        .src( './assets/01-Config/svgs/*.svg')
        .pipe( rename({prefix: 'icon-'}) )
        .pipe( svgstore({ inlineSvg: true }) );

    return gulp
        .src('./assets/index.html')
        .pipe( inject(svgs, { transform: fileContents })).on( 'error', notify.error )
        .pipe( debug({title: 'svg:'}) )
        .pipe( gulp.dest('./public') );
});
