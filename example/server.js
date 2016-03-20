var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var port = 3001;

var spawn = require('child_process').spawn;
var notebook = spawn('python', [
  '-m',
  'notebook',
  '--no-browser',
  '--debug',
  '--NotebookApp.allow_origin="http://localhost:' + port + '"'
]);

notebook.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

notebook.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

notebook.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

new WebpackDevServer(webpack(config), {
  publicPath: '/build/',
  contentBase: './example',
  hot: true,
  historyApiFallback: true,
  compress: true,
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: false
  }
}).listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack dev server is listening at localhost:' + port);
});
