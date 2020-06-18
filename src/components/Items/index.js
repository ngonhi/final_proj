import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Item from './Item'
import Logout from '../User/Logout'

class Items extends Component {
    render() {
        const {access_token, items} = this.props
        const items_list = items.items
        
        if(!access_token) {
            return <div className='loader'> Access denied </div>
        }

        else if (this.props.item_loading === true) {
            return <div className='loader'> ... loading </div>
        }

        else if (items) {
            return ( 
                <div>
                    <Logout/>
                    <center><p> There are a total of {items.total_items} items</p></center>
                    <div className='item-list'>
                        {items_list.map((item, index) => 
                            <Item item={item} key={index} index={index}/>)}
                        </div>
                </div>)
        }
    }
    
}

Items.propTypes = {
    items: PropTypes.object.isRequired
}


export default Items