import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import Logout from '../User/Logout'
import Pagination from '../Pagination/index'

class Items extends Component {
    state = {
        currentPage: 1,
        itemsPerPage: 2
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
        console.log(currentPage)
        console.log(url)
        this.props.fetchRequestObj("START_LOADING_ITEMS", url)
        .then(() => this.props.setLoadingItem())
    }

    componentDidMount() {
        this.loadItems(this.state.currentPage)
    }

    render() {
        console.log(this.props)
        console.log('Items')
        const {access_token, items, item_loading} = this.props
        
        if(!access_token) {
            return <div className='loader'> Access denied </div>
        }

        if (item_loading) {
            return <div className='loader'> ... loading </div>
        } else if (!item_loading) {
            const items_list = items.items
            if (items_list) {
                return ( 
                    <div>
                        <Logout {...this.props}/>
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