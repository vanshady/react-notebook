'use strict';

var React = require('react');

var ErrorCell = function ErrorCell(props) {
  return React.createElement(
    'div',
    { className: 'cell error_cell' },
    props.message
  );
};

module.exports = ErrorCell;