const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.join(__dirname, "src", "index.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    disableHostCheck: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|png|svg|ttf|eot)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: {modules: true}},
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader",
      },
      {
        test: /\.tsx?/,
        loader: "ts-loader",
        options: {
          configFile: path.join(__dirname, "tsconfig.json"),
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "index.html" },
        { from: "index.css" },
      ]
    }),
  ],
};
