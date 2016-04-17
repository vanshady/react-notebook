import React from 'react';
import Cell from './cell/cell';
import { moveCell } from '../../actions';

class Notebook extends React.Component {
  static propTypes = {
    channels: React.PropTypes.any,
    notebook: React.PropTypes.any,
  };

  static contextTypes = {
    dispatch: React.PropTypes.func,
  };

  static childContextTypes = {
    channels: React.PropTypes.object,
  };

  constructor() {
    super();
    this.createCellElement = this.createCellElement.bind(this);
    this.moveCell = this.moveCell.bind(this);
  }

  getChildContext() {
    return {
      channels: this.props.channels,
    };
  }

  componentWillMount() {
    require('codemirror/mode/markdown/markdown');

    const lang = this.props.notebook.getIn(['metadata', 'kernelspec', 'language']);
    if (!lang) {
      return;
    }
    // HACK: This should give you the heeby-jeebies
    // Mostly because lang could be ../../../../whatever
    // This is the notebook though, so hands off
    // We'll want to check for this existing later
    // and any other validation
    require(`codemirror/mode/${lang}/${lang}`);
    // Assume markdown should be required
  }

  moveCell(sourceId, destinationId, above) {
    this.context.dispatch(moveCell(sourceId, destinationId, above));
  }

  createCellElement(id) {
    const cellMap = this.props.notebook.get('cellMap');

    return (
      <div key={`cell-container-${id}`}>
        <Cell cell={cellMap.get(id)}
          language={this.props.notebook.getIn(['metadata', 'language_info', 'name'])}
          id={id}
          key={id}
          moveCell={this.moveCell}
        />
      </div>);
  }

  render() {
    if (!this.props.notebook) {
      return (
        <div></div>
      );
    }
    const cellOrder = this.props.notebook.get('cellOrder');
    return (
      <div className="ntb-content" ref="cells">
      {
        cellOrder.map(this.createCellElement)
      }
      </div>
    );
  }
}

export default Notebook;
