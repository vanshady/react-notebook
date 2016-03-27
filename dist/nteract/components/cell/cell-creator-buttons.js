'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellCreatorButtons = function (_React$Component) {
  _inherits(CellCreatorButtons, _React$Component);

  function CellCreatorButtons() {
    _classCallCheck(this, CellCreatorButtons);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CellCreatorButtons).call(this));

    _this.createCodeCell = _this.createCell.bind(_this, 'code');
    _this.createTextCell = _this.createCell.bind(_this, 'markdown');
    _this.createCell = _this.createCell.bind(_this);
    return _this;
  }

  _createClass(CellCreatorButtons, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'createCell',
    value: function createCell(type) {
      if (!this.props.id) {
        this.context.dispatch((0, _actions.createCellAppend)(type));
        return;
      }

      if (this.props.above) {
        this.context.dispatch((0, _actions.createCellBefore)(type, this.props.id));
      } else {
        this.context.dispatch((0, _actions.createCellAfter)(type, this.props.id));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'creator-tool' },
        _react2.default.createElement(
          'button',
          { onClick: this.createTextCell, title: 'create text cell' },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'art_track'
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'creator-label' },
          'Add cell'
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.createCodeCell, title: 'create code cell' },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'code'
          )
        )
      );
    }
  }]);

  return CellCreatorButtons;
}(_react2.default.Component);

CellCreatorButtons.propTypes = {
  above: _react2.default.PropTypes.bool,
  id: _react2.default.PropTypes.string
};
CellCreatorButtons.contextTypes = {
  dispatch: _react2.default.PropTypes.func
};
exports.default = CellCreatorButtons;