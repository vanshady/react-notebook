'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextPlain = function TextPlain(props) {
  return _react2.default.createElement(
    'div',
    { className: 'output_text output_subarea output_execute_result' },
    _react2.default.createElement(
      'pre',
      { className: '' },
      props.lines.join('\n')
    )
  );
};

TextPlain.propTypes = {
  lines: _react2.default.PropTypes.array
};

module.exports = TextPlain;