import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Item from '../Items/Item'
import {Logout} from '../User/index'

class SingleItem extends Component {
    componentDidMount() {
        const cat_id = Number(this.props.match.params.cat_id)
        this.props.setCatId(cat_id)
    }

    render() {
        console.log('SingleItem')
        const {match, items} = this.props
        const item_id = Number(match.params.item_id)
        const cat_id = Number(match.params.cat_id)

        if (!this.props.access_token) {
            return <div className='loader'> Access denied </div>
        }

        var items_list = []
        if (this.props.item_loading === false) {
            items_list = items.items
        }

        const item = items_list.find((item) => item.id === item_id)
        const index = items_list.findIndex((item) => item.id === item_id)

        if (this.props.item_loading === true) {
            return <div className='loader'>
                ...loading
            </div>     
        } else if (item) {
            return <div>
                <Logout/>
                <center>
                    <h2> Item Detail </h2>
                    <Item item={item} index={index}/>
                </center>
                <Link className='button' to={`/Category/${cat_id}/EditItem/${item_id}/${index}`}>Edit Item</Link>
                <button onClick = {() => {
                        this.props.startDeletingItem(item, cat_id, item_id, this.props.access_token, index) 
                        this.props.history.push(`/Category/${cat_id}`)
                    }}> 
                        Remove Item </button> 

            </div>
        } else {
            return <h1> No Item Found </h1>
        }
    }
}

export default SingleItem