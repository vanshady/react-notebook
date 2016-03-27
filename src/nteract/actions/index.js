import * as commutable from 'commutable';

import * as agendas from '../agendas';
import * as constants from '../constants';

export function exit() {
  return {
    type: constants.EXIT,
  };
}

export function setExecutionState(executionState) {
  return {
    type: constants.SET_EXECUTION_STATE,
    executionState,
  };
}

export function killKernel() {
  return {
    type: constants.KILL_KERNEL,
  };
}

export function setLanguageInfo(langInfo) {
  return {
    type: constants.SET_LANGUAGE_INFO,
    langInfo,
  };
}

export function save(filename) {
  return (subject) => {
    // If there isn't a filename, save-as it instead
    if (!filename) {
      throw new Error('save needs a filename');
    }

    subject.next({
      type: constants.START_SAVING,
    });
    subject.next({
      type: constants.DONE_SAVING,
    });
  };
}

export function saveAs(filename, notebook) {
  return (subject, dispatch) => {
    subject.next({
      type: constants.CHANGE_FILENAME,
      filename,
    });
    dispatch(save(filename, notebook));
  };
}

export function setNotebook(nbData) {
  return (subject) => {
    const data = commutable.fromJS(nbData);
    subject.next({
      type: constants.SET_NOTEBOOK,
      data,
    });
  };
}

export function updateCellSource(id, source) {
  return {
    type: constants.UPDATE_CELL_SOURCE,
    id,
    source,
  };
}

export function updateCellOutputs(id, outputs) {
  return {
    type: constants.UPDATE_CELL_OUTPUTS,
    id,
    outputs,
  };
}

export function moveCell(id, destinationId, above) {
  return {
    type: constants.MOVE_CELL,
    id,
    destinationId,
    above,
  };
}

export function removeCell(id) {
  return {
    type: constants.REMOVE_CELL,
    id,
  };
}

export function createCellAfter(cellType, id) {
  return {
    type: constants.NEW_CELL_AFTER,
    cellType,
    id,
  };
}

export function createCellBefore(cellType, id) {
  return {
    type: constants.NEW_CELL_BEFORE,
    cellType,
    id,
  };
}

export function createCellAppend(cellType) {
  return {
    type: constants.NEW_CELL_APPEND,
    cellType,
  };
}

export function updateCellExecutionCount(id, count) {
  return {
    type: constants.UPDATE_CELL_EXECUTION_COUNT,
    id,
    count,
  };
}

export function executeCell(channels, id, source) {
  return (subject) => {
    const obs = agendas.executeCell(channels, id, source);
    obs.subscribe(action => {
      subject.next(action);
    }, (error) => {
      subject.next({ type: constants.ERROR_KERNEL_NOT_CONNECTED, message: error });
    });
  };
}
