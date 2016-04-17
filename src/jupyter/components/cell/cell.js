import React from 'react';

import CodeCell from './code-cell';
import MarkdownCell from '../../../nteract/components/cell/markdown-cell';

class Cell extends React.Component {
  static propTypes = {
    cell: React.PropTypes.any,
    id: React.PropTypes.string,
    onCellChange: React.PropTypes.func,
  };

  state = {
  };

  render() {
    const cell = this.props.cell;
    const type = cell.get('cell_type');
    return (
      <div className="ntb-cell">
        {
        type === 'markdown' ?
          <MarkdownCell {...this.props} /> :
          <CodeCell {...this.props} />
        }
      </div>
    );
  }
}

export default Cell;
