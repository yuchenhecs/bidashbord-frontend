const gulp           = require('gulp');
const concat         = require('gulp-concat');
const embedTemplates = require('gulp-angular-embed-templates');
const iife           = require('gulp-iife');
const replace        = require('gulp-replace');
const gulpif         = require('gulp-if');
const insert         = require('gulp-insert');
const conf           = require('../conf/gulp.conf');
let jsSources = ['./src/*.js', './src/app/*.js', './src/app/**/*.js', '!./src/devConfig.js', '!./src/devRun.js'];

const filter = require('gulp-filter');
const path = require('path');


if (conf.excludeRoutes) {
    jsSources.push('!./src/routes.js')
}
if (conf.excludeModuleDependencies) {
    jsSources.push('!./src/index.js')
}
gulp.task('bowerbuild:js', function () {
    return gulp.src(jsSources)
        .pipe(concat('main.js'))
        .pipe(gulpif(conf.excludeModuleDependencies, insert.prepend("angular.module('app', []);")))
        .pipe(embedTemplates({'basePath':'./src'}))
        .pipe(iife())
        .pipe(replace(".module('" + conf.ngModule, ".module('" + conf.ngModule + "." + conf.bowerModule))
        .pipe(replace(".state('" + conf.ngModule, ".state('" + conf.ngModule + "." + conf.bowerModule))
        .pipe(gulp.dest(conf.path.bowerDist()));
});
gulp.task('bowerbuild:css', function () {
    return gulp.src(['./.tmp/index.css'])
        .pipe(concat('main.css'))
        .pipe(gulp.dest(conf.path.bowerDist()));
});
gulp.task('bowerbuild:scss', function () {
    return gulp.src(['./src/app/*.scss', './src/app/**/*.scss'])
        .pipe(concat('main.scss'))
        .pipe(gulp.dest(conf.path.bowerDist()));
});

gulp.task('bowerbuild:other', function () {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,js,html}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.bowerDist));
});




gulp.task('bowerbuild', gulp.series('bowerbuild:js', 'bowerbuild:css', 'bowerbuild:scss', 'bowerbuild:other'));
// const gulp           = require('gulp');
// const concat         = require('gulp-concat');
// const embedTemplates = require('gulp-angular-embed-templates');
// const iife           = require('gulp-iife');
// const replace        = require('gulp-replace');
// const conf           = require('../conf/gulp.conf');
// let jsSources = ['./src/*.js', './src/app/*.js', './src/app/**/*.js', '!./src/devConfig.js', '!./src/devRun.js'];
// if (conf.excludeRoutes) {
//  jsSources.push('!./src/routes.js')
// }
// gulp.task('bowerbuild:js', function () {
//     return gulp.src(jsSources)
//         .pipe(concat('main.js'))
//         .pipe(embedTemplates({'basePath':'./src'}))
//         .pipe(iife())
//         .pipe(replace(".module('" + conf.ngModule, ".module('" + conf.ngModule + "." + conf.bowerModule))
//         .pipe(gulp.dest(conf.path.bowerDist()));
// });
// gulp.task('bowerbuild:css', function () {
//     return gulp.src(['./.tmp/index.css'])
//         .pipe(concat('main.css'))
//         .pipe(gulp.dest(conf.path.bowerDist()));
// });
// gulp.task('bowerbuild:scss', function () {
//     return gulp.src(['./src/app/*.scss', './src/app/**/*.scss'])
//         .pipe(concat('main.scss'))
//         .pipe(gulp.dest(conf.path.bowerDist()));
// });
// gulp.task('bowerbuild', gulp.series('bowerbuild:js', 'bowerbuild:css', 'bowerbuild:scss'));