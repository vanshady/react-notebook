const Rx = require('rxjs');
import { listRunningKernels, connectToKernel, startNewKernel, getKernelSpecs } from 'jupyter-js-services';

/**
 * Gets a kernel object by id
 * @param  {object} connectionOptions jupyter-js-services connections object
 * @param  {string} kernelId          id of the kernel, obtained from `spawn`
 * @return {Promise<object>}          Promise for a kernel object returned from
 *                                    jupyter-js-services
 */
function _getKernelById(connectionOptions, kernelId) {
  return listRunningKernels(connectionOptions).then(kernelModels => {
    // Find the kernel model by id
    const model = kernelModels.filter(m => m.id === kernelId);
    if (model.length === 0) throw new Error(`Kernel "${kernelId}" does not exist`);

    // Create the kconnection options object and merge with the connectionOptions.
    const kernelConnectionOptions = Object.assign({
      name: model[0].name,
    }, connectionOptions);

    // Shutdown
    return connectToKernel(kernelId, kernelConnectionOptions);
  });
}

/**
 * Returns a websocket given a jupyter-js-services kernel
 *
 * This method creates a clone of the websocket stored inside the
 * jupyter-js-services kernel instance.  It then quietly closes and disposes
 * of the kernel object and its websocket.
 * @param  {object} kernel kernel object returned from jupyter-js-services
 * @return {WebSocket}     websocket
 */
function _stealKernelWebsocket(kernel) {
  const wsUrl = kernel._ws.url;
  kernel._ws.onclose = null;
  kernel._ws.close();
  kernel.dispose();

  return new WebSocket(wsUrl);
}

/**
 * Create an observable from a websocket
 * @param  {WebSocket} ws
 * @return {Observable}
 */
function _wsObservable(ws) {
  return new Rx.Observable(subscriber => {
    ws.onmessage = msg => {
      try {
        subscriber.next(msg);
      } catch (error) { /* nom nom nom */ }
    };
    ws.onclose = () => {
      try {
        subscriber.complete();
      } catch (error) { /* nom nom nom */ }
    };
    ws.onerror = error => {
      try {
        subscriber.error(error);
      } catch (error2) { /* nom nom nom */ }
    };
  });
}

/**
 * Convert a kernel object to a Subject
 * @param  {object} kernel    kernel object returned from jupyter-js-services
 * @return {Promise<Subject>} promise for a subject that can be used to
 *                            communicate to the kernel via a websocket.
 */
function _kernelToSubject(kernel) {
  const ws = _stealKernelWebsocket(kernel);
  return (new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  })).then(() => {
    const subscriber = Rx.Subscriber.create(msg => {
      ws.send(JSON.stringify(Object.assign({
        idents: [],
        header: {},
        parent_header: {},
        metadata: {},
        content: {},
        blobs: [],
        signatureOK: null,
      }, msg)));
    }, err => {
      console.error(err); // eslint-disable-line
    }, () => {
      ws.close();
    });

    const observable = _wsObservable(ws)
      .map(event => JSON.parse(event.data))
      .publish()
      .refCount();

    return Rx.Subject.create(subscriber, observable);
  });
}

/**
 * Recursive Object.freeze, does not handle functions since Jupyter messages
 * are plain JSON.
 * @param {Object} obj object to deeply freeze
 * @return {Object} the immutable object
 */
function _deepFreeze(obj) {
  // Freeze properties before freezing self
  Object.getOwnPropertyNames(obj).forEach(name => {
    const prop = obj[name];
    if (typeof prop === 'object' && prop !== null && !Object.isFrozen(prop)) {
      _deepFreeze(prop);
    }
  });
  // Freeze self
  return Object.freeze(obj);
}

/**
 * Create a channel Subject from a multiplexed Subject
 * @param  {Subject} wsSubject
 * @param  {string} channelName  Jupyter spec channel name
 * @return {Subject}
 */
function _multiplexChannel(wsSubject, channelName) {
  const subscriber = Rx.Subscriber.create(
    msg => {
      wsSubject.next(Object.assign({
        channel: channelName,
      }, msg));
    },
    err => {
      console.error(err); // eslint-disable-line
    },
    () => {
      wsSubject.complete();
    }
  );

  const observable = wsSubject
    .filter(msg => msg.channel === channelName)
    .map(msg => {
      return _deepFreeze(msg);
    });

  return Rx.Subject.create(subscriber, observable);
}

/**
 * Spawns a kernel by name
 * @param  {object} connectionOptions jupyter-js-services connections object
 * @param  {string} kernelName        name of the kernel to spawn
 * @return {Promise<string>}          promise for the kernel id
 */
export function spawn(connectionOptions, kernelName) {
  return getKernelSpecs(connectionOptions).then(kernelSpecs => {
    // Create a new spawn options object and merge the connectionOptions
    const spawnOptions = Object.assign({
      name: kernelName || kernelSpecs.default,
    }, connectionOptions);

    // Spawn a kernel
    return startNewKernel(spawnOptions).then(kernel => kernel.id);
  });
}

/**
 * Connect to a kernel by id
 * @param  {object} connectionOptions jupyter-js-services connections object
 * @param  {string} kernelId          id of the kernel, obtained from `spawn`
 * @return {Promise<object>}          Promise for an enchannel spec channels object.
 */
export function connect(connectionOptions, kernelId) {
  return _getKernelById(connectionOptions, kernelId).then(kernel => {
    return _kernelToSubject(kernel);
  }).then(wsSubject => {
    return {
      shell: _multiplexChannel(wsSubject, 'shell'),
      stdio: _multiplexChannel(wsSubject, 'stdio'),
      iopub: _multiplexChannel(wsSubject, 'iopub'),
      control: _multiplexChannel(wsSubject, 'control'),
    };
  });
}

/**
 * Disconnects from a kernel
 * @param  {object} channels enchannel spec channels object, obtained from `connect`
 * @return {Promise}         Promise that resolves when disconnection is finished
 */
export function disconnect(channels) {
  channels.shell.complete();
  channels.stdio.complete();
  channels.iopub.complete();
  channels.control.complete();
  return Promise.resolve();
}

/**
 * Shuts down a remote kernel by id
 * @param  {object} connectionOptions jupyter-js-services connections object
 * @param  {string} kernelId          id of the kernel, obtained from `spawn`
 * @return {Promise}                  Promise that resolves when the kernel is shutdown
 */
export function shutdown(connectionOptions, kernelId) {
  return _getKernelById(connectionOptions, kernelId).then(kernel => kernel.shutdown());
}
