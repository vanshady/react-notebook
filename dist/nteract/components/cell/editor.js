'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactCodeMirror = require('react-code-mirror');

var _reactCodeMirror2 = _interopRequireDefault(_reactCodeMirror);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Editor = function (_React$Component) {
  _inherits(Editor, _React$Component);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).call(this, props));

    _this.state = {
      source: _this.props.input
    };

    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Editor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var editor = _reactDom2.default.findDOMNode(this.refs.codemirror);
      editor.addEventListener('keypress', function (e) {
        if (e.keyCode === 13 && e.shiftKey) {
          e.preventDefault();
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        source: nextProps.input
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      if (this.props.onChange) {
        this.props.onChange(e.target.value);
      } else {
        this.setState({
          source: e.target.value
        });
        this.context.dispatch((0, _actions.updateCellSource)(this.props.id, e.target.value));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'cell_editor' },
        _react2.default.createElement(_reactCodeMirror2.default, {
          value: this.state.source,
          ref: 'codemirror',
          className: 'cell_cm',
          mode: this.props.language,
          textAreaClassName: ['editor'],
          textAreaStyle: {
            minHeight: '10em',
            backgroundColor: 'red'
          },
          lineNumbers: this.props.lineNumbers,
          theme: this.props.theme,
          onChange: this.onChange
        })
      );
    }
  }]);

  return Editor;
}(_react2.default.Component);

Editor.propTypes = {
  id: _react2.default.PropTypes.string,
  input: _react2.default.PropTypes.any,
  language: _react2.default.PropTypes.string,
  lineNumbers: _react2.default.PropTypes.bool,
  onChange: _react2.default.PropTypes.func,
  theme: _react2.default.PropTypes.string
};
Editor.contextTypes = {
  dispatch: _react2.default.PropTypes.func
};
Editor.defaultProps = {
  language: 'python',
  lineNumbers: false,
  text: '',
  theme: 'composition'
};
exports.default = Editor;