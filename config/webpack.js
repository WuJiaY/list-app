const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: __dirname + "/../src/index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "list-app-build")
  },
  devServer: {
    host: "0.0.0.0",
    port: 3002,
    hot: true,
    inline: true,
    historyApiFallback: true
    // proxy: {
    //   "/test": {
    //     target: "http://localhost:4000",
    //     changeOrigin: true
    //   }
    // }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: "css-loader" }]
      },
      {
        test: /\.scss/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // 这里的options选项参数可以定义多大的图片转换为base64
              name: "[name].[ext]",
              limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
              outputPath: "images" //定义输出的图片文件夹
            }
          },
          {
            //压缩图片要在file-loader之后使用
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.(mp4|ogg|svg|ico)$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css"
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/../index.html",
      favicon: __dirname + "/../favicon.ico",
      hash: true,
      minify: {
        //压缩html
        collapseWhitespace: true, //去除空白
        removeAttributeQuotes: true //去除引号
      }
    })
  ],

  //SplitChunksPlugin插件，使重复依赖和组件避免再次打包
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 2,
      maxInitialRequests: 2,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /\/node_modules\//,
          priority: -10
        },
        "react-vendor": {
          test: (module, chunks) => /react/.test(module.context),
          priority: 1
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
