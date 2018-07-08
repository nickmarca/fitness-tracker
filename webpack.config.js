const {AngularCompilerPlugin} = require('@ngtools/webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWepackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');


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
        oneOf: [


          // === > LOADER RULE <===
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },


          // === > LOADER RULE <===
          {

            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            loader: '@ngtools/webpack'

          },


          // === > LOADER RULE <===
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  alias: {
                    "../../fonts/roboto": "roboto-fontface/fonts/roboto"
                  }
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')(),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },


          // === > LOADER RULE <===
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
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