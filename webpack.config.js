/* eslint-disable max-len */
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // чистит папку dist
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production'; // синтаксис можно проверить пакетом webpack (npm i -D cross-env) . Переменная отвечает за то , в каком режим мы собираем проект (prod, dev)
const isDev = !isProd // переменная отвечает за то , в каком режим мы собираем проект (prod, dev)

const jsLoaders = () => {
  const loaders = [
    {
       // используется для конвертирования кода для более старых версий браузера
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-proposal-class-properties"],
      },
    },
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}
const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'],
        alias: { // создания переменной-путь
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        },
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: 8080,
      open: true,
    },
    plugins: [
        new CleanWebpackPlugin(), // чистит папку dist
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
              removeComments: isProd,
              collapseWhitespace: isProd,
            },
        }),
        new CopyPlugin({ // используется для переноса фовикон
              patterns: [{
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist'), // перенос фавикон в папку dist
              }],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [ // описываем лодеры
          {
            test: /\.s[ac]ss$/i, // тест расширения sass и сss
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {},
              },
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: jsLoaders(),
          },
        ],
      },
}
