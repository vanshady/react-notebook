var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: [
            'react',
            'es2015'
          ]
        }
      },
      {
        test: /\.json$/,
        loaders: ["json"]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ]
  },
};
