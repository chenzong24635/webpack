const path = require('path');
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/main.js',  // 入口文件的配置项
  output: {  // 出口文件的配置
    // filename: 'js/bundle.js', // 输出文件名
    filename: 'js/[name].[hash:6].js',   //添加了hash值, 实现静态资源的长期缓存
    path: resolve('dist') //输出文件路径配置
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     // you can specify a publicPath here
          //     // by default it use publicPath in webpackOptions.output
          //     publicPath: '../'
          //   }
          // },
          // MiniCssExtractPlugin.loader,
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              // sourceMap: true
            }
          },
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        // use: ['file-loader']
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:6].[ext]', //文件名,取hash值前6位，ext自动补全文件扩展名
            outputPath: 'images/',   //在output基础上，修改输出图片文件的位置
            publicPath: '../dist/images/'  //修改背景图引入url的路径
          }
        }]
        // use: [{
        //   loader: 'url-loader',
        //   options: {
        //     limit: 2 * 1024, // 小于 limit 的文件都用base64处理
        //   }
        // }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2 * 1024,
          }
        }]
      },
      {
        test:/\.vue$/, 
        use:['vue-loader'] // 解析.vue文件
      },
    ]
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.runtime.esm.js',
      ' @': resolve(__dirname,'./src')
    },
    extensions:['*','.js','.json','.vue']
  },
  plugins: [
    new HtmlWebpackPlugin({ //输出html文件
      title: '标题',
      template: './public/index.html'
    }),
    // new CleanWebpackPlugin(), // 清理dist文件夹
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].[hash:8].css",
    //   chunkFilename: "css/[id].[hash:8].css"
    // }),
    // new webpack.NamedModulesPlugin(), 
    new webpack.HotModuleReplacementPlugin(),
    // new SpeedMeasurePlugin(),
    // new BundleAnalyzerPlugin(), //可视化依赖体积
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    // historyApiFallback: true 
  },
  devtool: 'inline-source-map',
  mode: 'development'   //开发环境development | 生产环境production
}