module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 모든 .js 파일에 적용
        exclude: /node_modules/, // node_modules 폴더는 제외
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
