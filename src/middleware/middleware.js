import thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux';
//import { getNodeText } from '@testing-library/react';
import * as actions from '../redux/actions';

const middleware = store => next => async action => {
    if (!action.promise) {
      return next(action)
    } 

    const response = await action.promise;
    const {type, payload} = await handleResponse(response, action.type)

    next(actions.modifyState(type, payload, action.index))
}


async function handleResponse(response, type) {
  return response.json()
  .then(json => {
    console.log(response)
    if(response.ok || response.status >= 200 && response.status < 300) {
      return {
        type: `${type}_SUCCEEDED`,
        payload: json
        }
    }
    else {
      let error = Object.assign({}, json, {
        status: response.status,
        statusText: response.statusText
      })
      return {
        type: `${type}_FAILED`,
        payload: error
      }
    }
  }
  )
}


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


export const enhancer = composeEnhancers(
  applyMiddleware(middleware, thunk)
);

//https://medium.com/netscape/creating-custom-middleware-in-react-redux-961570459ecb#.9cu40l9hy
//https://www.freecodecamp.org/news/redux-thunk-explained-with-examples/