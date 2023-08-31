const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    // 出力先のパス（絶対パスを指定する必要がある）
    // __dirnameはこのファイルがあるディレクトリの絶対パス
    //ts.config.jsonのoutDirと同じにする必要がある
    path: path.resolve(__dirname, "dist"),
    //webpack-dev-serverで出力するファイルのパスを指定する必要がある
    publicPath: "/dist",
  },
  //webpack-dev-serverはメモリ上にバンドルしたファイルを出力する
  devServer: {
    port: 8081,
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
      },
      {
        directory: __dirname,
        publicPath: "/",
      },
    ],
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        // ローダーはWebpackがソースコードを解析し、必要な変換や加工を行うための拡張機能
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // import文で.tsファイルを解決するため
  resolve: {
    //例えばimport * as hoge from './hoge'とした場合、
    //hoge.tsを探す
    extensions: [".ts", ".js"],
  },
  devtool: "eval",
  devtool: "inline-source-map",
};
