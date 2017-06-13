const gulp           = require('gulp');
const concat         = require('gulp-concat');
const embedTemplates = require('gulp-angular-embed-templates');
const iife           = require('gulp-iife');
const conf           = require('../conf/gulp.conf');
const replace        = require('gulp-replace');

gulp.task('bowerbuild:js', function () {
    return gulp.src(['./src/*.js', './src/app/*.js,json', './src/app/**/*.js', '!./src/devConfig.js'])
        .pipe(embedTemplates())
        .pipe(concat('main.js'))
        .pipe(iife())
        .pipe(replace(conf.ngModule, conf.bowerModule))
        .pipe(gulp.dest(conf.path.bowerDist()));
});

gulp.task('bowerbuild:scss', function () {
    return gulp.src(['./src/app/*.scss', './src/app/**/*.scss'])
        .pipe(concat('main.scss'))
        .pipe(gulp.dest(conf.path.bowerDist()));
});

gulp.task('bowerbuild', gulp.series('bowerbuild:js', 'bowerbuild:scss'));