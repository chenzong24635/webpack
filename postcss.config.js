// https://github.com/postcss/autoprefixer
module.exports = {
  plugins : [
    require('autoprefixer')({
      //必须设置支持的浏览器才会自动添加添加浏览器兼容
      overrideBrowserslist : [  
        'last 2 version',
        '> 0.2%',
        'maintained node versions',
        'not dead',
        '> 0.2% in CN'
      ],
      grid: 'autoplace' // 启用 grid 前缀
    })
  ]
  // plugins: {
  //   autoprefixer: {
  //     overrideBrowserslist: ['last 2 versions']
  //   }
  //   // autoprefixer: [
  //   //   "ie >= 8",
  //   //   "ff >= 30",
  //   //   "chrome >= 34"
  //   // ]
  // }
}