'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;

var _rxjs = require('@reactivex/rxjs');

var Rx = _interopRequireWildcard(_rxjs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createStore(initialState, reducers) {
  var subject = new Rx.Subject();

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