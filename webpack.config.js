const path = require('path');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  // optimization: {
  // minimize: true,
  // splitChunks: {
  // minChunks: Infinity,
  // chunks: 'all'
  // }
  // }
};
