import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Category(props) {
    const cat = props.category
    let description 
    if (cat.description.length === 0) {
        description = null
    } else {
        description = <p><b>Description:</b> {cat.description} </p>
    }
    
    return <div className='category'>
         <Link to={`/category/${cat.id}`}>  
            <h2> {cat.name} </h2>
            {description}
        </Link>
    </div>
}

Category.propTypes = {
     category: PropTypes.object.isRequired
}

export default Category

