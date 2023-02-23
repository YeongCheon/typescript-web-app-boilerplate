const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const basePath = __dirname;

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    context: path.join(basePath, "src"),
    entry: {
      index: ["./scripts/index.ts", "./css/index.css"],
      about: ["./scripts/about.ts", "./css/about.css"]
    },
    output: {
      path: path.join(basePath, "dist"),
      // filename: "bundle.js"
    },
    devtool: "source-map",
    devServer: {
      static: "./dist",
      port: 9000, //default port: 8080
    },
    module: {
      rules: [
        {
          test: /\.(ts)$/,
          exclude: /(node_modules)/,
          use: {
            loader: "swc-loader",
          },
        },
        {
          test: /\.html?$/,
          exclude: /(node_modules)/,
          use: {
            loader: "html-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          exclude: /(node_modules)/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
              }
            }
          ],
        },
        {
          test: /\.(png|jpg|gif|svg|webp)$/,
          type: 'asset/resource'
        },
      ],
    },

    // 번들링된 JS 코드를 html 파일과 매핑 및 주입시키기 위한 플러그인 설정.
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html", //Name of file in ./dist/
        template: "index.html", //Name of template in ./src
        chunks: ['index'],
        hash: true
      }),

      new HtmlWebpackPlugin({
        filename: "about.html", //Name of file in ./dist/
        template: "about.html", //Name of template in ./src
        chunks: ['about'],
        hash: true
      }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()])
  };
};
