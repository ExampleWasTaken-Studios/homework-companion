const path = require("path");

module.exports = [
  {
    mode: "development",
    devtool: "source-map",
    entry: "./electron/main.ts",
    target: "electron-main",
    resolve: {
      extensions: [".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "babel-loader",
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "./public/electron")
    },
  },
];