const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = process.env.PORT || 4000;
const path = require("path");
const webpack = require('webpack');

module.exports = {
  // 개발환경
  mode: "development",
  // 애플리케이션 시작 경로
  entry: "./src/index.js",
  // 번들된 파일 경로
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.EnvironmentPlugin({
      REACT_APP_API_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGEyQTlGNTMxMkVDQjM4OGQ0NTdEODkzQjlEZkM4YWI1MWM4ZTQzZjgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzA2MzA1MzA3OSwibmFtZSI6ImltYWdlVGVzdCJ9.xqjlAjrKyRJVOBD-6igpXvL-L-35syf401kWpDlfCrc'
    })
  ],
  resolve: {
    fallback: {
      fs: false,
      net: false,
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
  // 개발 서버 설정
  devServer: {
    host: "localhost",
    port: port,
    open: true,
  },
};
