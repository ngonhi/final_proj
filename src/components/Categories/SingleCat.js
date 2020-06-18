import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Category from './Category'
import Items from '../Items/index'
import Logout from '../User/Logout'

class SingleCat extends Component {
    componentDidMount() {
        const cat_id = Number(this.props.match.params.id)
        this.props.setCatId(cat_id)
    }

    render() {
        console.log(this.props)
        const {match, categories, loading} = this.props
        const cat_id = Number(match.params.id)

        if (!this.props.access_token) {
            return <div className='loader'> Access denied </div>
        }

        if (loading && Object.keys(categories).length === 0) {
            return <div className='loader'>
                ...loading
            </div>     
        } else {
            const categories_list = categories.categories
            const category = categories_list.find((cat) => cat.id === cat_id)
            if (category) {
                return <div>
                    <Logout {...this.props}/>
                    <center>
                        <Category category={category}/>
                        <Link className='button' to={`/category/${cat_id}/addItem`}>Add Item</Link>
                    </center>
                    <Items cat_id={cat_id} {...this.props} item_loading={this.props.item_loading}/>
                </div>
            } else {
                return <h1> No Category Found </h1>
            }
        }
    }
}

export default SingleCat