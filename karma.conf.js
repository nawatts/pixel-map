/* eslint-env node */
const path = require('path');

module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    files: [
      './test/*.spec.js',
    ],
    frameworks: [
      'chai',
      'mocha',
    ],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
    ],
    preprocessors: {
      './test/*.spec.js': ['webpack', 'sourcemap'],
    },
    reporters: ['spec'],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        root: path.resolve(__dirname),
      },
    },
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
