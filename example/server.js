import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';

const port = 3001;

const spawn = require('child_process').spawn;
const notebook = spawn('python', [
  '-m',
  'notebook',
  '--no-browser',
  '--debug',
  `--NotebookApp.allow_origin="http://localhost:${port}"`,
]);

notebook.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);  // eslint-disable-line
});

notebook.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);  // eslint-disable-line
});

notebook.on('close', (code) => {
  console.log(`child process exited with code ${code}`);  // eslint-disable-line
});

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  contentBase: './example',
  hot: true,
  historyApiFallback: true,
  compress: true,
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: false,
  },
}).listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err); // eslint-disable-line
  }

  console.log(`Webpack dev server is listening at localhost:${port}`);  // eslint-disable-line
});
