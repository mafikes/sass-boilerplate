"use strict";

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const del = require('del');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const include = require('gulp-include');

gulpSass.compiler = require('node-sass');

// Options
let options = {
    output: '../public',
    outputAssets: '../public/assets',
    outputCssName: 'main.css',
    outputJsName: 'app.js'
};

// Functions
function clean() {
    return del(['!.gitkeep', options.outputAssets + '/**'], {force: true});
}

function sass(output = 'compressed') {
    return gulp.src('sass/main.scss')
        .pipe(plumber())
        .pipe(gulpSass.sync({outputStyle: output}).on('error', gulpSass.logError))
        .pipe(gulp.dest(options.outputAssets + '/css'))
        .pipe(browsersync.stream());
}

function scripts() {
    return gulp.src([
        'js/app.js'
    ])
        .pipe(include())
        .pipe(plumber())
        .pipe(concat(options.outputJsName))
        .pipe(minify({ext: {min: ".js"}, noSource: true, mangle: true, compress: false}))
        .pipe(gulp.dest(options.outputAssets + '/js'));
}

function images() {
    return gulp.src('img/*')
        .pipe(newer(options.output + '/img'))
        .pipe(
            imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(gulp.dest(options.outputAssets + '/img'));
}

function layouts() {
    return gulp.src([
        'layouts/*.html'
    ])
        .pipe(include())
        .pipe(gulp.dest(options.output));
}

function fonts() {
    return gulp.src([
        'fonts/**/**'
    ])
        .pipe(gulp.dest(options.outputAssets + '/fonts'));
}

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: options.output
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    gulp.watch([
        "sass/base/*",
        "sass/components/*",
        "sass/layout/*",
        "sass/pages/*",
        "sass/themes/*",
        "sass/utils/*",
        "sass/vendors/*",
    ], gulp.series(sass, browserSyncReload));
    gulp.watch([
        "layouts/base/*",
        "layouts/content/*",
        "layouts/*",
    ], gulp.series(layouts, browserSyncReload));
    gulp.watch("img/**", gulp.series(images));
    gulp.watch("js/**", gulp.series(scripts));
    gulp.watch("fonts/**", fonts);
}

const js = gulp.series(scripts);
const buildProd = gulp.series(gulp.parallel(clean, layouts, sass, scripts, images, fonts));
const buildDev = gulp.series(gulp.parallel(clean, layouts, sass, scripts, images, fonts)); // todo: sass must build in dev expanded
const watch = gulp.parallel(watchFiles, browserSync);

exports.clean = gulp.series(clean);
exports.sass = sass;
exports.js = js;
exports.prod = buildProd;
exports.dev = buildDev;
exports.watch = watch;
exports.default = buildProd;

