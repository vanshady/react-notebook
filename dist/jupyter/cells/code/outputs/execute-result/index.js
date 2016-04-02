'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _textPlain = require('./text-plain');

var _textPlain2 = _interopRequireDefault(_textPlain);

var _textHtml = require('./text-html');

var _textHtml2 = _interopRequireDefault(_textHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderData(data) {
  if (data['text/html']) {
    // If raw html provided, prefer that:
    return _react2.default.createElement(_textHtml2.default, { lines: data['text/html'] });
  } else if (data['text/plain']) {
    // Otherwise, if plain text, render that:
    return _react2.default.createElement(_textPlain2.default, { lines: data['text/plain'] });
  }
  return _react2.default.createElement('div', null);
}

var ExecuteResult = function ExecuteResult(props) {
  return _react2.default.createElement(
    'div',
    { className: 'output', key: props.key },
    _react2.default.createElement(
      'div',
      { className: 'output_area' },
      _react2.default.createElement(
        'div',
        { className: 'prompt output_prompt' },
        'Out[11]:'
      ),
      renderData(props.data)
    )
  );
};

ExecuteResult.propTypes = {
  data: _react2.default.PropTypes.object,
  key: _react2.default.PropTypes.object
};

exports.default = ExecuteResult;