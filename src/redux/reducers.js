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

const rootReducer = combineReducers({categories, access_token})

export default rootReducer