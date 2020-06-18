import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import './style/stylesheets.css';
import App from './components/App';
import rootReducer from './redux/reducers';
import {loadFromLocalStorage, saveToLocalStorage} from './utils/localStorage'
import {enhancer} from './middleware/middleware'

window.$domain = 'http://localhost:5000'

const persistedState = loadFromLocalStorage()
const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}><BrowserRouter>
    <App/>
  </BrowserRouter></Provider>, 
  document.getElementById('root')
);




