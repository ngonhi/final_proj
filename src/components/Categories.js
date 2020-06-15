import React from 'react'
import Category from './Category'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function Categories(props) {
    const categories = props.categories;
    const categories_list = categories.categories;
    
    if (props.loading === true) {
        return <div> ... loading </div>
    }

    else if (categories) {
        return ( 
            <div>
                <Link className='add-icon' to='/AddCategory'></Link>
                <center><p> There are a total of {categories.total_categories} categories</p></center>
                <div className='cat-list'>
                    {categories_list.map((category, index) => 
                        <Category category={category} key={index}/>)}
                    </div>
            </div>)
    }
    
}

Categories.propTypes = {
    categories: PropTypes.object.isRequired
}


export default Categories