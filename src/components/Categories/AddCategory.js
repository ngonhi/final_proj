import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NavBar from '../NavBar'

class AddCategory extends Component {
    handleSubmit = (event) => {
        this.props.clearError()
        event.preventDefault()
        const {name, des} = event.target.elements
        const category = {
                "name": name.value,
                "description": des.value
            };

        if (name && des) {
            const url = window.$domain + '/categories/'
            const option = {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.props.access_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category)
            }
            this.props.fetchRequestObj("START_ADDING_CATEGORY", url, option)
            .then(() => {
                if(Object.keys(this.props.error).length !== 0) {
                    this.props.history.push(`/addCategory`)
                } else {
                    this.props.history.push(`/categories`)
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

        if (this.props.access_token) {
            return (
            <div>
                <NavBar {...this.props}/>
                <div className='form'>
                    <form onSubmit={this.handleSubmit}> 
                        <input type='text' placeholder='Name' name='name'></input>
                        <input type='text' placeholder='Description' name='des'></input>
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

export default AddCategory