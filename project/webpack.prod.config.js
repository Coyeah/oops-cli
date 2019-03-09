const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。

module.exports = merge(common, {
  module: {
    rules: [
      {  // MiniCssExtractPlugin 在编译的时候会独立提取，在开发模式中不提供热更新，因此需要区分。
        test: /\.(less|css)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '/'
            }
          },
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              // minimize: true, // 使用 css 的压缩功能 // 该版本的 css-loader 移除了 minimize
              modules: true, // 开启模块化
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
             options: {
               modifyVars: {
                 // "@primary-color": '#888',
               },
               javascriptEnabled: true,
             },
           }
        ]
      },
    ]
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJSPlugin()
    ]
  }
});
