'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

var _editor = require('./editor');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownCell = function (_React$Component) {
  _inherits(MarkdownCell, _React$Component);

  function MarkdownCell(props) {
    _classCallCheck(this, MarkdownCell);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MarkdownCell).call(this, props));

    _this.state = {
      view: true,
      // HACK: We'll need to handle props and state change better here
      source: _this.props.cell.get('source')
    };
    _this.openEditor = _this.openEditor.bind(_this);
    _this.keyDown = _this.keyDown.bind(_this);
    return _this;
  }

  _createClass(MarkdownCell, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        source: nextProps.cell.get('source')
      });
    }
  }, {
    key: 'keyDown',
    value: function keyDown(e) {
      if (!e.shiftKey || e.key !== 'Enter') {
        return;
      }
      this.setState({ view: true });
    }
  }, {
    key: 'openEditor',
    value: function openEditor() {
      this.setState({ view: false });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state && this.state.view ? _react2.default.createElement(
        'div',
        {
          className: 'cell_markdown',
          onDoubleClick: this.openEditor
        },
        _react2.default.createElement(_reactMarkdown2.default, { source: this.state.source ? this.state.source : '*Empty markdown cell, double click me to add content.*'
        })
      ) : _react2.default.createElement(
        'div',
        { onKeyDown: this.keyDown },
        _react2.default.createElement(_editor2.default, {
          language: 'markdown',
          id: this.props.id,
          input: this.state.source
        })
      );
    }
  }]);

  return MarkdownCell;
}(_react2.default.Component);

MarkdownCell.propTypes = {
  cell: _react2.default.PropTypes.any,
  id: _react2.default.PropTypes.string
};
MarkdownCell.contextTypes = {
  dispatch: _react2.default.PropTypes.func
};
exports.default = MarkdownCell;