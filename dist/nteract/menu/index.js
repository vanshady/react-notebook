'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchSaveAs = dispatchSaveAs;
exports.triggerSaveAs = triggerSaveAs;
exports.dispatchSave = dispatchSave;
exports.dispatchNewkernel = dispatchNewkernel;
exports.dispatchKillKernel = dispatchKillKernel;
exports.initMenuHandlers = initMenuHandlers;

var _save = require('../api/save');

var _actions = require('../actions');

var _electron = require('electron');

function dispatchSaveAs(store, dispatch, evt, filename) {
  var state = store.getState();
  var notebook = state.notebook;

  dispatch((0, _actions.saveAs)(filename, notebook));
}

function triggerSaveAs(store, dispatch) {
  (0, _save.showSaveAsDialog)().then(function (filename) {
    if (!filename) {
      return;
    }

    var _store$getState = store.getState();

    var notebook = _store$getState.notebook;

    dispatch((0, _actions.saveAs)(filename, notebook));
  });
}

function dispatchSave(store, dispatch) {
  var state = store.getState();
  var notebook = state.notebook;
  var filename = state.filename;

  if (!filename) {
    triggerSaveAs(store, dispatch);
  } else {
    dispatch((0, _actions.save)(filename, notebook));
  }
}

function dispatchNewkernel(store, dispatch, evt, name) {
  dispatch((0, _actions.newKernel)(name));
}

function dispatchKillKernel(store, dispatch) {
  dispatch((0, _actions.killKernel)());
}

function initMenuHandlers(store, dispatch) {
  _electron.ipcRenderer.on('menu:new-kernel', dispatchNewkernel.bind(null, store, dispatch));
  _electron.ipcRenderer.on('menu:save', dispatchSave.bind(null, store, dispatch));
  _electron.ipcRenderer.on('menu:save-as', dispatchSaveAs.bind(null, store, dispatch));
  _electron.ipcRenderer.on('menu:kill-kernel', dispatchKillKernel.bind(null, store, dispatch));
}