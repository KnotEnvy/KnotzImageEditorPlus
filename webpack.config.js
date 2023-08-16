const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development', // or 'production' based on your needs
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to the template HTML file
    }),
  ],
  devServer: {
  static: path.join(__dirname, 'dist'),
  compress: true,
  port: 3000,
},

  module: {
    rules: [
      {
        test: /\.jsx?$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
