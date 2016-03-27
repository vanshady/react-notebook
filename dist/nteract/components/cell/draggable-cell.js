'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDom = require('react-dom');

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cellSource = {
  beginDrag: function beginDrag(props) {
    return {
      id: props.id
    };
  }
};

function isDragUpper(props, monitor, component) {
  var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();
  var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  var clientOffset = monitor.getClientOffset();
  var hoverClientY = clientOffset.y - hoverBoundingRect.top;

  return hoverClientY < hoverMiddleY;
}

var cellTarget = {
  drop: function drop(props, monitor, component) {
    var hoverUpperHalf = isDragUpper(props, monitor, component);
    props.moveCell(monitor.getItem().id, props.id, hoverUpperHalf);
  },
  hover: function hover(props, monitor, component) {
    component.setState({ hoverUpperHalf: isDragUpper(props, monitor, component) });
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var DraggableCell = function (_React$Component) {
  _inherits(DraggableCell, _React$Component);

  function DraggableCell() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DraggableCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DraggableCell)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hoverUpperHalf: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DraggableCell, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var connectDragPreview = this.props.connectDragPreview;
      var img = new Image();
      img.src = ['data:image/png;base64,', 'iVBORw0KGgoAAAANSUhEUgAAADsAAAAzCAYAAAApdnDeAAAAAXNSR0IArs4c6QAA', 'AwNJREFUaAXtmlFL3EAUhe9MZptuoha3rLWgYC0W+lj/T3+26INvXbrI2oBdE9km', 'O9Nzxu1S0LI70AQScyFmDDfkfvdMZpNwlCCccwq7f21MaVM4FPtkU0o59RdoJBMx', 'WZINBg+DQWGKCAk+2kIKFh9JlSzLYVmOilEpR1Kh/iUbQFiNQTSbzWJrbYJximOJ', 'cSaulpVRoqh4K8JhjprIVJWqFlCpQNG51roYj8cLjJcGf5RMZWC1TYw1o2LxcEmy', '0jeEo3ZFWVHIx0ji4eeKHFOx8l4sVVVZnBE6tWLHq7xO7FY86YpPeVjeo5y61tlR', 'JyhXEOQhF/lw6BGWixHvUWXVTpdgyUMu8q1h/ZJbqQhdiLsESx4FLvL9gcV6q3Cs', '0liq2IHuBHjItYIV3rMvJnrYrkrdK9sr24EO9NO4AyI+i/CilOXbTi1xeXXFTyAS', 'GSOfzs42XmM+v5fJ5JvP29/fl8PDw43nhCbUpuzFxYXs7OxKmqZb1WQGkc/P80K+', 'T6dbnROaVJuyfPY+Pj7aup7h66HP/1Uu5O7u59bnhSTWpmxIEU3l9rBNdbrp6/TK', 'Nt3xpq7XK9tUp5u+Tm2/s/jYJdfX12LwBHVycrKRK89zmeJhYnZ7K3Fcz3e/2mDP', 'z7/waZEf8zaC+gSkKa3l4OBA3uztbXdOYFZtsKcfToNKSZNUPp6GnRN0AST3C1Ro', 'x9qS3yvbFqVC6+yVDe1YW/J7ZduiVGidvbKhHWtLfq9sW5QKrdMri9cxB6OFhQmO', 'TrDuBHjIRT5CEZZj0i7xOkYnWGeCPOQiHqC8lc/R60cLnNPuvjOkns7dk4t8/Jfv', 's46mRlWqQiudxebVV3gAj7C9hXsmgZeztnfe/91YODEr3IoF/JY/sE2gbGaVLci3', 'hh0tRtWNvsm16JmNcOs6N9dW72LP7yOtWbEhjAUkZ+icoJ5HbE6+NSxMjKWe6cKb', 'GkUWgMwiFbXSlRpFkXelUlF4F70rVd7Bd4oZ/LL8xiDmtPV2Nwyf2zOlTfHERY7i', 'Haa1+w2+iFqx0aIgvgAAAABJRU5ErkJggg=='].join('');
      img.onload = function dragImageLoaded() {
        connectDragPreview(img);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.connectDropTarget(this.props.connectDragSource(_react2.default.createElement(
        'div',
        {
          style: {
            opacity: this.props.isDragging ? 0.25 : 1,
            borderTop: this.props.isOver && this.state.hoverUpperHalf ? '3px lightgray solid' : '3px transparent solid',
            borderBottom: this.props.isOver && !this.state.hoverUpperHalf ? '3px lightgray solid' : '3px transparent solid'
          },
          className: 'draggable-cell'
        },
        _react2.default.createElement(_cell2.default, this.props)
      )));
    }
  }]);

  return DraggableCell;
}(_react2.default.Component);

DraggableCell.propTypes = {
  cell: _react2.default.PropTypes.any,
  connectDragPreview: _react2.default.PropTypes.func.isRequired,
  connectDragSource: _react2.default.PropTypes.func.isRequired,
  connectDropTarget: _react2.default.PropTypes.func.isRequired,
  id: _react2.default.PropTypes.string,
  isDragging: _react2.default.PropTypes.bool.isRequired,
  isOver: _react2.default.PropTypes.bool.isRequired
};
DraggableCell.contextTypes = {
  dispatch: _react2.default.PropTypes.func
};


var source = new _reactDnd.DragSource('CELL', cellSource, collectSource);
var target = new _reactDnd.DropTarget('CELL', cellTarget, collectTarget);
exports.default = source(target(DraggableCell));