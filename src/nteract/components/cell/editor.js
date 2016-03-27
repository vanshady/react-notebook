import React from 'react';
import ReactDOM from 'react-dom';

import CodeMirror from 'react-code-mirror';

import { updateCellSource } from '../../actions';

export default class Editor extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    input: React.PropTypes.any,
    language: React.PropTypes.string,
    lineNumbers: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    theme: React.PropTypes.string,
  };

  static contextTypes = {
    dispatch: React.PropTypes.func,
  };

  static defaultProps = {
    language: 'python',
    lineNumbers: false,
    text: '',
    theme: 'composition',
  };

  constructor(props) {
    super(props);
    this.state = {
      source: this.props.input,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const editor = ReactDOM.findDOMNode(this.refs.codemirror);
    editor.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && e.shiftKey) {
        e.preventDefault();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      source: nextProps.input,
    });
  }

  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    } else {
      this.setState({
        source: e.target.value,
      });
      this.context.dispatch(updateCellSource(this.props.id, e.target.value));
    }
  }

  render() {
    return (
      <div className="cell_editor">
        <CodeMirror
          value={this.state.source}
          ref="codemirror"
          className="cell_cm"
          mode={this.props.language}
          textAreaClassName={['editor']}
          textAreaStyle={{
            minHeight: '10em',
            backgroundColor: 'red',
          }}
          lineNumbers={this.props.lineNumbers}
          theme={this.props.theme}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
