import React from 'react';
import CodeCellInput from './input';
import CodeCellOutputs from './outputs';

const CodeCell = (props) => (
  <div className={'cell code_cell'}>
    <CodeCellInput data={props.data} />
    <CodeCellOutputs outputs={props.data.outputs} />
  </div>
);

CodeCell.propTypes = {
  data: React.PropTypes.object,
};

export default CodeCell;
