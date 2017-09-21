/**
 * gulpfile.babel.js
 * 
 * @author yuki
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import rename from 'gulp-rename';

import remove from 'del';

import browserify from './browserify';



const mainSourceDir   = 'src/main/js';
const testSourceDir   = 'src/test/js';
const externalDir     = 'lib';
const mainTargetDir   = 'build';
const testTargetDir   = 'cache/test';
const loaderSourceDir = `${mainTargetDir}/loader`;
const loaderTargetDir = 'app/script';
const coverageDir     = 'coverage';

gulp.task('clean', [ 'clean-main', 'clean-test', 'clean-coverage' ], () => {
});

gulp.task('clean-main', remove.bind(null,
    [ mainTargetDir, loaderTargetDir ]
));

gulp.task('clean-test', remove.bind(null,
    [ testTargetDir ]
));

gulp.task('clean-coverage', remove.bind(null,
    [ coverageDir ]
));

gulp.task('compile', [ 'clean-main' ], () => {
    return gulp.src(
        `${mainSourceDir}/**/*.js`
    ).pipe(
        babel()
    ).pipe(
        gulp.dest(mainTargetDir)
    );
});

gulp.task('ready-to-browserify', () => {
    return gulp.src(
        `${externalDir}/**/*.js`
    ).pipe(
        gulp.dest(mainTargetDir)
    );
});

gulp.task('browserify', [ 'ready-to-browserify' ], () => {
    return gulp.src(
        `${loaderSourceDir}/**/*.js`
    ).pipe(
        browserify()
    ).pipe(
        rename({
            extname: '.mix.js',
        })
    ).pipe(
        gulp.dest(loaderTargetDir)
    );
});

gulp.task('ready-to-test', [ 'clean-test' ], () => {
    return gulp.src(
        [ `${mainSourceDir}/**/*.js`, `${testSourceDir}/**/*.js`, `${externalDir}/**/*.js` ]
    ).pipe(
        gulp.dest(testTargetDir)
    );
});

gulp.task('unit-test', [ 'ready-to-test' ], () => {
    return gulp.src(
        `${testTargetDir}/*.js`, { read: false }
    ).pipe(
        mocha({
            compilers: 'js:babel-register',
            reporter: 'dot',
        })
    );
});

gulp.task('ready-to-coverage', [ 'clean-coverage' ], () => {
    return gulp.src(
        [ `${mainSourceDir}/**/*.js`, `${testSourceDir}/**/*.js`, `${externalDir}/**/*.js` ]
    ).pipe(
        gulp.dest(testTargetDir)
    );
});
