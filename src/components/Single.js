import React from 'react'
import Category from './Category'
import Item from './Item'
import Logout from './Logout'

function Single(props) {
    const {match, categories} = props
    const id = Number(match.params.id)
    
    if (!props.access_token) {
        return <div className='loader'> Access denied </div>
    }

    var categories_list = []
    if (props.loading === false) {
        categories_list = categories.categories
    }

    const category = categories_list.find((cat) => cat.id === id)

    if (props.loading === true) {
         return <div className='loader'>
             ...loading
        </div>     
    } else if (category) {
        return <div>
            <Logout/>
             <center><Category category={category} key={id}/></center>
             <Item/>
        </div>
    } else {
        return <h1> No Post Found </h1>
    }
}

export default Single