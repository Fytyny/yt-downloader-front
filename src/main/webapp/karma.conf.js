//jshint strict: false
module.exports = function(config) {
    config.set({

        files: [
            '../node_modules/angular/angular.js',
            '../node_modules/angular-mocks/angular-mocks.js',
            '../node_modules/angular-animate/angular-animate.js',
            '../node_modules/angularjs-slider/dist/rzslider.js',
            'app.js',
            'util/**/*.js',
            'controller/**/*.js',
            'factory/FactoryModule.js',
            'factory/SessionFactory.js',
            'factory/DownloadRequestFactory.js',
            'factory/FactoryModule.spec.js'


        ],

        autoWatch: true,

        singleRun: true,

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        plugins: [
            'karma-firefox-launcher',
            'karma-jasmine'
        ]

    });
};