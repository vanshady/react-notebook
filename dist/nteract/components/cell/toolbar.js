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

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toolbar).call(this, props));

    _this.removeCell = _this.removeCell.bind(_this);
    _this.executeCell = _this.executeCell.bind(_this);
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'removeCell',
    value: function removeCell() {
      this.context.dispatch((0, _actions.removeCell)(this.props.id));
    }
  }, {
    key: 'executeCell',
    value: function executeCell() {
      this.context.dispatch((0, _actions.executeCell)(this.context.channels, this.props.id, this.props.cell.get('source')));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'cell_toolbar-mask' },
        _react2.default.createElement(
          'div',
          { className: 'cell_toolbar' },
          _react2.default.createElement(
            'button',
            { onClick: this.executeCell },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'play_arrow'
            )
          ),
          _react2.default.createElement(
            'button',
            { onClick: this.removeCell },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'delete'
            )
          )
        )
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = {
  cell: _react2.default.PropTypes.any,
  id: _react2.default.PropTypes.string
};
Toolbar.contextTypes = {
  channels: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func
};
exports.default = Toolbar;