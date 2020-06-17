//开发配置

const path = require('path');
function resolve(dir) {
  return path.resolve(__dirname, dir)
}
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config.js')
const webpackMerge = require('webpack-merge')


module.exports = webpackMerge(baseConfig,{
  mode: "development",
  devtool:'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
})