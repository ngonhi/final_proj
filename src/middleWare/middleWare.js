import thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extensions options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);