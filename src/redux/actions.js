
export function startLoadingToken(user, loadType, errorPushType, history) {
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
                history.push(`/Categories`) 
            } else {
                console.log(data);
                history.push(errorPushType);
                //return <div> {data.message} </div>;
                //<Popup message={data.message} onHistory={this.props.onHistory} toggle={this.togglePop}/>
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


export function startLoadingCats() {
    return (dispatch) => {
        return fetch("http://127.0.0.1:5000/categories?offset=0")
            .then(res => res.json())
            .then(data => dispatch(loadCats(data)))
            .catch(error =>  {console.log(error)})    
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
