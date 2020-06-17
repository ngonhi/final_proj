export const fetchRequestObj = (type, url, option={}, index= 0) => {
    return {
    type: type,
    promise: fetch(url, option),
    index: index
}}


// Action for User
export function loadToken(token) {
    return {
        type: 'LOAD_TOKEN',
        token
    }
}


export function loadUser(user) {
    return {
        type: 'LOAD_USER',
        user
    }
}


// Actions for Categories
export function addCat(cat) {
    return {
        type: 'ADD_CATEGORY',
        cat
    }
}


export function loadCats(cats) {
    return {
        type: 'LOAD_CATEGORIES',
        cats
    }
}


// Actions for Items
export function loadItems(items) {
    return {
        type: 'LOAD_ITEMS',
        items
    }
}


export function addItem(item) {
    return {
        type: 'ADD_ITEM',
        item
    }
}


export function editItem(item, index) {
    return {
        type: 'EDIT_ITEM',
        item, 
        index
    }
}


export function deleteItem(index) {
    return {
        type: 'DELETE_ITEM',
        index
    }
}

// Actions for Error
export function loadError(error) {
    return {
        type: 'LOAD_ERROR',
        error
    }
}