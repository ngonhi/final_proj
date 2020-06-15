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
                "name": name,
                "description": description
            };

        if (name && description) {
            this.props.startAddingCat(category, this.props.access_token)
            this.props.history.push('/Categories')
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