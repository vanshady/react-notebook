var path = require('path');

module.exports = {
  entry: {
    index: './index.js',
    example: './example/src/js/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules)/, loader: 'babel' },
      { test: /\.js$/, exclude: /(node_modules)/, loader: 'eslint' },
      { test: /\.json$/, loaders: ['json'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
    ]
  },
};
