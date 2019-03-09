const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dll'),
    library: '_dll_[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '_dll_[name]_[hash]',
      // manifest.json 描述动态链接库包含了哪些内容
      path: path.join(__dirname, 'dll', 'manifest.json')
    }),
    new AssetsPlugin({
      filename: 'bundle.config.json',
      path: __dirname,
    }),
  ],
}
