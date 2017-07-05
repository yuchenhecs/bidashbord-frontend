// Karma configuration
// Generated on Thu Jun 15 2017 09:23:38 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //dependencies
        './bower_components/angular/angular.js',
        './bower_components/angular-mocks/angular-mocks.js',
        './bower_components/angular-ui-router/release/angular-ui-router.js',
        './bower_components/oranj-navigation/navigation.directive.js',
        './bower_components/highcharts/highcharts.js',
        './bower_components/oranj-highcharts/oranjHighcharts.js',
        //module (this should be before your app)

        './src/index.js',
        //app

        './src/app/home/home.controller.js',
        './src/app/home/home.controller.spec.js',
        './src/app/home/home.html',

        './src/app/metrics/metrics.controller.js',
        
        './src/app/goals/goals.controller.js',
        './src/app/goals/goals.controller.spec.js',
        './src/app/goals/goals.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
