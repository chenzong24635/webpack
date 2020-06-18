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
const os = require('os'); // 系统操作函数
// 创建 happypack 共享进程池，其中包含 6 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });
// const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length}); // 指定线程池个数

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
          isProd ? { // 生产模式使用， 将所有的css样式合并为一个css文件
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10*1024, //如果文件小于限制的大小。则会返回 base64 编码，否则使用 file-loader 将文件移动到输出的目录中
              esModule: false, //启用CommonJS模块语法
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name]_[hash:8].[ext]', //文件名,取hash值前8位，ext自动补全文件扩展名
                  outputPath: 'images/', //在output基础上，修改输出图片文件的位置
                }
              }
            }
          }
        ],
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
          loader:'babel-loader?cacheDirectory=true', // babel-loader只会将 ES6/7/8语法转换为ES5语法,需配合babel-polyfill
          options:{
            presets:['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({ //输出html文件
      title: '标题000',
      template: './public/index.html',
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
      inject: true,
    }),
    new webpack.NamedModulesPlugin(), // 在热加载时直接返回更新文件名，而不是文件的id
    new webpack.NoEmitOnErrorsPlugin(), // 报错但不退出 webpack 进程
    new VueLoaderPlugin(),
  ],
  resolve:{
    //优化模块查找路径
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