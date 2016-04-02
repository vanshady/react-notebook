'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants$SET_NOTEBO;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _commutable = require('commutable');

var commutable = _interopRequireWildcard(_commutable);

var _uuid = require('uuid');

var uuid = _interopRequireWildcard(_uuid);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_constants$SET_NOTEBO = {}, _defineProperty(_constants$SET_NOTEBO, constants.SET_NOTEBOOK, function setNotebook(state, action) {
  return _extends({}, state, {
    notebook: action.data
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.UPDATE_CELL_EXECUTION_COUNT, function updateExecutionCount(state, action) {
  var id = action.id;
  var count = action.count;
  var notebook = state.notebook;

  return _extends({}, state, {
    notebook: commutable.updateExecutionCount(notebook, id, count)
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.MOVE_CELL, function moveCell(state, action) {
  var notebook = state.notebook;

  return _extends({}, state, {
    notebook: notebook.update('cellOrder', function (cellOrder) {
      var oldIndex = cellOrder.findIndex(function (id) {
        return id === action.id;
      });
      var newIndex = cellOrder.findIndex(function (id) {
        return id === action.destinationId;
      }) + (action.above ? 0 : 1);
      if (oldIndex === newIndex) {
        return cellOrder;
      }
      return cellOrder.splice(oldIndex, 1).splice(newIndex - (oldIndex < newIndex ? 1 : 0), 0, action.id);
    })
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.REMOVE_CELL, function removeCell(state, action) {
  var notebook = state.notebook;
  var id = action.id;

  return _extends({}, state, {
    notebook: commutable.removeCell(notebook, id)
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.NEW_CELL_AFTER, function newCellAfter(state, action) {
  // Draft API
  var cellType = action.cellType;
  var id = action.id;
  var notebook = state.notebook;

  var cell = cellType === 'markdown' ? commutable.emptyMarkdownCell : commutable.emptyCodeCell;
  var index = notebook.get('cellOrder').indexOf(id) + 1;
  var cellID = uuid.v4();
  return _extends({}, state, {
    notebook: commutable.insertCellAt(notebook, cell, cellID, index)
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.NEW_CELL_BEFORE, function newCellBefore(state, action) {
  // Draft API
  var cellType = action.cellType;
  var id = action.id;
  var notebook = state.notebook;

  var cell = cellType === 'markdown' ? commutable.emptyMarkdownCell : commutable.emptyCodeCell;
  var index = notebook.get('cellOrder').indexOf(id);
  var cellID = uuid.v4();
  return _extends({}, state, {
    notebook: commutable.insertCellAt(notebook, cell, cellID, index)
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.NEW_CELL_APPEND, function newCellAppend(state, action) {
  // Draft API
  var cellType = action.cellType;
  var notebook = state.notebook;

  var cell = cellType === 'markdown' ? commutable.emptyMarkdownCell : commutable.emptyCodeCell;
  var index = notebook.get('cellOrder').count();
  var cellID = uuid.v4();
  return _extends({}, state, {
    notebook: commutable.insertCellAt(notebook, cell, cellID, index)
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.UPDATE_CELL_SOURCE, function updateSource(state, action) {
  var id = action.id;
  var source = action.source;
  var notebook = state.notebook;

  return _extends({}, state, {
    notebook: commutable.updateSource(notebook, id, source)
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.UPDATE_CELL_OUTPUTS, function updateOutputs(state, action) {
  var id = action.id;
  var outputs = action.outputs;
  var notebook = state.notebook;

  return _extends({}, state, {
    notebook: commutable.updateOutputs(notebook, id, outputs)
  });
}), _defineProperty(_constants$SET_NOTEBO, constants.SET_LANGUAGE_INFO, function setLanguageInfo(state, action) {
  var langInfo = action.langInfo;
  var notebook = state.notebook;

  return _extends({}, state, {
    notebook: notebook.setIn(['metadata', 'language_info'], langInfo)
  });
}), _constants$SET_NOTEBO);