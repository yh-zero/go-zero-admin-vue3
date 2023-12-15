module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    // require('postcss-pxtorem')({
    //   rootValue: 10,
    //   propList: ['*'],
    //   exclude: /node_modules/,
    //   selectorBlackList: ['.van-', '.norem-'], // 排除移动端使用了vant库
    // }),
  ],
};
