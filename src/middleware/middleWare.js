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

    if (type.includes('_SUCCEEDED')) {
      if (action.type === "START_LOADING_CATEGORIES") {
        store.dispatch(actions.loadCats(payload))
      } else if (action.type === "START_ADDING_CATEGORY") {
        store.dispatch(actions.addCat(payload))
      } else if (action.type === "START_LOADING_ITEMS") {
        store.dispatch(actions.loadItems(payload))
      } else if (action.type === "START_ADDING_ITEM") {
        store.dispatch(actions.addItem(payload))
      } else if (action.type === "START_EDITING_ITEM") {
        store.dispatch(actions.editItem(payload, action.index))
      } else if (action.type === "START_DELETING_ITEM") {
        store.dispatch(actions.deleteItem(action.index))
      } else if (action.type === "START_LOADING_USER") {
        store.dispatch(actions.loadUser(payload))
      } else if (action.type === "START_LOADING_TOKEN") {
        store.dispatch(actions.loadToken(payload['access_token']))
      } 
   } else if (type.includes('_FAILED')) {
          store.dispatch(actions.loadError(payload))
      }
}


async function handleResponse(response, type) {
  return response.json()
  .then(json => {
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