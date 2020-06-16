import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Item(props) {
    const item = props.item
    return <div className='item'>
                <h2> {item.name} </h2>
                <p> {item.description} </p>
                <p> {item.price} </p>
           </div>
}

Item.propTypes = {
     item: PropTypes.object.isRequired
}

export default Item
