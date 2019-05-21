
const path = require('path');
const glob = require('glob');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _modeflag = (_mode == 'production') ? true : false
const merge = require('webpack-merge')
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
webpackConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: ['/node_modules/']
      },
    ]
  },
  devServer:{
    port: 3002,
    hot: true,
    // before(app){
    //   app.get('/some/path', function(req, res) {
    //     res.json({ code: 200,msg:'success' });
    //   });
    // }
  },
  optimization: {
    splitChunks:{
      cacheGroups:{
        commons:{
          chunks:'initial',
          name:'common',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize:0,
          priority: 2,
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeflag ? 'styles/[name].[hash:5].css' : 'styles/[name].css',
      chunkFilename: _modeflag ? 'styles/[id].[hash:5].css' : 'styles/[id].css',
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, './src/*.html'))
    }),
    new HtmlWebpackPlugin({
      filename:"index.html",
      template:"src/index.html"
    }),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        canPrint: true
      })
  ],
}
module.exports = merge(_mergeConfig,webpackConfig)