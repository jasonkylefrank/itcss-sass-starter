'use strict';

/** ====================================================================================
    ====================================================================================
    SASS TASK: HANDLES CORE AND HANDLES EACH FILE IN COMPONENTS INDIVIDUALLY
    ====================================================================================
    ==================================================================================== */

import fs from 'fs';
import path from 'path';
import docs from 'sassdoc';
import gulp from 'gulp';
import sass from 'gulp-sass';
import minify from 'gulp-minify-css';
import maps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import size from 'gulp-size';
import rename from 'gulp-rename';
import notify from '../util/notify';
import debug from 'gulp-debug';
import check from 'gulp-if';
import sync from 'browser-sync';
import gutil from 'gulp-util';
import postcss from 'gulp-postcss';
import foreach from 'gulp-foreach';
import lost from 'lost';
import browserSync from 'browser-sync';

/* =========== SASS TASK BEGINS HERE =============== */

// Setup
const config = {
    sass: { outputStyle: 'compact', errLogToConsole: true },
    production: !!gutil.env.production,
    paths: {
        coreSrc:['./assets/core.scss'],
        coreDest: './public/css',
        components:  ['./assets/06-Components/**.scss', './assets/06-Components/**/**.scss']
    },
    docs: {
        publish: false,
        dest: 'docs', // Folder name
        verbose: true
    },
    processors: [
        autoprefixer({browsers: [  'ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34','safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10']}),
        lost()
    ]
};

const getSassy = (srcPath, destPath) => {
    return gulp.src( srcPath, { base: process.cwd() } )
        .pipe( debug())
        .pipe( config.docs.publish ? docs(config.docs).on('error', notify.error) : gutil.noop() )
        .pipe( maps.init() )
        // This line is blowing up (the notify plugin)...
        //.pipe( sass(config.sass) ).on( 'error', notify.error )

        // TEMP: trying to fix a problem with the notify plugin blowing up
        .pipe( sass({
          style: 'compressed',
          errLogToConsole: false,
          onError: function(err) {
              return notify().write(err);
            }
        }))

        .pipe( maps.write() )
        .pipe( check(['*.css', '!*.map'], postcss(config.processors)) )
        .pipe( size() ) // outputs files size
        .pipe( config.production ? minify() : gutil.noop() )
        .pipe( config.production ? size() : gutil.noop() )
        .pipe( rename( (path) => {
            path.dirname = 'build';
            path.basename = config.production ? path.basename + '.min' : path.basename;
            return path;
        }) )
        .pipe( debug())
        .pipe( gulp.dest(destPath) )
        .pipe( browserSync.stream() );
};


// Task action
gulp.task('sass', () => {
    let core = getSassy(config.paths.coreSrc, config.paths.coreDest);
    gulp.watch(config.paths.coreSrc, ['sass']);
    return Promise.resolve(core).then(() => {
        return gulp.src( config.paths.components, { base: process.cwd() } )
            .pipe( debug())
            .pipe( foreach( (stream, file) => {
                let dest = file.path.split(path.basename(file.path))[0];
                gulp.watch(file.path, (event) => {
                    console.log('File ' + event.path + ' was ' + event.type + ', running sass tasks...');
                    return getSassy(file.path, dest);
                });
                return getSassy(file.path, dest);
            }) );
    }).catch( (err) => {
        console.log(err);
    });
});
