'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notebook = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createStore = createStore;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nteract = require('./nteract/');

var _nteract2 = _interopRequireDefault(_nteract);

var _provider = require('./util/provider');

var _provider2 = _interopRequireDefault(_provider);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _actions = require('./actions');

var _reducers = require('./reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function createStore() {
  var Rx = require('@reactivex/rxjs');

  var _createStoreRx = (0, _store2.default)({
    filename: 'test',
    executionState: 'not connected',
    notebook: null
  }, _reducers.reducers);

  var store = _createStoreRx.store;
  var dispatch = _createStoreRx.dispatch;


  store.pluck('channels').distinctUntilChanged().switchMap(function (channels) {
    if (!channels || !channels.iopub) {
      return Rx.Observable.of('not connected');
    }
    return channels.iopub.ofMessageType('status').pluck('content', 'execution_state');
  }).subscribe(function (st) {
    dispatch((0, _actions.setExecutionState)(st));
  });

  return {
    store: store,
    dispatch: dispatch
  };
}

var Notebook = exports.Notebook = function (_React$Component) {
  _inherits(Notebook, _React$Component);

  function Notebook(props) {
    _classCallCheck(this, Notebook);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Notebook).call(this, props));

    if (_this.props.store && _this.props.dispatch) {
      _this.store = _this.props.store;
      _this.dispatch = _this.props.dispatch;
    } else {
      var _createStore = createStore({
        filename: 'test',
        executionState: 'not connected',
        notebook: null
      });

      var store = _createStore.store;
      var dispatch = _createStore.dispatch;


      _this.store = store;
      _this.dispatch = dispatch;
    }

    _this.state = {
      channels: _this.props.channels
    };
    _this.store.subscribe(function (state) {
      return _this.setState(state);
    });
    return _this;
  }

  _createClass(Notebook, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.content) {
        this.dispatch((0, _actions.setNotebook)(this.props.content));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var dispatch = this.dispatch;
      var store = this.store;
      return _react2.default.createElement(
        _provider2.default,
        { rx: { dispatch: dispatch, store: store } },
        _react2.default.createElement(
          'div',
          null,
          this.state.err && _react2.default.createElement(
            'pre',
            null,
            this.state.err.toString()
          ),
          this.state.notebook && _react2.default.createElement(_nteract2.default, {
            notebook: this.state.notebook,
            channels: this.state.channels
          })
        )
      );
    }
  }]);

  return Notebook;
}(_react2.default.Component);

Notebook.propTypes = {
  content: _react2.default.PropTypes.object,
  store: _react2.default.PropTypes.object,
  dispatch: _react2.default.PropTypes.func,
  channels: _react2.default.PropTypes.object
};

exports.default = Notebook;