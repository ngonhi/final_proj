import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './components/App';
import rootReducer from './redux/reducers';
import {loadFromLocalStorage, saveToLocalStorage} from './utils/localStorage'
import {enhancer} from './middleware/middleware'

require('dotenv').config()

window.$domain = process.env.REACT_APP_API_URL
if (process.env.REACT_APP_ENV === 'local') {
  require('./style/local_stylesheets.css')
} else if (process.env.REACT_APP_ENV === 'development') {
  require('./style/dev_stylesheets.css')
} else {
  require('./style/local_stylesheets.css')
}

const persistedState = loadFromLocalStorage()
const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <Provider store={store}><BrowserRouter>
    <App/>
  </BrowserRouter></Provider>, 
  document.getElementById('root')
);




