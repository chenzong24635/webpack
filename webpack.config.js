//所有配置

const path = require('path');
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const MyPlugin = require('./myPlugin');

const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const mode = process.env.NODE_ENV
const isProd = mode === 'production'

module.exports = smp.wrap({
  // entry: resolve('./src/index.js'),
  entry: [// 入口文件的配置项
    "@babel/polyfill",
    resolve('./src/main.js'),
  ],
  output: {  // 出口文件的配置
    // filename: 'js/bundle.js', // 输出文件名
    filename: 'js/[name].[hash:8].js',   //添加了hash值, 实现静态资源的长期缓存
    path: resolve('dist'), //输出文件路径，必须是绝对路径
  },
  resolveLoader: {
    // loader路径查找顺序从左往右
    modules: ['node_modules', './']
  },
  module: {
    rules: [
      /* {
        test: /\.js$/,
        use: {
          loader: 'myLoader',
          options: {
            sourceMap: true,
            name: 'aaa'
          }
        }
      }, */
      {
        test: /\.(css|less)$/,
        include: resolve("./src"),
        use: [
          // MiniCssExtractPlugin.loader, // 生产模式使用， 分离css 文件
          // 'style-loader', //开发使用
          // MiniCssExtractPlugin.loader : 'vue-style-loader',
          isProd ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../', //修改css文件引入图片的路径
            }
          } : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader', //注意顺序，必须在less-loader解析后
          // { //或者新建 postcss.config.js 定义
          //   loader:'postcss-loader',
          //   options:{
          //     plugins:[require('autoprefixer')]
          //   }
          // }
          'less-loader',
        ],
      },     
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false, //启用CommonJS模块语法
            name: '[name]_[hash:8].[ext]', //文件名,取hash值前8位，ext自动补全文件扩展名
            outputPath: 'images/', //在output基础上，修改输出图片文件的位置
            // publicPath: '', //修改图片引入的路径
          },
        }],
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
          },
        }],
      },
      {
        test:/\.vue$/, 
        use:['vue-loader'], // 解析.vue文件
      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader', // babel-loader只会将 ES6/7/8语法转换为ES5语法,需配合babel-polyfill
          options:{
            presets:['@babel/preset-env'],
          },
        },
        exclude:/node_modules/,
      },
    ]
  },
  plugins: [
    new MyPlugin({
      name:'My----Plugin'
    }),
    new HtmlWebpackPlugin({ //输出html文件
      title: '标题',
      template: './public/index.html',
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
      inject: 'head',
    }),
    new CleanWebpackPlugin(), // 清理dist文件夹
    new MiniCssExtractPlugin({ // css文件分离
      filename: "css/[name].[hash:8].css",
      chunkFilename: "css/[id].[hash:8].css",
    }),
    /* new OptimizeCssAssetsPlugin({ // css压缩
      assetNameRegExp: /\.css$/g,  //应优化/最小化的资产的名称
      cssProcessor: require("cssnano"), //用于优化\最小化CSS的CSS处理器，默认为cssnano
      cssProcessorOptions: {
        safe: true,
        discardComments: { removeAll: true },
      },
      canPrint: true, // 一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
    }), */
    new webpack.NamedModulesPlugin(), // 在热加载时直接返回更新文件名，而不是文件的id
    new webpack.HotModuleReplacementPlugin(), // 热加载
    new BundleAnalyzerPlugin(), // 可视化依赖体积
    new VueLoaderPlugin(),
    new Dotenv({
      path: resolve(`./.env.${mode}`),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({ // css压缩
        assetNameRegExp: /\.css$/g,  //应优化/最小化的资产的名称
        cssProcessor: require("cssnano"), //用于优化\最小化CSS的CSS处理器，默认为cssnano
        cssProcessorOptions: {
          safe: true,
          discardComments: { removeAll: true },
        },
        canPrint: true, // 一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
      }),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true, // 多进程并行运行可提高构建速度,可设置并发运行次数 (Boolean | Number) 
        cache: true, // 文件缓存
        sourceMap: true,
        // terserOptions: {
        //   compress: {
        //     pure_funcs: ["console.log"] //去除console.log
        //   }
        // }
      }),
    ],
  },
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
    //lodash通过script引入之后，全局中即有了 _ 变量
    lodash: "_",
  },
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  devtool: 'inline-source-map',
  mode   //开发环境development | 生产环境production (默认值) | none
})