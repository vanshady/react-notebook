'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSaveAsDialog = showSaveAsDialog;

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _remote = require('remote');

var _remote2 = _interopRequireDefault(_remote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var dialog = _remote2.default.require('dialog');

function showSaveAsDialog(defaultPath) {
  return new Promise(function (resolve) {
    var filename = dialog.showSaveDialog({
      title: 'Save Notebook',
      defaultPath: defaultPath,
      filters: [{ name: 'Notebooks', extensions: ['ipynb'] }]
    });

    if (filename && path.extname(filename) === '') {
      resolve(filename + '.ipynb');
    }
    resolve(filename);
  });
}