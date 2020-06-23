import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import Item from './Item'

class EditItem extends Component {
    state = {
        name: '',
        description: '',
        price: '',
        submit: false
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    handlePriceChange = (event) => {
        this.setState({price: event.target.value})
    }

    handleValidation = () => {
        let formIsValid = true
        const {name, description, price} = this.state
        let errors = {}

        if(name.length > 0 && name.length < 5) {
            formIsValid = false;
            errors["name"] = "Name has to contain at least 5 characters"
        } else if (name.length > 40) {
            formIsValid = false;
            errors["name"] = "Name can only contain at most 40 characters"
        }

        if (description.length > 200) {
            formIsValid = false;
            errors["description"] = "Description can only contain at most 200 characters"
        }

        if (price < 0) {
            formIsValid = false;
            errors["price"] = "Price cannot be negative"
        }
        
        return {errors, formIsValid}
    }

    handleSubmit = (cat_id, item_id, item, event) => {
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
            this.props.fetchRequestObj("START_EDITING_ITEM", url, option)
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
          const message = error.message
          let mess_list = JSON.stringify(message)
          mess_list = mess_list.replace(/[\[\]{}]/g, '')
          mess_list = mess_list.replace(/[",]/g, ' ')
          error = <div className='error'> {mess_list} </div>
        } else {
          error = null
        }
    
        return error
    }

    canBeSubmitted = () => {
        const {errors, formIsValid}  = this.handleValidation()
        const isEnabled = formIsValid && !this.state.submit
        return {errors, isEnabled};
    }

    render() {
        const {errors, isEnabled} = this.canBeSubmitted()
        let error = this.props.error
        if (error) { error = this.handleError(error) }
        
        const {match, items, accessToken} = this.props
        const cat_id = Number(match.params.cat_id)
        const item_id = Number(match.params.item_id)
        const item = items.items.find((item) => item.id === item_id)

        if (accessToken) {
            return (
            <div>
                <title> Editting Item </title>
                <NavBar {...this.props}/>
                <center><Item item={item}/></center>
                <div className='form'>
                    <p> Edit Item</p>
                    <form onSubmit={(event) => 
                            this.handleSubmit(cat_id, item_id, item, event)}> 
                        <input 
                            type='text' 
                            placeholder='Name' 
                            name='name'
                            onChange={this.handleNameChange}></input>
                        <input 
                            type='text' 
                            placeholder='Description' 
                            name='des'
                            onChange={this.handleDescriptionChange}></input>
                        <input 
                            type='text' 
                            placeholder='Price' 
                            name='price'
                            onChange={this.handlePriceChange}></input>
                        <button disabled={!isEnabled}> Edit </button>
                    </form>
                </div>
                <div className='error'> {errors.name} </div> <br/> <br/>
                <div className='error'> {errors.price} </div> <br/> <br/>
                <div className='error'> {errors.description} </div> 
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