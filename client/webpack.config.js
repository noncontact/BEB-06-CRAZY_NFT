const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const path = require("path");


const config = ({ isDev }) => ({
  mode: isDev ? "development" : "production",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public"),
    //filename: "[name].[chunkhash].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { targets: { browsers: ["last 2 versions"] } },
              ],
              "@babel/preset-react",
            ],
            // plugins: [
            //   [isDev && "react-refresh/babel"].filter(Boolean),
            // ],
          },
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
      // {
      //   test: /\.html$/,
      //   use: {
      //     loader: "file-loader",
      //   },
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Your custom title",
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify("v0.1.0"),
      "process.env": JSON.stringify(process.env),
    }),
    //new CleanWebpackPlugin(), // 웹팩 실행시마다 dist 폴더 정리
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
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: port, // 개발서버 포트 (기본값: 8080)
    historyApiFallback: true, // 404 응답 시 index.html로 리다이렉트
    //stats: {'errors-only'}, // 메세지 표시 수준 조절 (none, minimal, normal, verbose)
    open: true,
    hot: true,
    client: {
      overlay: false, //웹팩 빌드 에러를 브라우저 상에 출력
    },
  },
});

module.exports = (env, argv) => {
  return config({ isDev: argv.mode === "development" });
};
