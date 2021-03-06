var webpack = require('webpack')
var path = require('path')
var buildPath = path.resolve(__dirname, '')
var sourcePath = path.resolve(__dirname, 'src')
var nodeModulesPath = path.resolve(__dirname, 'node_modules')
var upupPath = path.resolve(__dirname, 'src/app/scripts/upup/')
var upupStartPath = path.resolve(__dirname, 'src/app/scripts/upup/upup.start.js')
var offlinePath = path.resolve(__dirname, 'src/app/scripts/offline.min.js')
var redirectToHTTPPath = path.resolve(__dirname, 'src/app/scripts/redirectToHTTP.js')
var TransferWebpackPlugin = require('transfer-webpack-plugin')

const production = process.argv.find((element) => element === '--production') ? true : false

const jsBaseEntry = [
  'babel-polyfill',
  './src/app/app.jsx',
  './src/app/scripts/redirectToHTTP.js',
  './src/app/scripts/offline.min.js',
]

const jsEntry = production ? jsBaseEntry.concat([
  // './src/app/scripts/upup/upup.start.js',
  // './src/app/scripts/upup/upup.min.js',
  // './src/app/scripts/upup/upup.sw.min.js',
  // './src/app/scripts/offline.min.js',
]) : jsBaseEntry

var config = {
  entry: {
    js: jsEntry,
    html: './src/www/index.html',
  },
  devServer:{
    contentBase: 'src/www',
    devtool: 'source-map',
    hot: true,
    inline: true,
    port: 3000,
  },
  output: {
    path: buildPath,
    filename: 'scripts/boundle.min.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'www'},
    ], sourcePath),
    new webpack.DefinePlugin({
        PRODUCTION: production,
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath, upupPath, redirectToHTTPPath, offlinePath],
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [nodeModulesPath, upupPath, redirectToHTTPPath, offlinePath],
        loaders: [
            'react-hot',
            'babel?' + JSON.stringify({
              plugins: ['transform-decorators-legacy' ],
              presets: ["react", "es2015", "stage-1"],
            }),
        ],
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /(offline.*|redirectToHTTP).js$/,
        loader: "file?name=scripts/[name].[ext]",
      },
    ],
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.jsx'],
    root: __dirname,
  },
  devtool: 'source-map',
  eslint: {
    configFile: '.eslintrc',
  },
}

if (production) {
  process.env.NODE_ENV = 'production'

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ].concat(config.plugins)
}

module.exports = config
