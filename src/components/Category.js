import React from 'react'
import PropTypes from 'prop-types'
//import {Link} from 'react-router-dom'
import Item from './Item'

function Category(props) {

    return <div className='category'>
        <h2> {props.category.name} </h2>
        <p> {props.category.description} </p>
    </div>
}

Category.propTypes = {
     category: PropTypes.object.isRequired
}

export default Category