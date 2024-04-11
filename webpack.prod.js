/* eslint-disable max-len */
const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '_',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },

        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
    new CompressionPlugin({
      threshold: 1192,
      minRatio: 0.7,
      compressionOptions: {
        level: 1,
        strategy: 2,
      },
    }),
    new ImageminWebpackPlugin({
      plugins: [
        // eslint-disable-next-line new-cap
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)/,
          options: {
            quality: 50,
          },
        },
      ],
      overrideExtension: true,
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Kafe kita - Apps',
      orientation: 'portrait',
      display: 'standalone',
      start_url: './',
      crossorigin: 'anonymous',
      inject: true,
      fingerprints: true,
      theme_color: '#ffffff',
      background_color: '#ffffff',
      ios: true,
      publicPath: null,
      includeDirectory: true,
      icons: [
        {
          src: path.resolve('src/public/images/fav.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('icons', 'android'),
        },
        {
          src: path.resolve('src/public/images/fav.png'),
          size: '1024x1024',
          destination: path.join('icons', 'ios'),
        },
        {
          src: path.resolve('src/public/images/fav.png'),
          size: '1024x1024',
          purpose: 'maskable',
          destination: path.join('icons', 'desktop'),
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      analyzerMode: 'disabled',
      statsOptions: {
        source: false,
      },
    }),
  ],
});
