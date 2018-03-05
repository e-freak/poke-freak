/**
 * gulpfile.babel.js
 * 
 * @author yuki
 */

import gulp from 'gulp';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';

import remove from 'del';



const mainSourceDir   = 'src/main/js';
const stubSourceDir   = 'src/stub/js';
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

gulp.task('compile-stub', [ 'compile' ], () => {
    return gulp.src(
        `${stubSourceDir}/**/*.js`
    ).pipe(
        babel()
    ).pipe(
        gulp.dest(mainTargetDir)
    );
});

gulp.task('ready-to-webpack', () => {
    return gulp.src(
        `${externalDir}/**/*.js`
    ).pipe(
        gulp.dest(mainTargetDir)
    );
});

gulp.task('webpack', [ 'ready-to-webpack' ], () => {
    return gulp.src(
        `${loaderSourceDir}/**/*.js`
    ).pipe(
        webpack({
            target: 'node',
            entry: {
                title: `./${mainTargetDir}/loader/title-view-controller-loader.js`,
                game : `./${mainTargetDir}/loader/game-view-controller-loader.js`,
            },
            output: {
                filename: '[name]-view-controller-loader.mix.js',
            },
        })
    ).pipe(
        gulp.dest(loaderTargetDir)
    );
});

gulp.task('ready-to-test', [ 'clean-test' ], () => {
    return gulp.src(
        [ `${mainSourceDir}/**/*.js`, `${testSourceDir}/**/*.js`, `${stubSourceDir}/**/*.js` ]
    ).pipe(
        gulp.dest(testTargetDir)
    );
});

gulp.task('ready-to-coverage', [ 'clean-coverage' ], () => {
    return gulp.src(
        [ `${mainSourceDir}/**/*.js`, `${testSourceDir}/**/*.js`, `${stubSourceDir}/**/*.js` ]
    ).pipe(
        gulp.dest(testTargetDir)
    );
});
