import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Item(props) {
    const item = props.item
    let description 
    if (item.description.length === 0) {
        description = null
    } else {
        description = <p><b>Description:</b> {item.description} </p>
    }

    return <div className='item'>
               <Link to={`/category/${item.category_id}/item/${item.id}`}>
                    <h2> {item.name} </h2>
                    {description}
                    <p> <b>Price:</b> {item.price} </p>
               </Link>
           </div>
}

Item.propTypes = {
     item: PropTypes.object.isRequired
}

export default Item
