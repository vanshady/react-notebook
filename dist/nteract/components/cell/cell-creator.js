'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cellCreatorButtons = require('./cell-creator-buttons');

var _cellCreatorButtons2 = _interopRequireDefault(_cellCreatorButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CellCreator = function (_React$Component) {
  _inherits(CellCreator, _React$Component);

  function CellCreator() {
    _classCallCheck(this, CellCreator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CellCreator).call(this));

    _this.state = {
      show: false
    };

    _this.setHoverElement = _this.setHoverElement.bind(_this);
    return _this;
  }

  _createClass(CellCreator, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // Listen to the page level mouse move event and manually check for
      // intersection because we don't want the hover region to actually capture
      // any mouse events.  The hover region is an invisible element that
      // describes the "hot region" that toggles the creator buttons.
      this._boundUpdateVisibility = this._updateVisibility.bind(this);
      document.addEventListener('mousemove', this._boundUpdateVisibility, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousemove', this._boundUpdateVisibility);
    }
  }, {
    key: 'setHoverElement',
    value: function setHoverElement(el) {
      this.hoverElement = el;
    }
  }, {
    key: '_updateVisibility',
    value: function _updateVisibility(mouseEvent) {
      if (this.hoverElement) {
        var x = mouseEvent.clientX;
        var y = mouseEvent.clientY;
        var regionRect = this.hoverElement.getBoundingClientRect();
        var show = regionRect.left < x && x < regionRect.right && regionRect.top < y && y < regionRect.bottom;
        this.setState({ show: show });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'creator-hover-mask' },
        _react2.default.createElement(
          'div',
          { className: 'creator-hover-region', ref: this.setHoverElement },
          this.state.show || this.props.id === null ? _react2.default.createElement(_cellCreatorButtons2.default, this.props) : ''
        )
      );
    }
  }]);

  return CellCreator;
}(_react2.default.Component);

CellCreator.propTypes = {
  above: _react2.default.PropTypes.bool,
  id: _react2.default.PropTypes.string
};
exports.default = CellCreator;