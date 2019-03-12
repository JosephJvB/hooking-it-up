const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

// want to try these, no luck with CompressionPlugin so far; maybe it's doing the right thing and Im just not aware
// const CompressionPlugin = require('compression-webpack-plugin')
// https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a

module.exports = {
  // stats: 'minimal',
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
      analyzerHost: 'localhost' // default is 127.0.0.1
      // openAnalyzer: false // if I disable this I'll never look at it again haha
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
