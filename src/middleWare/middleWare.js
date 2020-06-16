import thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

export const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

//https://medium.com/netscape/creating-custom-middleware-in-react-redux-961570459ecb#.9cu40l9hy