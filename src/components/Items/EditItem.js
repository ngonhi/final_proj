import React, {Component} from 'react'
import Logout from '../User/Logout'

class EditItem extends Component {
    handleSubmit = (event) => {
        event.preventDefault()
        const {name, des, price} = event.target.elements
        const item = {
                "name": name.value,
                "description": des.value,
                "price": price.value
            };
 
        const {cat_id, item_id, index} = this.props.match.params

        if (name && des && price) {
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
            this.props.history.push(`/category/${cat_id}/item/${item_id}`)
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