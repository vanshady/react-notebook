var path = require('path');

module.exports = {
  entry: './example/src/js/index.js',
  output: {
    path: path.join(__dirname,'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
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
  //sassLoader: {
    //includePaths: [path.resolve(__dirname, "./some-folder")]
  //}
