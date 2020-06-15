import React from 'react'
import Category from './Category'
import Item from './Item'
import Logout from './Logout'

function Single(props) {
    console.log(props)
    
    const {match, categories} = props
    const id = Number(match.params.id)
    
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