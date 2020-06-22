import { combineReducers } from 'redux';

function categories(state = {}, action) {
  switch (action.type) {
    case 'START_ADDING_CATEGORY_SUCCEEDED':
      return {
        total_categories: state.total_categories + 1,
        categories: [...state.categories, action.payload],
      };
    case 'START_LOADING_CATEGORIES_SUCCEEDED':
      return action.payload;
    default:
      return state;
  }
}

function accessToken(state = '', action) {
  switch (action.type) {
    case 'START_LOADING_TOKEN_SUCCEEDED':
      return action.payload.access_token;
    default:
      return state;
  }
}


function user(state = {}, action) {
  switch (action.type) {
    case 'START_LOADING_USER_SUCCEEDED':
      return action.payload;
    default:
      return state;
  }
}


function error(state = [], action) {
  switch (action.type) {
    case 'ERROR':
      return action.payload;
    case 'CLEAR_ERROR':
      return [];
    default:
      return state;
  }
}

function items(state = {}, action) {
  switch (action.type) {
    case 'START_ADDING_ITEM_SUCCEEDED':
      return {
        total_items: state.total_items + 1,
        items: [...state.items, action.payload],
      };
    case 'START_LOADING_ITEMS_SUCCEEDED':
      return action.payload;
    case 'START_EDITING_ITEM_SUCCEEDED':
      const foundIndex = state.items.findIndex(x => x.id === action.payload.id)
      return {
        total_items: state.total_items + 1,
        items: [...state.items.slice(0, foundIndex),
          action.payload,
          ...state.items.slice(foundIndex + 1)],
      };
    case 'START_DELETING_ITEM_SUCCEEDED':
      return {
        total_items: state.total_items - 1,
        items: state.items.filter(item => item.id !== action.item_id),
      };
    default:
      return state;
  }
}

const appReducer = combineReducers({
  categories, accessToken, error, items, user,
});
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
