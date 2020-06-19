import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Logout from '../User/Logout'
import Item from './Item'

class EditItem extends Component {
    handleSubmit = (cat_id, item_id, index, item, event) => {
        this.props.clearError()
        event.preventDefault()
        const {name, des, price} = event.target.elements
        const editItem = { // Prefill non entered section
            "name": name.value ? name.value : item.name,
            "description": des.value ? des.value : item.description,
            "price": price.value ? price.value : item.price
        };

        if (name && des && price) {
            const url = window.$domain + '/categories/' + cat_id + '/items/' + item_id
            const option = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + this.props.access_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editItem)
            }
            this.props.fetchRequestObj("START_EDITING_ITEM", url, option, index)
            .then(() => {
                if(Object.keys(this.props.error).length !== 0) {
                    this.props.history.push(`/category/${cat_id}/editItem/${item_id}/${index}`)
                } else {
                    this.props.history.push(`/category/${cat_id}/item/${item_id}`)
                }
            })
        }
    }

    handleError = (error) => {
        if (Object.keys(error).length !== 0) {
          const {message, status, statusText} = error
          let mess_list = JSON.stringify(message)
          mess_list = mess_list.replace(/[\[\]{}]/g, '')
          mess_list = mess_list.replace(/[",]/g, ' ')
          error = <div className='error'> {status} - {statusText} - {mess_list} </div>
        } else {
          error = null
        }
    
        return error
    }

    render() {
        console.log(this.props)
        let error = this.props.error
        if (error) { error = this.handleError(error) }
        
        const {match, items, access_token} = this.props
        const cat_id = Number(match.params.cat_id)
        const item_id = Number(match.params.item_id)
        const index = Number(match.params.index)
        const item = items.items.find((item) => item.id === item_id)

        if (access_token) {
            return (
            <div>
                <Logout/>
                <center><Item item={item} index={index}/></center>
                <div className='form'>
                    <p> Edit Item</p>
                    <form onSubmit={(event) => 
                            this.handleSubmit(cat_id, item_id, index, item, event)}> 
                        <input type='text' placeholder='Name' name='name'></input>
                        <input type='text' placeholder='Description' name='des'></input>
                        <input type='text' placeholder='Price' name='price'></input>
                        <button> Insert </button>
                    </form>
                </div>
                {error}
            </div>)
        } else {
            return (<div>
                <div className='loader'> User has not been authorized to see this content. 
                                        Please login again. </div>
                <div className='button-container'>
                    <Link to='/login' className='button'> Login </Link>
                </div>
            </div>)
        }
    }
}

export default EditItem