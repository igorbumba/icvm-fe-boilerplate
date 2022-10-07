'use strict';

// region Require
const fs = require('file-system');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const mmq = require('gulp-merge-media-queries');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const iconfont = require('gulp-iconfont');
const jsplugins = require(`./js/src/plugins.js`);
// endregion

// region Paths & filenames
const paths = {
    css: 'css/',
    scss: 'css/src/',
    js: 'js/',
    jssrc: 'js/src/',
    jstemp: 'js/temp/',
    tests: 'tests/',
    icons: 'icons/',
    svgicons: 'icons/svg/',
};

const filenames = {
    css: 'main.css',
    scss: 'main.scss',
    js: 'main.js',
    jses5: 'components.es5.js',
};
// endregion

// region Files
const files = {
    css: paths.css + filenames.css,
    scss: paths.scss + filenames.scss,
    js: paths.js + filenames.js,
    icons: paths.scss + 'settings/_settings.icons.scss',
};
// endregion

// region Tasks

gulp.task('SCSS', () => {
    return gulp
        .src(files.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                overrideBrowserslist: [
                    'last 3 versions',
                    '> 1%',
                    'IE 11',
                    'IE 10',
                ],
                cascade: false,
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css))
        .pipe(
            browserSync.stream({
                match: '**/*.css',
            })
        );
});

gulp.task('CSS', () => {
    return gulp
        .src(files.css)
        .pipe(mmq())
        .pipe(
            cssnano({
                calc: false,
                mergeRules: false,
                convertValues: false,
                minifyGradients: false,
                normalizePositions: false,
                normalizeRepeatStyle: false,
                reduceTransforms: false,
                minifyFontValues: false,
            })
        )
        .pipe(
            rename(path => {
                path.extname = `.min.css`;
            })
        )
        .pipe(gulp.dest(paths.css));
});

gulp.task('minifyCSS', done => {
    return gulp.series('SCSS', 'CSS')(done);
});

gulp.task('babelize', () =>
    gulp
        .src(`${paths.jssrc}components/**/*`)
        .pipe(
            babel({
                presets: ['@babel/env'],
                plugins: ['@babel/plugin-transform-object-assign'],
                compact: false,
            })
        )
        .pipe(concat(filenames.jses5))
        .pipe(gulp.dest(paths.jstemp))
);

gulp.task('buildJS', () => {
    return gulp
        .src([
            ...jsplugins,
            `${paths.jstemp}*.js`,
            `${paths.jssrc}${filenames.js}`,
        ])
        .pipe(concat(filenames.js))
        .pipe(terser())
        .pipe(
            rename(path => {
                path.extname = `.min.js`;
            })
        )
        .pipe(gulp.dest(paths.js));
});

gulp.task('JS', () => {
    return gulp
        .src([
            ...jsplugins,
            `${paths.jssrc}components/**/*`,
            `${paths.jssrc}${filenames.js}`,
        ])
        .pipe(concat(filenames.js))
        .pipe(gulp.dest(paths.js));
});

gulp.task('generateJS', done => {
    return gulp.series('JS', 'babelize', 'buildJS')(done);
});

gulp.task('iconfont', () => {
    return gulp
        .src([`${paths.svgicons}*.svg`])
        .pipe(
            iconfont({
                fontName: 'icons',
                normalize: true,
                fontHeight: 1001,
                prependUnicode: true,
                formats: ['eot', 'svg', 'ttf', 'woff', 'woff2'],
            })
        )
        .on('glyphs', glyphs => {
            let glyphObject = {};
            glyphs.forEach(item => {
                glyphObject[`${item.name}`] = `${item.unicode[0]
                    .charCodeAt(0)
                    .toString(16)
                    .toUpperCase()}`;
            });
            const glyphObjectString = JSON.stringify(glyphObject).replace(
                /[{}]/g,
                ''
            );
            fs.writeFile(
                files.icons,
                `$settings-icons: ( ${glyphObjectString} );`
            );
        })
        .pipe(gulp.dest(paths.icons));
});

gulp.task('generateIcons', done => {
    return gulp.series('iconfont', 'SCSS', 'CSS')(done);
});

gulp.task('build', done => {
    return gulp.series('SCSS', 'CSS', 'JS', 'babelize', 'buildJS')(done);
});

gulp.task('default', () => {
    browserSync.init({
        server: './',
        open: false,
        online: true,
        ghostMode: false,
        startPath: '/tests',
    });

    gulp.watch(`${paths.jssrc}**/*`, gulp.series('JS'));
    gulp.watch(`${paths.scss}**/*`, gulp.series('SCSS'));

    gulp.watch(`${paths.tests}**/*`).on('change', browserSync.reload);
    gulp.watch(`${paths.jssrc}**/*`).on('change', browserSync.reload);
});

// endregion
