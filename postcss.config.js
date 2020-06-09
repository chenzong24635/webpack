// https://github.com/postcss/autoprefixer
module.exports = {
  plugins : [
    require('autoprefixer')({
      browsers : ['last 2 versions'], //必须设置支持的浏览器才会自动添加添加浏览器兼容
      grid: 'autoplace' // 启用 grid 前缀
    })
  ]
  // plugins: {
  //   autoprefixer: {
  //     browsers: ['last 2 versions']
  //     // browsers: [' > 0.15% in CN ']
  //   }
  //   // autoprefixer: [
  //   //   "ie >= 8",
  //   //   "ff >= 30",
  //   //   "chrome >= 34"
  //   // ]
  // }
}