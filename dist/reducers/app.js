'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants$NEW_KERNEL;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function cleanupKernel(state) {
  if (state.channels) {
    state.channels.shell.complete();
    state.channels.iopub.complete();
    state.channels.stdin.complete();
  }
  if (state.spawn) {
    state.spawn.kill();
  }

  var cleanState = _extends({}, state, {
    channels: null,
    spawn: null,
    connectionFile: null
  });

  return cleanState;
}

exports.default = (_constants$NEW_KERNEL = {}, _defineProperty(_constants$NEW_KERNEL, constants.NEW_KERNEL, function newKernel(state, action) {
  var channels = action.channels;
  var connectionFile = action.connectionFile;
  var spawn = action.spawn;


  return _extends({}, cleanupKernel(state), {
    channels: channels,
    connectionFile: connectionFile,
    spawn: spawn
  });
}), _defineProperty(_constants$NEW_KERNEL, constants.EXIT, function exit(state) {
  return cleanupKernel(state);
}), _defineProperty(_constants$NEW_KERNEL, constants.KILL_KERNEL, cleanupKernel), _defineProperty(_constants$NEW_KERNEL, constants.START_SAVING, function startSaving(state) {
  return _extends({}, state, { isSaving: true });
}), _defineProperty(_constants$NEW_KERNEL, constants.ERROR_KERNEL_NOT_CONNECTED, function alertKernelNotConnected(state) {
  return _extends({}, state, { error: 'Error: We\'re not connected to a runtime!' });
}), _defineProperty(_constants$NEW_KERNEL, constants.SET_EXECUTION_STATE, function setExecutionState(state, action) {
  var executionState = action.executionState;

  return _extends({}, state, { executionState: executionState });
}), _defineProperty(_constants$NEW_KERNEL, constants.DONE_SAVING, function doneSaving(state) {
  return _extends({}, state, { isSaving: false });
}), _defineProperty(_constants$NEW_KERNEL, constants.CHANGE_FILENAME, function changeFilename(state, action) {
  var filename = action.filename;

  if (!filename) {
    return state;
  }
  return _extends({}, state, { filename: filename });
}), _constants$NEW_KERNEL);