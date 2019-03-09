const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入 html-webpack-plugin 插件,作用是添加模板到编译完成后的 dist 的文件里面，用于生成 html。
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 用于直接复制公共的文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 引入clean-webpack-plugin插件，作用是清除 dist 文件及下的内容，因为每次编译完成后都会有一个 dist 文件夹存放静态文件，所以需要清除上次的 dist 文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。
var bundleConfig = require("./bundle.config.json")

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom'],
    bundle: path.resolve(__dirname + '/src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',
    publicPath: '/',
  },
  resolve: {
    // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
    // 其他文件可以在编码时指定后缀，如 import('./index.scss')
    extensions: ['.js', '.jsx', '.json', '.less'],
    // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
    mainFiles: ['index'],
    alias: {},
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: { fix: true }
        },
      ]
    }, {
      // antd 按需加载 与 css modules 存在冲突。
      // 解决办法：针对于 node_modules 不设置 css modules
      test: /\.(less|css)$/,
      exclude: /(src)/,
      use: [
        'style-loader',
        'css-loader',
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
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name]-[hash:5].[ext]'
          }
        }, {
          loader: "image-webpack-loader",
          options: {
            mozjpeg: { // 压缩 jpeg 的配置
              progressive: true,
              quality: 65
            },
            optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
              enabled: false,
            },
            pngquant: { // 使用 imagemin-pngquant 压缩 png
              quality: '65-90',
              speed: 4
            },
            gifsicle: { // 压缩 gif 的配置
              interlaced: false,
            },
            webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
              quality: 75
            },
          }
        }
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'oops', // 配置生成的 html 的 title，不会主动替换，需要通过模板引擎语法获取来配置
      filename: 'index.html',
      template:  path.resolve(__dirname, './src/index.ejs'), // 本地模板文件的位置，支持加载器（如 handlebars、ejs、undersore、html 等）
      minify: {  // 用于压缩 html 的配置
        minifyCss: true, // 压缩 html 中出现的 css 代码
        minifyJs: true, // 压缩 html 中出现的 js 代码
      },
      dll: bundleConfig.vendor.js,
    }),
    new CopyWebpackPlugin([{
      from: __dirname + '/public',
    }, {
      from: __dirname + '/dll',
    }]),
    new CleanWebpackPlugin(['./dist'], {
      root:　path.resolve(__dirname, './'), // 绝对路径，就是要根据这个 root 去找要删除的文件夹，默认是这个 webpack 配置文件所在额目录
      verbose: true, // 控制台打印日志
      dry: false, // 为false是删除文件夹的
      watch: true, // 在编译的时候删除打包文件就是在 npm start 或者 npm run dev，等跑本地服务的时候，删除之前的打包文件
      exclude: [], // 排除不删除的目录，主要用于避免删除公用的文件
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: "[name].css",
      // chunkFilename: "[id].css"
    }),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, 'dll', 'manifest.json')),
    }),
    new webpack.DefinePlugin({
      'ENV_MOCK': process.env.MOCK !== 'none'
    }),
  ],
  optimization: { // webpack4 去掉了 CommonsChunkPlugin，取而代之为 optimization.splitChunks 和 optimization.runtimeChunk 这两个配置。
    // 只在 production 模式下开启，否则禁用的相关配置：
    // sideEffects: false, // 通过减少生成代码在性能上有积极的影响；优点：bundle 体积优化，更少生成代码；缺点：算法消耗；
    // minimize: false, // 使用最小化工具来压缩输出的资源包，比如（optimization.minimizer 默认使用的uglify-js）；优点：减小 bundle 体积；缺点：编译速度降低；
    // minimizer: [], // optimization.minimizer 屬性是用來放入各種壓縮 js 程式碼套件，如 TerserWebpackPlugin。而 optimization.minimize 屬性就像是 optimization.minimizer 的開關。
    // 总是开启的相关配置：
    splitChunks: { // 查找在 chunks 之间哪些 module 被共享，同时将他们拆分到独立的 chunks 中，目的是减少重复或者从 application modules 中分离 vendor modules。优点：更少生成代码，更好的缓存，更少的下载请求；缺点：算法消耗，额外的请求；
      automaticNameDelimiter: '~', // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
      chunks: 'all', // 匹配的块的类型：initial(初始块)、async(按需加载的异步块)、all(所有块)
      minSize: 40000, // 分离前的最小文件大小，单位-字节
      cacheGroups: { // 缓存组，存放分离代码块的规则对象。可以继承/覆盖上面 splitChunks 中所有的参数值
        styles: { // 表示将所有 CSS 文件打包为一个
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
        vendors: {
          test: 'vendor',
          name: 'vendor',
          priority: 10, // 优先级。当需要优先匹配缓存组的规则时为正数，当需要优先匹配默认设置时为负数
          enforce: true,
        },
        common: {  // 把所有 node_modules 的模块被不同的 chunk 引入超过 1 次的抽取为 common
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
      },
    }
  }
  // webpack v4 相关新特性，中文学习链接：https://beanlee.github.io/posts/blog-translate-webpack-4-mode-and-optimization/
}
