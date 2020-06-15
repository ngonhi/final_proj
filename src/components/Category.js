import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Item from './Item'

function Category(props) {
    const cat = props.category
    return <div className='category'>
         <Link to={`/Category/${cat.id}`}>  
        <h2> {props.category.name} </h2>
        <p> {props.category.description} </p> </Link>
        <Item/>
    </div>
}

Category.propTypes = {
     category: PropTypes.object.isRequired
}

export default Category

