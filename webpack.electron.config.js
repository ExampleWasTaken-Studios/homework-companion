const path = require("path");

module.exports = [
  {
    mode: "development",
    entry: "./electron/main.ts",
    target: "electron-main",
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