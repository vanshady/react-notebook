'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.launchKernel = launchKernel;

var _enchannelZmqBackend = require('enchannel-zmq-backend');

var _uuid = require('uuid');

var uuid = _interopRequireWildcard(_uuid);

var _spawnteract = require('spawnteract');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function launchKernel(kernelSpecName) {
  return (0, _spawnteract.launch)(kernelSpecName).then(function (c) {
    var kernelConfig = c.config;
    var spawn = c.spawn;
    var connectionFile = c.connectionFile;
    var identity = uuid.v4();
    var channels = {
      shell: (0, _enchannelZmqBackend.createShellSubject)(identity, kernelConfig),
      iopub: (0, _enchannelZmqBackend.createIOPubSubject)(identity, kernelConfig),
      control: (0, _enchannelZmqBackend.createControlSubject)(identity, kernelConfig),
      stdin: (0, _enchannelZmqBackend.createStdinSubject)(identity, kernelConfig)
    };
    return {
      channels: channels,
      connectionFile: connectionFile,
      spawn: spawn
    };
  });
}