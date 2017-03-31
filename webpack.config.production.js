// We need to 'use strict' here because this file isn't compiled with babel
'use strict'; // eslint-disable-line strict, lines-around-directive

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./app/config');

const appPath = path.join(__dirname, 'app');
const assetsPath = path.join(__dirname, 'public');
const publicPath = '/';

function getPlugins() {
  return [
    // http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }),

    // https://webpack.github.io/docs/stylesheets.html
    // https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin('[name].min.css'),
  ];
}

function getLoaders() {
  // https://github.com/webpack/css-loader
  const cssLoaderConfig = { loader: 'css-loader',
    options: {
      sourceMap: true,
      modules: true,
      importLoaders: 1,
      localIdentName: config.webpack.localIdentName,
      minimize: true,
    },
  };
  // https://github.com/jtangelder/sass-loader
  const sassLoaderConfig = { loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  };
  // https://github.com/webpack/extract-text-webpack-plugin
  const sassLoaders = ExtractTextPlugin.extract({
    use: [cssLoaderConfig, sassLoaderConfig],
  });

  return [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          // Don't use .babelrc. Use the specified config below with webpack
          babelrc: false,
          // This disables babel's transformation of ES2015 module syntax.
          // Doing so allows us to use Webpack 2's import system instead.
          // https://webpack.js.org/guides/migrating/
          presets: [['env', { modules: false }], 'stage-2', 'react'],
          plugins: ['transform-strict-mode'],
        },
      },
    }, {
      test: /(\.scss)$/,
      exclude: /node_modules/,
      use: sassLoaders,
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'eslint-loader',
    },
  ];
}

function getEntry() {
  const entry = [];

  // https://babeljs.io/docs/usage/polyfill/
  // babel polyfill to support older browsers
  entry.push('babel-polyfill');

  // our client application
  entry.push(path.join(appPath, 'client.js'));

  return entry;
}

function getOutput() {
  return {
    path: assetsPath,
    publicPath,
    filename: '[name].min.js',
  };
}

module.exports = {
  // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  target: 'web',

  // more info: https://webpack.github.io/docs/build-performance.html#sourcemaps
  // more info: https://webpack.github.io/docs/configuration.html#devtool
  // for whatever reason, chrome stopped working for everything except 'source-map'
  devtool: 'source-map',

  resolve: {
    modules: [
      appPath,
      'node_modules',
    ],
  },

  plugins: getPlugins(),

  module: {
    rules: getLoaders(),
  },

  entry: getEntry(),

  output: getOutput(),
};
