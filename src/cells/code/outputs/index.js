import React from 'react';
import ExecuteResult from './execute-result';

function renderOutput(output, i) {
  switch (output.output_type) {
    case 'execute_result':
      return <ExecuteResult {...output} key={`output-${i}`} />;
    case 'stream':
    default:
      return <div key={`output-${i}`} />;
  }
}

const CodeCellOutputs = (props) => (
  <div className="output_wrapper">
    {props.outputs.map(renderOutput)}
  </div>
);

CodeCellOutputs.propTypes = {
  data: React.PropTypes.object,
  outputs: React.PropTypes.array,
};

export default CodeCellOutputs;
