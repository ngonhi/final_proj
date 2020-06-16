import {combineReducers, bindActionCreators} from 'redux'

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
        //case 'ADD_ITEM':
            //return {...state, action.item}
         case 'LOAD_ITEMS':
             return action.items
        // case 'EDIT_ITEM':
        //     return action.item
        // case 'DELETE_ITEM':
        //     return action.item
        default:
            return state
    }
}

const rootReducer = combineReducers({categories, access_token, error, items})

export default rootReducer