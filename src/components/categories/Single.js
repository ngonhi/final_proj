import React, {Component} from 'react'
import Category from './Category'
import Items from '../items/Items'
import Logout from '../user/Logout'

class Single extends Component {
    state = {
        item_loading: true
      }

    componentDidMount() {
        const cat_id = Number(this.props.match.params.id)
        console.log(cat_id)
        this.props.startLoadingItems(cat_id)
        .then(() => this.setState({item_loading: false}))
    }

    render() {
        console.log(this.props)
        console.log(this.state)
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

        if (this.props.loading === true) {
            return <div className='loader'>
                ...loading
            </div>     
        } else if (category) {
            return <div>
                <Logout/>
                <center><Category category={category} key={id}/></center>
                <Items {...this.props} loading={this.state.item_loading}/>
            </div>
        } else {
            return <h1> No Post Found </h1>
        }
    }
}

export default Single