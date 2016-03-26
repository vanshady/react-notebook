import React from 'react';
import ReactDOM from 'react-dom';
import Notebook from '../../../src/index';
import sample from '../../sample.ipynb.json';
import * as enchannelBackend from '../enchannel-notebook-backend';

require('../css/style.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.createFileReader();
    this.handleFileChange = this.handleFileChange.bind(this);
    this.state = { data: JSON.stringify(sample) };
  }
  createFileReader() {
    this.reader = new FileReader();
    this.reader.addEventListener('loadend', () => {
      this.setState({ data: this.reader.result });
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
