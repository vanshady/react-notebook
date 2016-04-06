'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStore(initialState, reducers) {
  var subject = new _rxjs2.default.Subject();

  var store = subject.scan(function (state, action) {
    if (!action || !action.type || !(action.type in reducers)) {
      console.error('Action not registered'); // eslint-disable-line
      console.error(action); // eslint-disable-line
      console.error(action.type); // eslint-disable-line
      return state; // no reduction
    }

    return reducers[action.type].call(null, state, action);
  }, initialState || {}).share();

  var stateSymbol = Symbol('state');
  store.subscribe(function (state) {
    store[stateSymbol] = state;
  }, function (err) {
    console.error('Error in the store', err); // eslint-disable-line
  });
  store.getState = function () {
    return store[stateSymbol];
  };

  function dispatch(action) {
    return typeof action === 'function' ? action.call(null, subject, dispatch) : subject.next(action);
  }

  return {
    store: store,
    dispatch: dispatch
  };
}