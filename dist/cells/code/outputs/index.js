'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _executeResult = require('./execute-result');

var _executeResult2 = _interopRequireDefault(_executeResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderOutput(output, i) {
  switch (output.output_type) {
    case 'execute_result':
      return _react2.default.createElement(_executeResult2.default, _extends({}, output, { key: 'output-' + i }));
    case 'stream':
      break;
    default:
      return _react2.default.createElement('div', { key: 'output-' + i });
  }
  return _react2.default.createElement('div', null);
}

var CodeCellOutputs = function CodeCellOutputs(props) {
  return _react2.default.createElement(
    'div',
    { className: 'output_wrapper' },
    props.outputs.map(renderOutput)
  );
};

CodeCellOutputs.propTypes = {
  data: _react2.default.PropTypes.object,
  outputs: _react2.default.PropTypes.array
};

exports.default = CodeCellOutputs;