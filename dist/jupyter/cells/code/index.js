'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _outputs = require('./outputs');

var _outputs2 = _interopRequireDefault(_outputs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeCell = function CodeCell(props) {
  return _react2.default.createElement(
    'div',
    { className: 'cell code_cell' },
    _react2.default.createElement(_input2.default, { data: props.data }),
    _react2.default.createElement(_outputs2.default, { outputs: props.data.outputs })
  );
};

CodeCell.propTypes = {
  data: _react2.default.PropTypes.object
};

exports.default = CodeCell;