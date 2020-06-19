import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Item from './Item'
import NavBar from '../NavBar'
import Pagination from '../Pagination/index'

class Items extends Component {
    state = {
        currentPage: 1,
        itemsPerPage: process.env.REACT_APP_OBJ_PER_PAGE
    }

    paginate = (pageNumber) =>  {
        this.setState({currentPage: pageNumber})
        this.loadItems(pageNumber)
    }

    loadItems = (currentPage) => {
        const cat_id = Number(this.props.cat_id)
        const itemsPerPage = this.state.itemsPerPage
        const startIndex = currentPage * itemsPerPage - itemsPerPage
        const url = `${window.$domain}/categories/${cat_id}/items/?offset=${startIndex}&limit=${itemsPerPage}`
        this.props.fetchRequestObj("START_LOADING_ITEMS", url)
    }

    componentDidMount() {
        this.loadItems(this.state.currentPage)
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
        
        const {access_token, items} = this.props
        
        if(!access_token) {
            return (<div>
                <div className='loader'> User has not been authorized to see this content. 
                                        Please login again. </div>
                <div className='button-container'>
                    <Link to='/login' className='button'> Login </Link>
                </div>
            </div>)
        }

        if (Object.keys(items).length === 0) {
            return <div className='loader'> ... loading </div>
        } else {
            const items_list = items.items
            if (items_list) {
                return ( 
                    <div>
                        <center><p> There are a total of {items.total_items} items</p></center>
                        <div className='item-list'>
                            {items_list.map((item, index) => 
                                <Item item={item} key={index} index={index}/>)}
                        </div>
                        <Pagination {...this.props} objsPerPage={this.state.itemsPerPage}
                                    totalObjs={items.total_items} paginate={this.paginate}/>    
                    </div>)
            } else {
                return <div className='loader'>No Items Found</div>
            }
        }
    }
}
 

Items.propTypes = {
    items: PropTypes.object.isRequired
}


export default Items