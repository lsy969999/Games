// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    "lsy-test": './src/pages/lsy-test/index.ts',
    "dev-raising-lovee": './src/pages/dev-raising-lovee/index.ts',
    "raising-lovee": './src/pages/raising-lovee/index.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/pages/lsy-test/index.html',
      filename: 'lsy-test/index.html',
      chunks: ['lsy-test'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/dev-raising-lovee/index.html',
      filename: 'dev-raising-lovee/index.html',
      chunks: ['dev-raising-lovee'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/pages/raising-lovee/index.html',
      filename: 'raising-lovee/index.html',
      chunks: ['raising-lovee'],
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
  },
};