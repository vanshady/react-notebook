'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var TextCell = require('./cells/text');
var CodeCell = require('./cells/code');
// var RawCell = require('./cells/raw')
var ErrorCell = require('./cells/error');

function renderCell(cell, i) {
  var Cell = {
    markdown: TextCell,
    code: CodeCell
    // raw: RawCell
  }[cell.cell_type];

  if (!Cell) {
    return React.createElement(ErrorCell, { message: 'Cell type not recognized: "' + cell.cell_type + '"' });
  } else {
    return React.createElement(Cell, {
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
      return React.createElement(
        'div',
        { className: 'ipynb' },
        this.props.data.cells.map(renderCell)
      );
    }
  }]);

  return IPythonNotebook;
}(React.Component);

IPythonNotebook.propTypes = {
  data: React.PropTypes.object
};

exports.default = IPythonNotebook;