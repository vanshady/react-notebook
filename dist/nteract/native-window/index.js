'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initNativeHandlers = initNativeHandlers;

var _remote = require('remote');

function initNativeHandlers(store) {
  store.map(function (state) {
    var executionState = state.executionState;
    var filename = state.filename;

    return (filename || 'Untitled') + ' - ' + executionState;
  }).distinctUntilChanged().debounceTime(200).subscribe(function (title) {
    var win = (0, _remote.getCurrentWindow)();
    win.setTitle(title);
  });
}