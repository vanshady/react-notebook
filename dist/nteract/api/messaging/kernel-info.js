'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = kernelInfo;

var _index = require('./index');

/**
 * Requests information about the running kernel
 *
 * http://jupyter-client.readthedocs.org/en/latest/messaging.html#kernel-info
 *
 * @param  {Object} channels    enchannel collection of subjects
 * @return {Promise}            A promise that resolves to a kernel_info_reply
 */
function kernelInfo(channels) {
  if (!channels || !channels.shell) {
    throw new Error('shell channel not available for sending kernel info request');
  }
  var shell = channels.shell;


  var message = (0, _index.createMessage)('kernel_info_request');

  var p = shell.childOf(message).ofMessageType('kernel_info_reply').pluck('content').first().toPromise();

  shell.next(message);
  return p;
}