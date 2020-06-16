// Action for Token
export function startLoadingToken(user, loadType, errorPushType, props) {
    return (dispatch) => {  
        const url = "http://127.0.0.1:5000/" + loadType
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if ('access_token' in data) {
                dispatch(loadToken(data['access_token']))
                dispatch(loadError([]))
                props.history.push(`/Categories`) 
            } else {
                if (loadType == 'registrations') {
                    const error = Object.values(data['message'])
                    dispatch(loadError(error))
                } else if (loadType == 'login') {
                    dispatch(loadError([data['message']]))
                } 
                props.history.push(errorPushType);
            }
        })
        .catch(error => console.log(error))
        }
}


export function loadToken(token) {
    return {
        type: 'LOAD_TOKEN',
        token
    }
}


// Actions for Categories
export function startLoadingCats() {
    return (dispatch) => {
        return fetch("http://127.0.0.1:5000/categories/?offset=0")
            .then(res => res.json())
            .then(data => dispatch(loadCats(data)))
            .catch(error =>  {console.log(error)})    
    }   
} 


export function startAddingCat(category, token) {
    return (dispatch) => {
        fetch('http://127.0.0.1:5000/categories/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            })
            .then(res => res.json())
            .then(data => dispatch(addCat(data))) // Need to solve for API error 
            .catch((error) => console.log(error.message))
    }
}


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
export function startLoadingItems(category_id) {
    return (dispatch) => {
        const url = "http://127.0.0.1:5000/categories/" + category_id + "/items/?offset=0"
        return fetch(url)
            .then(res => res.json())
            .then(data => dispatch(loadItems(data)))
            .catch(error =>  {console.log(error)})    
    }   
} 


export function startAddingItem(category_id, item, token) {
    return (dispatch) => {
        const url = 'http://127.0.0.1:5000/categories/' + category_id + '/items/'
        fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            .then(res => res.json())
            .then(data => dispatch(addItem(data))) // Need to solve for API error 
            .catch((error) => console.log(error.message))
    }
}


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




// Actions for Error
export function loadError(error) {
    return {
        type: 'LOAD_ERROR',
        error
    }
}