const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    plugins: [ // Add and configure workbox plugins for a service worker and manifest file.
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Just Another Text Editor',
    }),
    new WebpackPwaManifest({
      name: 'Just Another Text Editor',
      short_name: 'JATE',
      description: 'What you see is what you get.',
      background_color: '#ffffff',
      fingerprints: false,
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: path.join('assets', 'icons')
        },
      ]
    }),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js'
    })
    ],

    module: {
      rules: [
        { // Add CSS loaders to webpack.
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        { // Add Babel to webpack
          test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
          }
        }
      ],
    },
  };
};
