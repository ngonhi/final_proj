import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import Category from '../Categories/Category'

class AddItem extends Component {
    state = {
        name: '',
        description: '',
        price: '',
        submit: false // State to prevent double submission
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

        if(!name){
            formIsValid = false;
            errors["name"] = "Name cannot be empty";
        } else if(name.length < 5) {
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

        if (!price) {
            formIsValid = false;
            errors["price"] = "Price cannot be empty"
        } else if (price < 0) {
            formIsValid = false;
            errors["price"] = "Price cannot be negative"
        }
        
        return {errors, formIsValid}
    }

    handleSubmit = (event) => {
        if (Object.keys(this.props.error).length !== 0) {
            this.props.clearError()
          }
        event.preventDefault()

        this.setState({submit: true})
        const {name, des, price} = event.target.elements
        const item = {
                "name": name.value,
                "description": des.value,
                "price": price.value
            };
 
        const cat_id = Number(this.props.match.params.cat_id)

        if (name && des && price) {
            const domain = process.env.REACT_APP_API_URL
            const url = domain + '/categories/' + cat_id + '/items/'
            const option = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.props.accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            }
            this.props.fetchRequestObj("START_ADDING_ITEM", url, option)
            .then(() => {
                if(Object.keys(this.props.error).length === 0) {
                    this.props.history.push(`/category/${cat_id}`)
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

        const {match, categories} = this.props
        const cat_id = Number(match.params.cat_id)
        const category = categories.categories.find((cat) => cat.id === cat_id)


        if (this.props.accessToken) {
            return (
            <div>
                <title> Adding Item </title>
                <NavBar {...this.props}/>
                <center><Category category={category}/></center>
                <div className='form'>
                    <p> Add Item</p>
                    <form onSubmit={this.handleSubmit}> 
                        <input 
                            type='text' 
                            placeholder='Name' 
                            name='name'
                            onChange={this.handleNameChange}></input>
                        <input 
                            type='text' 
                            placeholder='Description (optional)' 
                            name='des'
                            onChange={this.handleDescriptionChange}></input>
                        <input 
                            type='text'
                            placeholder='Price' 
                            name='price'
                            onChange={this.handlePriceChange}></input>
                        <button disabled={!isEnabled}> Insert </button>
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

export default AddItem