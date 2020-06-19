//生产配置

const path = require('path');
function resolve(dir) {
  return path.resolve(__dirname, dir)
}
const Webpack = require('webpack')
const baseConfig = require('./webpack.base.config.js')
const webpackMerge = require('webpack-merge')

const Dotenv = require('dotenv-webpack');

const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 可加入需要的其他文件类型，比如json
// 图片不要压缩，体积会比原来还大
const productionGzipExtensions = ["js", "css"];

const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const mode = process.env.NODE_ENV
const isProd = mode === 'production'

module.exports = webpackMerge(baseConfig,{
  mode: "production",
  devtool:'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
    }), // 清理dist文件夹
    new MiniCssExtractPlugin({ // css文件分离
      filename: "css/[name].[contenthash:8].css",
      // chunkFilename: "css/[id].[hash:8].css",
    }),
    new Webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new CopyWebpackPlugin({ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
      patterns: [
        {
          from: 'public/dll', // 被拷贝文件位置
          to:'dll', // 输出文件的位置
        },
      ],
    }),
    new CompressionWebpackPlugin({ // gzip压缩
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 匹配文件名
      threshold: 10240, // 对超过 10*1024 的数据进行压缩
      minRatio: 0.8, // 压缩比例，值为0 ~ 1
      deleteOriginalAssets: false // 是否删除原文件
    }),
    new OptimizeCssAssetsPlugin({ // css压缩
      assetNameRegExp: /\.css$/g,  //应优化/最小化的资产的名称
      cssProcessor: require("cssnano"), //用于优化\最小化CSS的CSS处理器，默认为cssnano
      cssProcessorOptions: {
        safe: true,
        discardComments: { removeAll: true, },
      },
      canPrint: true, //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
    }),
    new BundleAnalyzerPlugin(), //可视化依赖体积
    new Dotenv({
      path: resolve(`./.env.${mode}`),
    })
    // 清除无用 css
    // new PurifyCSS({
    //   paths: glob.sync([
    //     // 要做 CSS Tree Shaking 的路径文件
    //     resolve('./public/*.html'), // 请注意，我们同样需要对 html ⽂件进⾏ tree shaking
    //     resolve('./src/*.js'),
    //   ]),
    // }),
  ],
  optimization: {
    usedExports: true, // 哪些导出的模块被使用了，再做打包
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true, // 多进程并行运行可提高构建速度,可设置并发运行次数 (Boolean | Number) 
        cache: true, // 文件缓存
        sourceMap: true,
        // terserOptions: {
        //   compress: {
        //     pure_funcs: ["console.log"], // 去除console.log
        //   },
        // },
      }),
    ],
  },
})