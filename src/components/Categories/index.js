import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Category from './Category'
import Logout from '../User/Logout'

class Categories extends Component {
    render() {
        console.log('Categories')
        const {access_token, categories} = this.props
        const categories_list = categories.categories
        
        if(!access_token) {
            return <div className='loader'> Access denied </div>
        }

        else if (this.props.loading === true) {
            return <div className='loader'> ... loading </div>
        }

        else if (categories) {
            return ( 
                <div>
                    <Logout/>
                    <Link className='add-icon' to='/AddCategory'></Link>
                    <center><p> There are a total of {categories.total_categories} categories</p></center>
                    <div className='cat-list'>
                        {categories_list.map((category, index) => 
                            <Category category={category} key={index}/>)}
                        </div>
                </div>)
        }
    }
    
}

Categories.propTypes = {
    categories: PropTypes.object.isRequired
}


export default Categories