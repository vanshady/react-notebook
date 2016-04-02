import * as Rx from '@reactivex/rxjs';

export default function createStore(initialState, reducers) {
  const subject = new Rx.Subject();

  const store = subject.scan(
    (state, action) => {
      if (!action || !action.type || ! (action.type in reducers)) {
        console.error('Action not registered'); // eslint-disable-line
        console.error(action); // eslint-disable-line
        console.error(action.type); // eslint-disable-line
        return state; // no reduction
      }

      return reducers[action.type].call(null, state, action);
    },
    initialState || {}
  ).share();

  const stateSymbol = Symbol('state');
  store.subscribe(state => {
    store[stateSymbol] = state;
  }, (err) => {
    console.error('Error in the store', err); // eslint-disable-line
  });
  store.getState = () => store[stateSymbol];

  function dispatch(action) {
    return typeof action === 'function'
      ? action.call(null, subject, dispatch)
      : subject.next(action);
  }

  return {
    store,
    dispatch,
  };
}
