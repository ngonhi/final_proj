import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'

class AddCategory extends Component {
    state = {
        name: '',
        description: '',
        submit: false, // State to prevent double submission
        errors: {}
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    handleValidation = (event) => {
        let formIsValid = true
        const {name, description} = this.state
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
        
        return {errors, formIsValid}
    }

    handleSubmit = (event) => {
        if (Object.keys(this.props.error).length !== 0) {
            this.props.clearError()
          }
        event.preventDefault()

        this.setState({submit: true})
        const {name, des} = event.target.elements
        const category = {
                "name": name.value,
                "description": des.value
            };

        if (name && des) {
            const domain = process.env.REACT_APP_API_URL;
            const url = domain + '/categories/'
            const option = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.props.accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            }
            this.props.fetchRequestObj("START_ADDING_CATEGORY", url, option)
            .then(() => {
                if(Object.keys(this.props.error).length === 0) {
                    this.props.history.push(`/categories`)
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

    canBeSubmitted = () => {
        const {errors, formIsValid}  = this.handleValidation()
        const isEnabled = formIsValid && !this.state.submit
        return {errors, isEnabled};
    }

    render() {
        const {errors, isEnabled} = this.canBeSubmitted()
        console.log(errors)
        let error = this.props.error
        if (error) { error = this.handleError(error) }

        if (this.props.accessToken) {
            return (
            <div>
                <title> Adding Category </title>
                <NavBar {...this.props}/>
                <div className='form'>
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
                        <button disabled={!isEnabled} type="submit"> Insert </button>
                    </form>
                </div>
                <div className='error'> {errors.name} </div>
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

export default AddCategory