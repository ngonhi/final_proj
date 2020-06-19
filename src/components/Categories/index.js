import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Category from './Category'
import Pagination from '../Pagination/index'
import NavBar from '../NavBar'

class Categories extends Component {
    state = {
        currentPage: 1,
        catsPerPage: process.env.REACT_APP_OBJ_PER_PAGE
    }

    paginate = (pageNumber) =>  {
        this.setState({currentPage: pageNumber})
        this.loadCategories(pageNumber)
    }

    loadCategories = (currentPage) => {
        const catsPerPage = this.state.catsPerPage
        const startIndex = currentPage * catsPerPage - catsPerPage
        const url = `${window.$domain}/categories/?offset=${startIndex}&limit=${catsPerPage}`
        this.props.fetchRequestObj("START_LOADING_CATEGORIES", url)
    }

    componentDidMount() {
        this.loadCategories(this.state.currentPage)
    }

    handleError = (error) => {
        if (Object.keys(error).length !== 0) {
          const {message, status, statusText} = error
          error = <div className='error'> {status} - {statusText} - {message} </div>
        } else {
          error = null
        }
        return error
    }

    render() {
        // Handle error
        let error = this.props.error
        if (error) { error = this.handleError(error) }
        if (error) {
            return <div> {error} </div>
        }

        const {access_token, categories} = this.props

        // Handle no authentication
        if(!access_token) {
            return (<div>
                <div className='loader'> User has not been authorized to see this content. 
                                        Please login again. </div>
                <div className='button-container'>
                    <Link to='/login' className='button'> Login </Link>
                </div>
            </div>)
        }

        // Handle categories not loaded
        if (Object.keys(categories).length === 0) {
            return <div className='loader'> ... loading </div>
        } else { // Categories loaded
            const categories_list = categories.categories
            if (categories_list) {
                return ( 
                    <div>
                        <NavBar {...this.props}/>
                        <Link className='add-icon' to='/addCategory'></Link>
                        <center><p> There are a total of {categories.total_categories} categories</p></center>
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