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

    handlePriceChange = (event) => {
        this.setState({price: event.target.value})
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
        const {name, price} = this.state;
        return name.length > 0 && price.length > 0 && !this.state.submit
    }

    render() {
        const isEnabled = this.canBeSubmitted()
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
                            name='des'></input>
                        <input 
                            type='text'
                            placeholder='Price' 
                            name='price'
                            onChange={this.handlePriceChange}></input>
                        <button disabled={!isEnabled}> Insert </button>
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

export default AddItem