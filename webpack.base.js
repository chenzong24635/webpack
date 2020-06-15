//基本配置

const path = require('path');
function resolve(dir) {
  return path.resolve(__dirname, dir)
}
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const HappyPack = require("happypack");
// 创建 happypack 共享进程池，其中包含 6 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

const mode = process.env.NODE_ENV
const isProd = mode === 'production'

module.exports = {
  entry: [// 入口文件的配置项
    "@babel/polyfill",
    resolve('./src/main.js')
  ],
  output: {  // 出口文件的配置
    filename: 'js/[name].[hash:8].js',   //添加了hash值, 实现静态资源的长期缓存
    path: resolve('dist') //输出文件路径配置
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        include: resolve("./src"),
        exclude: /node_modules/,
        use: [
          isProd ? { // 生产模式使用， 分离css 文件
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../', //修改css文件引入图片的路径
            }
          } : 'vue-style-loader', //开发使用
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          'postcss-loader', //注意顺序，必须在less-loader解析后
          'less-loader',
        ]
      },     
      {
        test: /\.(png|jpg|svg|gif)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'file-loader',
            options: {
              esModule: false, //启用CommonJS模块语法
              name: '[name]_[hash:8].[ext]', //文件名,取hash值前8位，ext自动补全文件扩展名
              outputPath: 'images/', //在output基础上，修改输出图片文件的位置
            },
          }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2 * 1024,
          },
        }],
      },
      {
        test:/\.vue$/, 
        exclude: /node_modules/,
        use:['vue-loader'], // 解析.vue文件
      },
      {
        test:/\.js$/,
        exclude: /node_modules/,
        use:{
          loader:'babel-loader', // babel-loader只会将 ES6/7/8语法转换为ES5语法,需配合babel-polyfill
          options:{
            presets:['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({ //输出html文件
      title: '标题',
      template: './public/index.html',
    }),
    new webpack.NamedModulesPlugin(), // 在热加载时直接返回更新文件名，而不是文件的id
    new VueLoaderPlugin(),
  ],
  resolve:{
    //查找第三方依赖, 减少查找过程
    modules: [resolve("./node_modules")],
    //起别名
    alias:{ 
      'vue$':'vue/dist/vue.runtime.esm.js',
      ' @': resolve('./src'),
    },
    extensions:['*','.js','.json','.vue'],
  },
  externals: { // 外部扩展
    "lodash": "_",
    'vue': 'Vue',
  },
}