'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextPlain = function TextPlain(props) {
  var lines = props.lines;
  if (typeof lines === 'string' || lines instanceof String) {
    lines = [lines];
  }

  return _react2.default.createElement(
    'div',
    { className: 'output_text output_subarea output_execute_result' },
    _react2.default.createElement(
      'pre',
      null,
      lines.join('\n')
    )
  );
};

TextPlain.propTypes = {
  lines: _react2.default.PropTypes.any
};

exports.default = TextPlain;