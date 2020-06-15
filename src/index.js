import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

import './style/stylesheets.css';
import App from './components/App';
import rootReducer from './redux/reducers';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extensions options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const saveToLocalStorage = (state) => {
  try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
  } catch (error) {
      console.log(error);
  }
};

const loadFromLocalStorage = (state) => {
  try {
      const serializedState = localStorage.getItem('state');
      if (serializedState == null) return undefined;
      return JSON.parse(serializedState);
  } catch (error) {
      return undefined;
  }
};

const persistedState = loadFromLocalStorage()//localStorage.getItem('access_token') //? JSON.parse(localStorage.getItem('access_token')) : '';
const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}><BrowserRouter>
    <App/>
  </BrowserRouter></Provider>, 
  document.getElementById('root')
);




