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
        corejs: 3, // 指定核心库版本
        useBuiltIns: "usage", //按需注入
      },
    ],
  ],
};
