import React, {Component} from 'react'

class AddCategory extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const name = event.target.elements.name.value
        const description = event.target.elements.des.value
        const category = {
                'name': name,
                'description': description
            }

        if (name && description) {
            console.log(category)
            // fetch('http://127.0.0.1:5000/categories/', {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': 'Bearer {{jwt_token}}',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(category)
            // })
            // .then(res => res.json())
            //.then(call removepost)
            this.props.onHistory.push('/')
        }
    }

    render() {
        return (
        <div>
            <div className='form'>
                <form onSubmit={this.handleSubmit}> 
                    <input type='text' placeholder='Name' name='name'></input>
                    <input type='text' placeholder='Description' name='des'></input>
                    <button> Insert </button>
                </form>
            </div>
            
        </div>
        )
    }
}

export default AddCategory