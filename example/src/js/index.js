import React from 'react';
import ReactDOM from 'react-dom';
import Notebook from '../../../src/index';
import sample from '../../sample.ipynb.json';

require('!style!css!sass!../css/style.scss');

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
      return <Notebook data={json} />;
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
        { this.renderNotebook() }
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement(App, {}),
  document.getElementById('root')
);
