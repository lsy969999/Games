const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

// 프로젝트 목록
const projects = [
  'lsy-test',
  // 'lit-test',
  // 'dev-raising-lovee',
  // 'raising-lovee' 
];

// 공통 설정
const commonConfig = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            // plugins: [
            //   '@babel/plugin-proposal-optional-chaining',
            //   '@babel/plugin-proposal-class-properties',
            //   ['@babel/plugin-proposal-decorators', { 'decoratorsBeforeExport': true }]
            // ]
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images', // 이미지를 저장할 폴더 경로
            },
          },
        ],
      },
    ],
  },
};

// 개별 프로젝트의 설정
const projectConfigs = projects.map((project) => ({
  entry: {
    [project]: `./src/pages/${project}/index.ts`,
  },
  output: {
    filename: `${project}.bundle.js`,
    path: path.resolve(__dirname, `dist/${project}`),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `src/pages/${project}/index.html`,
      filename: `index.html`,
      chunks: [project],
      inject: true,
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, `dist/${project}`),
    compress: true,
    // port: 9000, // 각각의 프로젝트에 대해 다른 포트를 사용하도록 설정
    hot: true,
    historyApiFallback: true,
  },
}));

// webpack-merge를 사용하여 공통 설정과 개별 프로젝트 설정을 병합
const configs = projectConfigs.map((config) => merge(commonConfig, config));

module.exports = configs;