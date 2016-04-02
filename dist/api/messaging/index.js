'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMessage = createMessage;
exports.createExecuteRequest = createExecuteRequest;
exports.msgSpecToNotebookFormat = msgSpecToNotebookFormat;
exports.childOf = childOf;
exports.ofMessageType = ofMessageType;

var _uuid = require('uuid');

var uuid = _interopRequireWildcard(_uuid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Rx = require('@reactivex/rxjs'); /* eslint camelcase: 0 */ // <-- Per Jupyter message spec

var Observable = Rx.Observable;

var session = uuid.v4();

function createMessage(msg_type) {
  var username = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
  return {
    header: {
      username: username,
      session: session,
      msg_type: msg_type,
      msg_id: uuid.v4(),
      date: new Date(),
      version: '5.0'
    },
    metadata: {},
    parent_header: {},
    content: {}
  };
}

function createExecuteRequest(code) {
  var executeRequest = createMessage('execute_request');
  executeRequest.content = {
    code: code,
    silent: false,
    store_history: true,
    user_expressions: {},
    allow_stdin: false,
    stop_on_error: false
  };
  return executeRequest;
}

function msgSpecToNotebookFormat(msg) {
  return Object.assign({}, msg.content, {
    output_type: msg.header.msg_type
  });
}

/**
 * childOf filters out messages that don't have the parent header matching parentMessage
 * @param  {Object}  parentMessage Jupyter message protocol message
 * @return {Observable}               the resulting observable
 */
function childOf(parentMessage) {
  var _this = this;

  var parentMessageID = parentMessage.header.msg_id;
  return Observable.create(function (subscriber) {
    // since we're in an arrow function `this` is from the outer scope.
    // save our inner subscription
    var subscription = _this.subscribe(function (msg) {
      if (!msg.parent_header || !msg.parent_header.msg_id) {
        subscriber.error(new Error('no parent_header.msg_id on message'));
        return;
      }

      if (parentMessageID === msg.parent_header.msg_id) {
        subscriber.next(msg);
      }
    },
    // be sure to handle errors and completions as appropriate and
    // send them along
    function (err) {
      return subscriber.error(err);
    }, function () {
      return subscriber.complete();
    });

    // to return now
    return subscription;
  });
}

/**
 * ofMessageType is an Rx Operator that filters on msg.header.msg_type
 * being one of messageTypes
 * @param  {Array} messageTypes e.g. ['stream', 'error']
 * @return {Observable}                 the resulting observable
 */
function ofMessageType(messageTypes) {
  var _this2 = this;

  return Observable.create(function (subscriber) {
    // since we're in an arrow function `this` is from the outer scope.
    // save our inner subscription
    var subscription = _this2.subscribe(function (msg) {
      if (!msg.header || !msg.header.msg_type) {
        subscriber.error(new Error('no header.msg_type on message'));
        return;
      }

      if (messageTypes.indexOf(msg.header.msg_type) !== -1) {
        subscriber.next(msg);
      }
    },
    // be sure to handle errors and completions as appropriate and
    // send them along
    function (err) {
      return subscriber.error(err);
    }, function () {
      return subscriber.complete();
    });

    // to return now
    return subscription;
  });
}

Observable.prototype.childOf = childOf;
Observable.prototype.ofMessageType = ofMessageType;