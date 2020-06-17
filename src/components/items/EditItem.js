import React, {Component} from 'react'
import Logout from '../User/Logout'

class EditItem extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const name = event.target.elements.name.value
        const description = event.target.elements.des.value
        const price = event. target.elements.price.value
        const item = {
                "name": name,
                "description": description,
                "price": price
            };
 
        const cat_id = Number(this.props.match.params.cat_id)
        const item_id = Number(this.props.match.params.item_id)
        const index = Number(this.props.match.params.index)
        if (name && description && price) {
            const url = window.$domain + '/categories/' + cat_id + '/items/' + item_id
            const option = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + this.props.access_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            }
            this.props.fetchRequestObj("START_EDITING_ITEM", url, option, index)
            this.props.history.push(`/Category/${cat_id}/Item/${item_id}`)
        }
    }

    render() {
        console.log(this.props)
        if (this.props.access_token) {
            return (
            <div>
                <Logout/>
                <div className='form'>
                    <p> Edit Item</p>
                    <form onSubmit={this.handleSubmit}> 
                        <input type='text' placeholder='Name' name='name'></input>
                        <input type='text' placeholder='Description' name='des'></input>
                        <input type='text' placeholder='Price' name='price'></input>
                        <button> Insert </button>
                    </form>
                </div>
                
            </div>)
        } else {
            return <div className='loader'> Access denied </div>
        }
    }
}

export default EditItem