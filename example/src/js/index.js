import React from 'react';
import ReactDOM from 'react-dom';
import { Notebook, createStore } from '../../../src/';
import Toolbar from '../../../src/toolbar';
import { setNotebook } from '../../../src/actions';
import * as enchannelBackend from '../enchannel-notebook-backend';
import sample from '../../sample.ipynb.json';

require('normalize.css/normalize.css');
require('codemirror/lib/codemirror.css');
require('material-design-icons/iconfont/material-icons.css');
require('../../../src/nteract/styles/base.less');
require('../../../src/jupyter/styles/base.less');
require('../../../src/toolbar/styles/base.less');
require('../css/style.css');

class App extends React.Component {
  constructor(props) {
    super(props);

    const { store, dispatch } = createStore({
      filename: 'test',
      executionState: 'not connected',
      notebook: null,
    });

    this.createFileReader();
    this.handleFileChange = this.handleFileChange.bind(this);

    this.store = store;
    this.dispatch = dispatch;

    this.state = {
      channels: null,
    };
  }
  componentDidMount() {
    this.attachChannels();
  }
  attachChannels() {
    // Prompt the user for the baseUrl and wsUrl
    const baseUrl = 'http://localhost:8888';
    const domain = baseUrl.split('://').slice(1).join('://');
    const wsUrl = `ws://${domain}`;

    // Create a connection options object
    const connectionOptions = {
      baseUrl,
      wsUrl,
    };

    enchannelBackend.spawn(connectionOptions, 'python3').then(id => {
      console.info('spawned', id); // eslint-disable-line
      return id;
    }).catch(err => {
      console.error('could not spawn', err); // eslint-disable-line
      throw err;
    }).then(id => {
      return Promise.all([id, enchannelBackend.connect(connectionOptions, id)]);
    }).catch(err => {
      console.error('could not connect', err); // eslint-disable-line
      throw err;
    }).then(args => {
      const id = args[0];
      const channels = args[1];
      console.info('connected', id, channels); // eslint-disable-line

      this.setState({ channels });
    });
  }
  createFileReader() {
    this.reader = new FileReader();
    this.reader.addEventListener('loadend', () => {
      this.dispatch(setNotebook(JSON.parse(this.reader.result)));
    });
  }
  handleFileChange() {
    const input = this.refs['ipynb-file'];

    if (input.files[0]) this.reader.readAsText(input.files[0]);
  }
  renderToolbar() {
    if (this.state.channels) {
      return (
        <Toolbar
          store={this.store}
          dispatch={this.dispatch}
          channels={this.state.channels}
        />
      );
    }

    return <div />;
  }
  renderNotebook(type) {
    if (this.state.channels) {
      return (
        <Notebook
          store={this.store}
          dispatch={this.dispatch}
          content={sample}
          ui={type}
          channels={this.state.channels}
        />
      );
    }

    return <div />;
  }
  renderInputForm() {
    return (
      <form>
        <label htmlFor="ipynb-file">
        File:
        <input type="file" name="ipynb-file" ref="ipynb-file" id="ipynb-file" onChange={this.handleFileChange} />
        </label>
      </form>
    );
  }
  render() {
    return (
      <div>
        { this.renderInputForm() }
        <hr />
          { this.renderToolbar() }
        <hr />
        <div className="container-left">
          { this.renderNotebook('jupyter') }
        </div>
        <div className="container-right">
          { this.renderNotebook('nteract') }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
