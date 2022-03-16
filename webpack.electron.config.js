const path = require("path");

const main = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/main/main.ts",
  target: "electron-main",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./public/electron")
  },
  node: {
    global: true
  }
};

module.exports = [main];