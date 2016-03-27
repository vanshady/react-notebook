'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _codeCell = require('./code-cell');

var _codeCell2 = _interopRequireDefault(_codeCell);

var _markdownCell = require('./markdown-cell');

var _markdownCell2 = _interopRequireDefault(_markdownCell);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell() {
    _classCallCheck(this, Cell);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).call(this));

    _this.state = {
      showToolbar: false
    };

    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    return _this;
  }

  _createClass(Cell, [{
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      this.setState({ showToolbar: true });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.setState({ showToolbar: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var cell = this.props.cell;
      var type = cell.get('cell_type');
      return _react2.default.createElement(
        'div',
        {
          className: 'cell',
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave
        },
        this.state.showToolbar ? _react2.default.createElement(_toolbar2.default, this.props) : null,
        type === 'markdown' ? _react2.default.createElement(_markdownCell2.default, this.props) : _react2.default.createElement(_codeCell2.default, this.props)
      );
    }
  }]);

  return Cell;
}(_react2.default.Component);

Cell.propTypes = {
  cell: _react2.default.PropTypes.any,
  id: _react2.default.PropTypes.string,
  onCellChange: _react2.default.PropTypes.func
};
exports.default = Cell;