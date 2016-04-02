'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _draggableCell = require('./cell/draggable-cell');

var _draggableCell2 = _interopRequireDefault(_draggableCell);

var _cellCreator = require('./cell/cell-creator');

var _cellCreator2 = _interopRequireDefault(_cellCreator);

var _actions = require('../../actions');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../../../node_modules/normalize.css/normalize.css');
require('../../../node_modules/codemirror/lib/codemirror.css');
require('../../../node_modules/material-design-icons/iconfont/material-icons.css');
require('../styles/cm-composition.css');
require('../styles/main.css');

var Notebook = function (_React$Component) {
  _inherits(Notebook, _React$Component);

  function Notebook() {
    _classCallCheck(this, Notebook);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Notebook).call(this));

    _this.createCellElement = _this.createCellElement.bind(_this);
    _this.moveCell = _this.moveCell.bind(_this);
    return _this;
  }

  _createClass(Notebook, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        channels: this.props.channels
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      require('codemirror/mode/markdown/markdown');

      var lang = this.props.notebook.getIn(['metadata', 'kernelspec', 'language']);
      if (!lang) {
        return;
      }
      // HACK: This should give you the heeby-jeebies
      // Mostly because lang could be ../../../../whatever
      // This is the notebook though, so hands off
      // We'll want to check for this existing later
      // and any other validation
      require('codemirror/mode/' + lang + '/' + lang);
      // Assume markdown should be required
    }
  }, {
    key: 'moveCell',
    value: function moveCell(sourceId, destinationId, above) {
      this.context.dispatch((0, _actions.moveCell)(sourceId, destinationId, above));
    }
  }, {
    key: 'createCellElement',
    value: function createCellElement(id) {
      var cellMap = this.props.notebook.get('cellMap');

      return _react2.default.createElement(
        'div',
        { key: 'cell-container-' + id },
        _react2.default.createElement(_draggableCell2.default, { cell: cellMap.get(id),
          language: this.props.notebook.getIn(['metadata', 'language_info', 'name']),
          id: id,
          key: id,
          displayOrder: this.props.displayOrder,
          transforms: this.props.transforms,
          moveCell: this.moveCell
        }),
        _react2.default.createElement(_cellCreator2.default, { key: 'creator-' + id, id: id, above: false })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.notebook) {
        return _react2.default.createElement('div', null);
      }
      var cellOrder = this.props.notebook.get('cellOrder');
      return _react2.default.createElement(
        'div',
        { style: {
            paddingTop: '10px',
            paddingLeft: '10px',
            paddingRight: '10px'
          }, ref: 'cells'
        },
        _react2.default.createElement(_cellCreator2.default, { id: cellOrder.get(0, null), above: true }),
        cellOrder.map(this.createCellElement)
      );
    }
  }]);

  return Notebook;
}(_react2.default.Component);

Notebook.propTypes = {
  channels: _react2.default.PropTypes.any,
  displayOrder: _react2.default.PropTypes.instanceOf(_immutable2.default.List),
  notebook: _react2.default.PropTypes.any,
  onCellChange: _react2.default.PropTypes.func,
  transforms: _react2.default.PropTypes.instanceOf(_immutable2.default.Map)
};
Notebook.contextTypes = {
  dispatch: _react2.default.PropTypes.func
};
Notebook.childContextTypes = {
  channels: _react2.default.PropTypes.object
};
exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(Notebook);