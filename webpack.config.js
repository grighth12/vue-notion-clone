const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // index.html 절대경로
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // node_modules 내부에 변환해줘야할 파일이 있으면 변환, axios는 제외한다는 의미 (?!p1|p2...)
        exclude: /node_modules/, 
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @use "sass:color";
                @use "sass:list";
                @use "sass:map";
                @use "sass:math";
                @use "sass:meta";
                @use "sass:selector";
                @use "sass:string";
                @import "~/scss/_variables";
              `
            }
          }
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }, // to는 생략해도 output 경로로 들어감
      ],
    }),
  ],
  devServer:{
    historyApiFallback: true, // SPA 새로고침시 404 문제 해결
  }
};
