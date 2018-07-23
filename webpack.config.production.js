// We need to 'use strict' here because this file isn't compiled with babel
'use strict'; // eslint-disable-line strict, lines-around-directive

const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const config = require('./app/config');

const appPath = path.join(__dirname, 'app');
const buildPath = path.join(__dirname, 'build');
const assetsPath = path.join(__dirname, 'public');
const publicPath = '/';

function getPlugins() {
  return [
    // https://github.com/lodash/lodash-webpack-plugin
    new LodashModuleReplacementPlugin(),

    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      // write the file to the build path (for server side rendering)
      filename: path.join(buildPath, 'views', 'index.hbs'),
      inject: 'body',
      template: path.join(appPath, 'views', 'index.hbs'),
    }),

    // https://webpack.js.org/plugins/define-plugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].min.css',
      chunkFilename: '[id].[hash].min.css',
    }),
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

  return [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          // Don't use .babelrc. Use the specified config below with webpack
          babelrc: false,
          // { modules: false } disables babel's transformation of ES module syntax.
          // Doing so allows us to use Webpack 2's import system instead.
          // https://webpack.js.org/guides/migrating/
          presets: [['env', { modules: false }], 'stage-2', 'react'],
          plugins: ['transform-strict-mode', 'lodash'],
        },
      },
    }, {
      test: /(\.scss)$/,
      exclude: /node_modules/,
      use: [
        { loader: MiniCssExtractPlugin.loader },
        cssLoaderConfig,
        sassLoaderConfig,
      ],
    },
  ];
}

function getEntry() {
  const entry = [];

  // https://babeljs.io/docs/usage/polyfill/
  // babel polyfill to support older browsers
  entry.push('babel-polyfill');

  // our client application
  entry.push(path.join(appPath, 'config/client.js'));

  return entry;
}

function getOutput() {
  return {
    path: assetsPath,
    publicPath,
    filename: '[name].[hash].min.js',
  };
}

module.exports = {
  mode: 'production',

  target: 'web',

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
