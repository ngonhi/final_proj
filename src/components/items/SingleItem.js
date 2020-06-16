import React, {Component} from 'react'
import Item from '../Items/Item' // Need to change to index
import {Logout} from '../User/index'

class SingleItem extends Component {
    componentDidMount() {
        const cat_id = Number(this.props.match.params.cat_id)
        this.props.setCatId(cat_id)
    }

    render() {
        console.log('SingleItem')
        const {match, items} = this.props
        const id = Number(match.params.item_id)
        if (!this.props.access_token) {
            return <div className='loader'> Access denied </div>
        }

        var items_list = []
        if (this.props.item_loading === false) {
            items_list = items.items
        }

        const item = items_list.find((item) => item.id === id)

        if (this.props.item_loading === true) {
            return <div className='loader'>
                ...loading
            </div>     
        } else if (item) {
            return <div>
                <Logout/>
                <center>
                    <h2> Item Detail </h2>
                    <Item item={item}/>
                </center>
            </div>
        } else {
            return <h1> No Item Found </h1>
        }
    }
}

export default SingleItem