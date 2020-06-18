module.exports = {
  //语法转换插件 preset-env
  presets: [
    [
      "@babel/preset-env",
      // '@vue/app',
      {
        targets: {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        },
        corejs: 2, //新版本需要指定核心库版本
        useBuiltIns: "usage", //按需注入
      },
    ],
  ],
};
