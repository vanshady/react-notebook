import React from 'react';

const ErrorCell = (props) => (
  <div className={'cell error_cell'}>
    {props.message}
  </div>
);

ErrorCell.propTypes = {
  message: React.PropTypes.object,
};

export default ErrorCell;
