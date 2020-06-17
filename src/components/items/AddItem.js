import React, {Component} from 'react'
import Logout from '../User/Logout'

class AddItem extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const {name, des, price} = event.target.elements
        const item = {
                "name": name.value,
                "description": des.value,
                "price": price.value
            };
 
        const cat_id = Number(this.props.match.params.cat_id)

        if (name && des && price) {
            const url = window.$domain + '/categories/' + cat_id + '/items/'
            const option = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.props.access_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            }
            this.props.fetchRequestObj("START_ADDING_ITEM", url, option)
            this.props.history.push(`/Category/${cat_id}`)
        }
    }

    render() {
        console.log(this.props)
        const cat_id = Number(this.props.match.params.cat_id)
        console.log(cat_id)
        if (this.props.access_token) {
            return (
            <div>
                <Logout/>
                <div className='form'>
                    <p> Add Item</p>
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

export default AddItem