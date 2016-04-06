'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acquireKernelInfo = acquireKernelInfo;
exports.executeCell = executeCell;

var _messaging = require('../api/messaging');

var _actions = require('../actions');

var Rx = require('rxjs');
var Immutable = require('immutable');

function acquireKernelInfo(channels) {
  var shell = channels.shell;


  var message = (0, _messaging.createMessage)('kernel_info_request');

  var obs = shell.childOf(message).ofMessageType('kernel_info_reply').first().pluck('content', 'language_info').map(_actions.setLanguageInfo).publishReplay(1).refCount();

  shell.next(message);
  return obs;
}

function executeCell(channels, id, source) {
  return Rx.Observable.create(function (subscriber) {
    if (!channels || !channels.iopub || !channels.shell) {
      subscriber.error('kernel not connected');
      subscriber.complete();
      return function () {};
    }

    var iopub = channels.iopub;
    var shell = channels.shell;

    // Track all of our subscriptions for full disposal

    var subscriptions = [];

    var executeRequest = (0, _messaging.createExecuteRequest)(source);

    // Limitation of the Subject implementation in enchannel
    // we must shell.subscribe in order to shell.next
    subscriptions.push(shell.subscribe(function () {}));

    // Set the current outputs to an empty list
    subscriber.next((0, _actions.updateCellOutputs)(id, new Immutable.List()));

    var childMessages = iopub.childOf(executeRequest).share();

    subscriptions.push(childMessages.ofMessageType(['execute_input']).pluck('content', 'execution_count').first().subscribe(function (ct) {
      subscriber.next((0, _actions.updateCellExecutionCount)(id, ct));
    }));

    // Handle all the nbformattable messages
    subscriptions.push(childMessages.ofMessageType(['execute_result', 'display_data', 'stream', 'error', 'clear_output']).map(_messaging.msgSpecToNotebookFormat)
    // Iteratively reduce on the outputs
    .scan(function (outputs, output) {
      if (output.output_type === 'clear_output') {
        return new Immutable.List();
      }
      return outputs.push(Immutable.fromJS(output));
    }, new Immutable.List())
    // Update the outputs with each change
    .subscribe(function (outputs) {
      subscriber.next((0, _actions.updateCellOutputs)(id, outputs));
    }));

    shell.next(executeRequest);

    return function executionDisposed() {
      subscriptions.forEach(function (sub) {
        return sub.unsubscribe();
      });
    };
  });
}