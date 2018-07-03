const {AngularCompilerPlugin} = require('@ngtools/webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWepackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: path.resolve("./src/main.ts"),
  output: {
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    path: path.resolve(__dirname, "dist")
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: {
                importLoaders: 1,
                alias: {
                  "../../fonts/roboto": "roboto-fontface/fonts/roboto"
                }
              }
            },
          { loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: loader => {
                return [
                  require('postcss-import')({root: loader.resourcePath}),
                  require('postcss-preset-env')(),
                  require('autoprefixer')(),
                  require('cssnano')()
                ];
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: path.resolve('./tsconfig.json'),
      entryModule: path.resolve('./src/app/app.module#AppModule'),
      sourceMap: true
    }),

    new CopyWepackPlugin([
      path.resolve(__dirname, 'node_modules', 'core-js', 'client', 'shim.js'),
      path.resolve(__dirname, 'node_modules', 'zone.js', 'dist', 'zone.js')
    ]),

    new MiniCssExtractPlugin({
      fileName: "[name].css",
      chunkFilename: "[id].css"
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]
};