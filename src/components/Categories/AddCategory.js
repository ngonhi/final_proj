import React, {Component} from 'react'
import Logout from '../User/Logout'

class AddCategory extends Component {
    handleSubmit = (event) => {
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
            this.props.history.push(`/Categories`)
        }
    }

    render() {
        if (this.props.access_token) {
            return (
            <div>
                <Logout/>
                <div className='form'>
                    <form onSubmit={this.handleSubmit}> 
                        <input type='text' placeholder='Name' name='name'></input>
                        <input type='text' placeholder='Description' name='des'></input>
                        <button> Insert </button>
                    </form>
                </div>
                
            </div>)
        } else {
            return <div className='loader'> Access denied </div>
        }
    }
}

export default AddCategory