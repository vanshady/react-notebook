'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Inputs;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Inputs(_ref) {
  var executionCount = _ref.executionCount;

  return _react2.default.createElement(
    'div',
    { className: 'cell_inputs' },
    '[',
    !executionCount ? ' ' : executionCount,
    ']'
  );
}

Inputs.propTypes = {
  executionCount: _react.PropTypes.any
};