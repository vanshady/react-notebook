'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reducers = require('./reducers');

var _provider = require('./components/util/provider');

var _provider2 = _interopRequireDefault(_provider);

var _notebook = require('./components/notebook');

var _notebook2 = _interopRequireDefault(_notebook);

var _actions = require('./actions');

var _keymap = require('./keys/keymap');

var _electron = require('electron');

var _menu = require('./menu');

var _nativeWindow = require('./native-window');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rx = require('@reactivex/rxjs');

_electron.ipcRenderer.on('main:load', function (e, launchData) {
  var _createStore = (0, _store2.default)({
    notebook: null,
    filename: launchData.filename,
    executionState: 'not connected'
  }, _reducers.reducers);

  var store = _createStore.store;
  var dispatch = _createStore.dispatch;


  store.pluck('channels').distinctUntilChanged().switchMap(function (channels) {
    if (!channels || !channels.iopub) {
      return Rx.Observable.of('not connected');
    }
    return channels.iopub.ofMessageType('status').pluck('content', 'execution_state');
  }).subscribe(function (st) {
    dispatch((0, _actions.setExecutionState)(st));
  });

  (0, _nativeWindow.initNativeHandlers)(store);
  (0, _keymap.initKeymap)(window, dispatch);
  (0, _menu.initMenuHandlers)(store, dispatch);

  var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
      _classCallCheck(this, App);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

      _this.state = {};
      store.subscribe(function (state) {
        return _this.setState(state);
      });
      return _this;
    }

    _createClass(App, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        dispatch((0, _actions.setNotebook)(launchData.notebook));
      }
    }, {
      key: 'render',
      value: function render() {
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
            this.state.notebook && _react2.default.createElement(_notebook2.default, {
              notebook: this.state.notebook,
              channels: this.state.channels
            })
          )
        );
      }
    }]);

    return App;
  }(_react2.default.Component);

  _reactDom2.default.render(_react2.default.createElement(App, null), document.querySelector('#app'));
});