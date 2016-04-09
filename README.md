# react-notebook

[![Build Status](https://travis-ci.org/kerwin/react-notebook.svg?branch=master)](https://travis-ci.org/kerwin/react-notebook)

## Overview

:notebook: It's an React-based interactive notebook. mostly inspried by [nteract](https://github.com/nteract/nteract).

## Scope and goals

* Enable html rendering from ipynb file.
* Standalone cross-platform from desktop to web application.
* Store-Dispatch pattern with support multiple UI components.

### Usage

Install the package via npm.

```bash
npm install --save react-notebook
```

Render Jupyter notebook outputs in a trim little React component.

```jsx
import Notebook from 'react-notebook';

const notebook = require('PATH_TO_NOTEBOOK.ipynb');

const html = <Notebook contents={notebook} />;
```

or you can attach [enchannel](https://github.com/nteract/enchannel) and store,
dispatch to make it interactable.

```jsx
import * as enchannelBackend from 'enchannel-notebook-backend';
import { Notebook, createStore } from 'react-notebook'

// Prompt the user for the baseUrl and wsUrl
const baseUrl = 'http://localhost:8888';
const domain = baseUrl.split('://').slice(1).join('://');
const wsUrl = `ws://${domain}`;

// Create a connection options object
const connectionOptions = {
  baseUrl,
  wsUrl,
};

const { store, dispatch } = createStore({
  filename: 'test',
  executionState: 'not connected',
  notebook: null,
});

const notebook = require('PATH_TO_NOTEBOOK.ipynb');

enchannelBackend.spawn(connectionOptions, 'python3').then(id => {
  console.info('spawned', id); // eslint-disable-line
  return id;
}).catch(err => {
  console.error('could not spawn', err); // eslint-disable-line
  throw err;
}).then(id => {
  return Promise.all([id, enchannelBackend.connect(connectionOptions, id)]);
}).catch(err => {
  console.error('could not connect', err); // eslint-disable-line
  throw err;
}).then(args => {
  const id = args[0];
  const channels = args[1];
  console.info('connected', id, channels); // eslint-disable-line

  const html = <Notebook
                  store={store}
                  dispatch={dispatch}
                  channels={channels}
                  contents={notebook}
                />;
});
```

### Development

#### Python runtime

we need the jupyter-notebook installed:

```
pip install notebook
```

#### Install

Requires node 5.x, npm 3.

1. Fork this repo
2. Clone it `git clone https://github.com/kerwin/react-notebook`
3. `cd` to where you `clone`d it
4. `npm install`
5. `npm start`
