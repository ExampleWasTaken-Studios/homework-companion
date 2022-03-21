const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.tsx",
    target: "electron-renderer",
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: "html-loader"
          }
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jp(e*)g|gif)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./img"
            }
          }
        },
        {
          test: /\.md$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./resources"
            }
          }
        }
      ]
    },
    devServer: {
      port: 3000,
      historyApiFallback: true
    },
    output: {
      path: path.resolve(__dirname, "./public/renderer"),
      filename: "bundle.js" 
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      })
    ]
  }
]