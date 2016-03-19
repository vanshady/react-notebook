'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _text = require('./cells/text');

var _text2 = _interopRequireDefault(_text);

var _code = require('./cells/code');

var _code2 = _interopRequireDefault(_code);

var _error = require('./cells/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function renderCell(cell, i) {
  var Cell = {
    markdown: _text2.default,
    code: _code2.default
  }[cell.cell_type];

  if (!Cell) {
    return _react2.default.createElement(_error2.default, { message: 'Cell type not recognized: "' + cell.cell_type + '"' });
  } else {
    return _react2.default.createElement(Cell, {
      data: cell,
      key: 'ipnyb-cell-' + (i + 1)
    });
  }
}

var IPythonNotebook = function (_React$Component) {
  _inherits(IPythonNotebook, _React$Component);

  function IPythonNotebook() {
    _classCallCheck(this, IPythonNotebook);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IPythonNotebook).apply(this, arguments));
  }

  _createClass(IPythonNotebook, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'ipynb' },
        this.props.data.cells.map(renderCell)
      );
    }
  }]);

  return IPythonNotebook;
}(_react2.default.Component);

IPythonNotebook.propTypes = {
  data: _react2.default.PropTypes.object
};

exports.default = IPythonNotebook;