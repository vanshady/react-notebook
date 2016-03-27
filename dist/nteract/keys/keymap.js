'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initKeymap = initKeymap;

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _atomKeymap = require('atom-keymap');

var _atomKeymap2 = _interopRequireDefault(_atomKeymap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function registerListeners(window, dispatch) {
  if (!window) throw new Error('window not defined');
  if (!dispatch) throw new Error('dispatch not defined');

  // Register action event listeners on the window for every known action.
  Object.keys(actions).forEach(function (actionName) {
    window.addEventListener('\'action:' + actionName, function () {
      try {
        dispatch(actions[actionName]());
      } catch (err) {
        console.error('key bound action invoke failure', actionName, err);
      }
    });
  });
}

function initKeymap(window, dispatch) {
  registerListeners(window, dispatch);

  var document = window.document;
  var keymaps = new _atomKeymap2.default();
  keymaps.defaultTarget = document.body;
  document.addEventListener('keydown', function (event) {
    return keymaps.handleKeyboardEvent(event);
  });

  // Add the keymap files, can also be specified as directories
  keymaps.add('/default-keymap', require('./default-map.json'));
  // keymaps.loadKeymap('/path/to/keymap-file.json');
}