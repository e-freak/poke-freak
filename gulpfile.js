/**
 * gulpfile.js
 * 
 * @author yuki
 */

'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');



const mainSourceDir  = 'src/main/jsx';
const testSourceDir  = 'src/test/jsx';
const mainTargetDir  = 'app/script';
const testTargetDir  = 'cache/test';
const coverageDir    = 'coverage';

gulp.task('compile', () => {
    return gulp.src(
        `${mainSourceDir}/**/*.js`
    ).pipe(
        babel({ stage: 0 })
    ).pipe(
        gulp.dest(mainTargetDir)
    );
});

gulp.task('ready-to-test', () => {
    return gulp.src(
        [ `${mainSourceDir}/**/*.js`, `${testSourceDir}/**/*.js` ]
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
    ).once('error', () => {
        process.exit();
    });
});
