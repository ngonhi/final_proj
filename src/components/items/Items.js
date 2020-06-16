import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Item} from './index'
import {Logout} from '../User/index'

class Items extends Component {
    render() {
        console.log('Items')
        console.log(this.props)
        const access_token = this.props.access_token
        const items = this.props.items
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
                            <Item item={item} key={index}/>)}
                        </div>
                </div>)
        }
    }
    
}

Items.propTypes = {
    items: PropTypes.object.isRequired
}


export default Items