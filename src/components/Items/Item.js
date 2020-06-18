import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Item(props) {
    const item = props.item
    return <div className='item'>
               <Link to={`/category/${item.category_id}/item/${item.id}`}>
                    <h2> {item.name} </h2>
                    <p> Description: {item.description} </p>
                    <p> Price: {item.price} </p>
               </Link>
           </div>
}

Item.propTypes = {
     item: PropTypes.object.isRequired
}

export default Item