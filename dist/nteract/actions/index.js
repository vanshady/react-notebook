'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exit = exit;
exports.setExecutionState = setExecutionState;
exports.killKernel = killKernel;
exports.setLanguageInfo = setLanguageInfo;
exports.save = save;
exports.saveAs = saveAs;
exports.setNotebook = setNotebook;
exports.updateCellSource = updateCellSource;
exports.updateCellOutputs = updateCellOutputs;
exports.moveCell = moveCell;
exports.removeCell = removeCell;
exports.createCellAfter = createCellAfter;
exports.createCellBefore = createCellBefore;
exports.createCellAppend = createCellAppend;
exports.updateCellExecutionCount = updateCellExecutionCount;
exports.executeCell = executeCell;

var _commutable = require('commutable');

var commutable = _interopRequireWildcard(_commutable);

var _agendas = require('../agendas');

var agendas = _interopRequireWildcard(_agendas);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function exit() {
  return {
    type: constants.EXIT
  };
}

function setExecutionState(executionState) {
  return {
    type: constants.SET_EXECUTION_STATE,
    executionState: executionState
  };
}

function killKernel() {
  return {
    type: constants.KILL_KERNEL
  };
}

function setLanguageInfo(langInfo) {
  return {
    type: constants.SET_LANGUAGE_INFO,
    langInfo: langInfo
  };
}

function save(filename) {
  return function (subject) {
    // If there isn't a filename, save-as it instead
    if (!filename) {
      throw new Error('save needs a filename');
    }

    subject.next({
      type: constants.START_SAVING
    });
    subject.next({
      type: constants.DONE_SAVING
    });
  };
}

function saveAs(filename, notebook) {
  return function (subject, dispatch) {
    subject.next({
      type: constants.CHANGE_FILENAME,
      filename: filename
    });
    dispatch(save(filename, notebook));
  };
}

function setNotebook(nbData) {
  return function (subject) {
    var data = commutable.fromJS(nbData);
    subject.next({
      type: constants.SET_NOTEBOOK,
      data: data
    });
  };
}

function updateCellSource(id, source) {
  return {
    type: constants.UPDATE_CELL_SOURCE,
    id: id,
    source: source
  };
}

function updateCellOutputs(id, outputs) {
  return {
    type: constants.UPDATE_CELL_OUTPUTS,
    id: id,
    outputs: outputs
  };
}

function moveCell(id, destinationId, above) {
  return {
    type: constants.MOVE_CELL,
    id: id,
    destinationId: destinationId,
    above: above
  };
}

function removeCell(id) {
  return {
    type: constants.REMOVE_CELL,
    id: id
  };
}

function createCellAfter(cellType, id) {
  return {
    type: constants.NEW_CELL_AFTER,
    cellType: cellType,
    id: id
  };
}

function createCellBefore(cellType, id) {
  return {
    type: constants.NEW_CELL_BEFORE,
    cellType: cellType,
    id: id
  };
}

function createCellAppend(cellType) {
  return {
    type: constants.NEW_CELL_APPEND,
    cellType: cellType
  };
}

function updateCellExecutionCount(id, count) {
  return {
    type: constants.UPDATE_CELL_EXECUTION_COUNT,
    id: id,
    count: count
  };
}

function executeCell(channels, id, source) {
  return function (subject) {
    var obs = agendas.executeCell(channels, id, source);
    obs.subscribe(function (action) {
      subject.next(action);
    }, function (error) {
      subject.next({ type: constants.ERROR_KERNEL_NOT_CONNECTED, message: error });
    });
  };
}