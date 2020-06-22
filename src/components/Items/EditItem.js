import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import Item from './Item'

class EditItem extends Component {
    state = {
        submit: false
    }

    handleSubmit = (cat_id, item_id, index, item, event) => {
        if (Object.keys(this.props.error).length !== 0) {
            this.props.clearError()
          }
        event.preventDefault()
        
        this.setState({submit: true})
        const {name, des, price} = event.target.elements
        const editItem = { // Prefill non entered section
            "name": name.value ? name.value : item.name,
            "description": des.value ? des.value : item.description,
            "price": price.value ? price.value : item.price
        };

        if (name && des && price) {
            const domain = process.env.REACT_APP_API_URL
            const url = domain + '/categories/' + cat_id + '/items/' + item_id
            const option = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' +  this.props.accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editItem)
            }
            this.props.fetchRequestObj("START_EDITING_ITEM", url, option, index)
            .then(() => {
                if(Object.keys(this.props.error).length === 0) {
                    this.props.history.push(`/category/${cat_id}/item/${item_id}`)
                } else {
                    this.setState({submit: false})
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
          error = <div className='error'> {mess_list} </div>
        } else {
          error = null
        }
    
        return error
    }

    render() {
        let error = this.props.error
        if (error) { error = this.handleError(error) }
        
        const {match, items, accessToken} = this.props
        const cat_id = Number(match.params.cat_id)
        const item_id = Number(match.params.item_id)
        const index = Number(match.params.index)
        const item = items.items.find((item) => item.id === item_id)

        if (accessToken) {
            return (
            <div>
                <title> Editting Item </title>
                <NavBar {...this.props}/>
                <center><Item item={item} index={index}/></center>
                <div className='form'>
                    <p> Edit Item</p>
                    <form onSubmit={(event) => 
                            this.handleSubmit(cat_id, item_id, index, item, event)}> 
                        <input type='text' placeholder='Name' name='name'></input>
                        <input type='text' placeholder='Description' name='des'></input>
                        <input type='text' placeholder='Price' name='price'></input>
                        <button disabled={this.state.submit}> Edit </button>
                    </form>
                </div>
                {error}
            </div>)
        } else {
            return (<div>
                <div className='error'> User has not been authorized to see this content. 
                                        Please login again. </div>
                <div className='button-container'>
                    <Link to='/login' className='button'> Login </Link>
                </div>
            </div>)
        }
    }
}

export default EditItem