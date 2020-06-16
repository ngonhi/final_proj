import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Category(props) {
    console.log('Category')
    const cat = props.category
    return <div className='category'>
         <Link to={`/Category/${cat.id}`}>  
        <h2> {props.category.name} </h2>
        <p> {props.category.description} </p> </Link>
    </div>
}

Category.propTypes = {
     category: PropTypes.object.isRequired
}

export default Category

