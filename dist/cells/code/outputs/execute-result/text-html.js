'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextHTML = function TextHTML(props) {
  var lines = props.lines;
  if (typeof lines === 'string' || lines instanceof String) {
    lines = [lines];
  }

  return _react2.default.createElement('div', { className: 'output_html rendered_html output_subarea output_execute_result', dangerouslySetInnerHTML: { __html: lines.join('\n') } });
};

TextHTML.propTypes = {
  lines: _react2.default.PropTypes.any
};

exports.default = TextHTML;