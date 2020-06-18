import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Category(props) {
    const cat = props.category
    return <div className='category'>
         <Link to={`/category/${cat.id}`}>  
        <h2> {cat.name} </h2>
        <p> {cat.description} </p> </Link>
    </div>
}

Category.propTypes = {
     category: PropTypes.object.isRequired
}

export default Category

