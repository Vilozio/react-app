const webpackEnv = {test: true}
const webpackConfig = require('./webpack.config')(webpackEnv)
process.env.BABEL_ENV = 'test'
const testGlob = 'test/**/*.test.js'
const srcGlob = 'src/**/*.js'

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [testGlob],
        preprocessors: {
            // [srcGlob]: ['webpack'],
            [testGlob]: ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {noInfo: true},
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            reporters: [
                {type: 'lcov', dir: 'coverage/', subdir: '.'},
                {type: 'json', dir: 'coverage/', subdir: '.'},
                {type: 'text-summary'}
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    });
}
