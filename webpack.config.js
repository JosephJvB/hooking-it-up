const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, 'client.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dist_bundle.js'
  },
  module: {
    // is there a better way to do these rules?
    rules: [
      // load jsx
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      // maybe I dont need this part...
      // load es6
      // {
      //   test: /\.js?$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, 'index.html')
    })
  ],
  resolve: {
    // extentions: ['.js', '.jsx']
  }
}
