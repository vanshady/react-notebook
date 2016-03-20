'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _text = require('./cells/text');

var _text2 = _interopRequireDefault(_text);

var _code = require('./cells/code');

var _code2 = _interopRequireDefault(_code);

var _error = require('./cells/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderCell(cell, i) {
  var Cell = {
    markdown: _text2.default,
    code: _code2.default
  }[cell.cell_type];

  if (!Cell) {
    return _react2.default.createElement(_error2.default, { message: 'Cell type not recognized: "' + cell.cell_type + '"' });
  }
  return _react2.default.createElement(Cell, {
    data: cell,
    key: 'ipnyb-cell-' + (i + 1)
  });
}

var Notebook = function Notebook(props) {
  return _react2.default.createElement(
    'div',
    { className: 'ipynb' },
    props.data.cells.map(renderCell)
  );
};

Notebook.propTypes = {
  data: _react2.default.PropTypes.object
};

exports.default = Notebook;