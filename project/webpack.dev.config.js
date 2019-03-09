const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
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
  mode: 'development',
  devtool: 'eval-source-map', // 选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // 本地服务器所加载的页面所在的目录
     compress: true,  // 开发服务器是否启动gzip等压缩
     port: 9000,  // 端口号
     publicPath: "/", // 此路径下的打包文件可在浏览器中访问。
     historyApiFallback: true, // 404 的页面会自动跳转到/页面
     inline: true, // 实时刷新
     hot: true,  // 热加载
     host: '127.0.0.1',  // 主机地址
     disableHostCheck: true, // 设置为 true 时，此选项绕过主机检查。不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
     proxy: [{
         context: ['/api'],
         target: '127.0.0.1:9000',
         changeOrigin: true, // 本地就会虚拟一个服务器接收你的请求并代你发送该请求
         secure: false, // 默认情况下，即 true，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。
       }
     ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
  ]
})
