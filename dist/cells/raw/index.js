'use strict';

var React = require('react');

var RawCell = function RawCell(props) {
  return React.createElement('div', { className: 'cell raw_cell' });
};

module.exports = RawCell;