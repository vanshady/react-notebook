'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHighlight = require('react-highlight');

var _reactHighlight2 = _interopRequireDefault(_reactHighlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeCellInput = function CodeCellInput(props) {
  var source = props.data.source;
  if (typeof source === 'string' || source instanceof String) {
    source = [source];
  }

  return _react2.default.createElement(
    'div',
    { className: 'input' },
    _react2.default.createElement(
      'div',
      { className: 'prompt input_prompt' },
      'In [' + (props.data.execution_count || ' ') + ']:'
    ),
    _react2.default.createElement(
      'div',
      { className: 'inner_cell' },
      _react2.default.createElement(
        'div',
        { className: 'input_area' },
        _react2.default.createElement(
          'div',
          { className: 'highlight' },
          _react2.default.createElement(
            _reactHighlight2.default,
            { className: 'python' },
            source.join('\n')
          )
        )
      )
    )
  );
};

CodeCellInput.propTypes = {
  data: _react2.default.PropTypes.object
};

exports.default = CodeCellInput;