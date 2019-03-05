const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')


module.exports = {
  // stats: 'minimal',
  // mode: process.env.NODE_ENV || 'development',
  mode: 'production',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
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
    }), 
    new BundleAnalyzerPlugin({
      analyzerHost: 'localhost'
      // openAnalyzer: false // if I set this to false I'll never look at it again haha
    }),
    new FriendlyErrorsWebpackPlugin(),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000',
      delay: 500
    })
  ],
  resolve: {
    // extentions: ['.js', '.jsx']
  }
}
