import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Category from './Category'
import Pagination from '../Pagination/index'
import Logout from '../User/Logout'

class Categories extends Component {
    state = {
        currentPage: 1,
        catsPerPage: 2
    }

    paginate = (pageNumber) =>  {
        this.setState({currentPage: pageNumber})
        this.loadCategories(pageNumber)
    }

    loadCategories = (currentPage) => {
        console.log('load cats')
        const catsPerPage = this.state.catsPerPage
        const startIndex = currentPage * catsPerPage - catsPerPage
        const url = `${window.$domain}/categories/?offset=${startIndex}&limit=${catsPerPage}`
        console.log(currentPage)
        console.log(url)
        this.props.fetchRequestObj("START_LOADING_CATEGORIES", url)
        .then(() => this.props.setLoading())
    }

    componentDidMount() {
        this.loadCategories(this.state.currentPage)
    }

    render() {
        console.log(this.state)
        const {access_token, categories, loading} = this.props
        
        if(!access_token) {
            return <div className='loader'> Access denied </div>
        }

        if (loading && Object.keys(categories).length === 0) {
            return <div className='loader'> ... loading </div>
        } else {
            const categories_list = categories.categories
            if (categories_list) {
                return ( 
                    <div>
                        <Logout {...this.props}/>
                        <Link className='add-icon' to='/addCategory'></Link>
                        <center><p> There are a total of {categories.total_catgories} categories</p></center>
                        <div className='cat-list'>
                            {categories_list.map((category, index) => 
                                <Category category={category} key={index}/>)}
                        </div>
                        <Pagination {...this.props} objsPerPage={this.state.catsPerPage}
                                    totalObjs={categories.total_categories} paginate={this.paginate}/>
                        
                    </div>)
            } else {
                return <div className='loader'>No Categories Found</div>
            }
        }
    }
    
}

Categories.propTypes = {
    categories: PropTypes.object.isRequired
}


export default Categories