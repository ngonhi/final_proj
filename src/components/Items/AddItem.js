import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'

class AddItem extends Component {
    handleSubmit = (event) => {
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
            .then(() => {
                if(Object.keys(this.props.error).length !== 0) {
                    this.props.history.push(`/category/${cat_id}/addItem`)
                } else {
                    this.props.history.push(`/category/${cat_id}`)
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
        let error = this.props.error
        if (error) { error = this.handleError(error) }

        const cat_id = Number(this.props.match.params.cat_id)
        if (this.props.access_token) {
            return (
            <div>
                <NavBar {...this.props}/>
                <div className='form'>
                    <p> Add Item</p>
                    <form onSubmit={this.handleSubmit}> 
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

export default AddItem