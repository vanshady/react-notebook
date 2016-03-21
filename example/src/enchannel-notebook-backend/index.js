import rxjs from '@reactivex/rxjs';

import { listRunningKernels, connectToKernel, startNewKernel, getKernelSpecs } from 'jupyter-js-services';

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

function _channelFromWs(ws, channelName) {
  return rxjs.Subject.create(ws, channelName);
}

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

export function connect(connectionOptions, kernelId) {
  return _getKernelById(connectionOptions, kernelId).then(kernel => {
    return {
      shell: _channelFromWs(kernel._ws, 'shell'),
      stdio: _channelFromWs(kernel._ws, 'stdio'),
      iopub: _channelFromWs(kernel._ws, 'iopub'),
      control: _channelFromWs(kernel._ws, 'control'),
    };
  });
}

export function disconnect(channels) {
  channels.shell.disconnect();
  channels.stdio.disconnect();
  channels.iopub.disconnect();
  channels.control.disconnect();
}

export function shutdown(connectionOptions, kernelId) {
  return _getKernelById(connectionOptions, kernelId).then(kernel => kernel.shutdown());
}
