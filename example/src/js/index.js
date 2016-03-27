import React from 'react';
import ReactDOM from 'react-dom';
import Notebook from '../../../src/index';
import Nteract from '../../../src/nteract/components/notebook';
import createStore from '../../../src/nteract/store';
import Provider from '../../../src/nteract/components/util/provider';
import { setNotebook, setExecutionState } from '../../../src/nteract/actions';
import { reducers } from '../../../src/nteract/reducers';
import * as enchannelBackend from '../enchannel-notebook-backend';
import sample from '../../sample.ipynb.json';

require('../css/style.scss');

const Rx = require('@reactivex/rxjs');
const { store, dispatch } = createStore({
  filename: 'test',
  executionState: 'not connected',
  notebook: null,
}, reducers);

store
.pluck('channels')
.distinctUntilChanged()
.switchMap(channels => {
  if (!channels || !channels.iopub) {
    return Rx.Observable.of('not connected');
  }
  return channels
  .iopub
  .ofMessageType('status')
  .pluck('content', 'execution_state');
})
.subscribe(st => {
  dispatch(setExecutionState(st));
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.createFileReader();
    this.handleFileChange = this.handleFileChange.bind(this);

    this.state = { data: JSON.stringify(sample) };
    store.subscribe(state => this.setState(state));
  }
  componentDidMount() {
    dispatch(setNotebook(sample));
  }
  createFileReader() {
    this.reader = new FileReader();
    this.reader.addEventListener('loadend', () => {
      this.setState({ data: this.reader.result });
      dispatch(setNotebook(JSON.parse(this.reader.result)));
    });
  }
  handleFileChange() {
    const input = this.refs['ipynb-file'];

    if (input.files[0]) this.reader.readAsText(input.files[0]);
  }
  renderNotebook() {
    let json;
    try {
      json = JSON.parse(this.state.data);
    } catch (e) {
      json = undefined;
    }

    if (this.state.data && json) {
      return (
        <Provider rx={{ dispatch, store }}>
          <div>
            {
              this.state.err &&
              <pre>{this.state.err.toString()}</pre>
            }
            {
              this.state.notebook &&
              <Nteract
                notebook={this.state.notebook}
                channels={this.state.channels}
              />
            }
          </div>
        </Provider>
      );
    }

    if (this.state.data === 1) {
      return <Notebook content={json} channels={this.props.channels} />;
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
        <div className="container">
          { this.renderNotebook() }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  channels: React.PropTypes.object,
};

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

  ReactDOM.render(
    <App channels={channels} />,
    document.getElementById('root')
  );
});
