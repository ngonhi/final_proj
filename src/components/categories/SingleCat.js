import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Category from './Category'
import Items from '../Items/Items' // Need to change to index
import Logout from '../User/Logout'

class SingleCat extends Component {
    componentDidMount() {
        console.log('mount cat')
        const cat_id = Number(this.props.match.params.id)
        this.props.setCatId(cat_id)
    }

    // componentDidUpdate() {
    //     console.log('update cat')
    //     const cat_id = Number(this.props.match.params.id)
    //     this.props.setCatId(cat_id)
    // }

    render() {
        console.log('SingleCat')
        console.log(this.props)
        const {match, categories} = this.props
        const id = Number(match.params.id)

        if (!this.props.access_token) {
            return <div className='loader'> Access denied </div>
        }

        var categories_list = []
        if (this.props.loading === false) {
            categories_list = categories.categories
        }

        const category = categories_list.find((cat) => cat.id === id)

        if (this.props.loading === true || this.props.item_loading === true) {
            return <div className='loader'>
                ...loading
            </div>     
        } else if (category) {
            return <div>
                <Logout/>
                <center><Category category={category}/>
                <Link className='button' to={`/Category/${id}/AddItem`}>Add Item</Link>
                </center>
                <Items {...this.props} item_loading={this.props.item_loading}/>
            </div>
        } else {
            return <h1> No Category Found </h1>
        }
    }
}

export default SingleCat