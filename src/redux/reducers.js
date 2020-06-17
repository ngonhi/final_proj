import {combineReducers} from 'redux'

function categories(state={}, action) {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return {'total_categories': state['total_categories'] + 1, 
                    'categories': [...state['categories'], action.cat]} 
        case 'LOAD_CATEGORIES':
            return action.cats
        default:
            return state
    }
}

function access_token(state='', action) {
    switch(action.type) {
        case 'LOAD_TOKEN':
            return action.token
        default:
            return state
    }
}

function error(state=[], action) {
    switch(action.type) {
        case 'LOAD_ERROR':
            return action.error
        default:
            return state
    }
}

function items(state={}, action) {
    switch(action.type) {
        case 'ADD_ITEM':
            return {'total_items': state['total_items'] + 1, 
                    'items': [...state['items'], action.item]} 
         case 'LOAD_ITEMS':
             return action.items
        case 'EDIT_ITEM':
             return {'total_items': state['total_items'] + 1, 
                    'items': [...state['items'].slice(0, action.index), action.item, ...state['items'].slice(action.index+1)]}
        case 'DELETE_ITEM':
             return {'total_items': state['total_items'] - 1, 
                    'items': [...state['items'].slice(0, action.index), ...state['items'].slice(action.index+1)]}
        default:
            return state
    }
}

const rootReducer = combineReducers({categories, access_token, error, items})

export default rootReducer