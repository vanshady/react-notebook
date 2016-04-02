'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _remark = require('remark');

var _remark2 = _interopRequireDefault(_remark);

var _remarkReact = require('remark-react');

var _remarkReact2 = _interopRequireDefault(_remarkReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextCell = function TextCell(props) {
  var source = props.data.source;
  if (typeof source === 'string' || source instanceof String) {
    source = [source];
  }
  source = source.reduce(function (text, line) {
    return text + line.replace(/^(#{1,6})([^#\s])/, '$1 $2');
  }, '');

  return _react2.default.createElement(
    'div',
    { className: 'cell text_cell' },
    _react2.default.createElement('div', { className: 'prompt input_prompt' }),
    _react2.default.createElement(
      'div',
      { className: 'inner_cell' },
      (0, _remark2.default)().use(_remarkReact2.default).process(source)
    )
  );
};

TextCell.propTypes = {
  data: _react2.default.PropTypes.object
};

exports.default = TextCell;