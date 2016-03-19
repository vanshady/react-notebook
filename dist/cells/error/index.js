'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorCell = function ErrorCell(props) {
  return _react2.default.createElement(
    'div',
    { className: 'cell error_cell' },
    props.message
  );
};

module.exports = ErrorCell;