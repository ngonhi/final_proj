import React, {Component} from 'react'
import Logout from '../User/Logout'

class AddItem extends Component {
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
        if (name && description && price) {
            this.props.startAddingItem(item, cat_id, this.props.access_token)
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