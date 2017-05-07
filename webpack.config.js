'use strict';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  context: __dirname + '/src',
  entry: {
    app: './app.js',
    vendor: [
      'angular',
      'angular-route',
      'angular-hammer',
      'angular-foundation/mm-foundation-tpls.min',
      'ngstorage/ngStorage.min',
      'ng-resize/dist/ng-resize.min'
    ],
  },
  output: {path: __dirname + '/docs', filename: 'app.js'},
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', query: {presets: ["babel-preset-es2015"]}},
      {test: /\.(css)$/, use: ['style-loader', 'css-loader']},
      {test: /\.json$/, loader: "json-loader"},
      {test: /\.(png|jpg|jpeg|gif)$/, use: ['url-loader?name=images/[name].[ext]']},
      {test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])},
      {test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=fonts/[name].[ext]'},
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: '[name].css', allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    new CopyWebpackPlugin([
      {from: 'index.html', to: '../docs/index.html'},
      {from: 'images/**/*', to: '../docs/'},
    ])
  ],
  devServer: {open: true, contentBase: __dirname + '/src'},
  devtool: "eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";
}

module.exports = config;