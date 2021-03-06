const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const javascriptOutputPath = 'dist/javascripts'
const stylesheetsOutputPath = 'dist/stylesheets'

module.exports = {
  context: __dirname, // the project dir
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './app/javascripts/application'
  ],
  devServer: {
    hot: true
  },
  resolve: {
    modules: [
      path.join(__dirname, 'app/javascripts'),
      path.join(__dirname, 'app/stylesheets'),
      path.join(__dirname, 'app/images'),
      path.join(__dirname, 'app/html'),
      'node_modules'
    ],
    extensions: ['.js', '.scss', '.css']
  },

  devtool: 'cheap-eval-source-map',

  output: {
    filename: `${javascriptOutputPath}/application.js`,
    path: path.join(__dirname, '/'),
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                'includePaths[]': path.resolve(__dirname, './assets/stylesheets')
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '/assets/generated/[name].[ext]',
            // publicPath: `${process.env.ASSET_HOST}`,
            limit: 8192
          }
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: '/assets/generated/[name].[ext]',
          // publicPath: `${process.env.ASSET_HOST}`,
          limit: 1000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '/assets/generated/[name].[ext]',
          // publicPath: `${process.env.ASSET_HOST}`
          // outputPath: 'assets/generated/fonts/'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: __dirname,
        loader: 'babel-loader',
        options: {
          plugins: ['lodash'],
          cacheDirectory: true
        }
      }
    ]
  },

  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    new ExtractTextPlugin(`${stylesheetsOutputPath}/[name].css`),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/html/index.html'
    }),
    new DashboardPlugin,
    new webpack.HotModuleReplacementPlugin()
  ],
  stats: {
    children: false // Disable ExtractTextPlugin logs
  }
}
