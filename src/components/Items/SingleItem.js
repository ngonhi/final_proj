import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Item from './Item'
import Logout from '../User/Logout'

class SingleItem extends Component {
    componentDidMount() {
        const cat_id = Number(this.props.match.params.cat_id)
        this.props.setCatId(cat_id)
    }

    handleClick = (item, cat_id, item_id, index, token) => {
        const url = window.$domain + '/categories/' + cat_id + '/items/' + item_id
        const option = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }
        this.props.fetchRequestObj("START_DELETING_ITEM", url, option, index) 
        this.props.history.push(`/category/${cat_id}`)
    }


    modifyButtons = (item, cat_id, item_id, index, access_token, user) => {
        console.log(user)
        console.log(item)
        let modifyButtons 
        if (user.id === item.user_id) {
            return <div className='button-container'>
                <Link className='button' 
                    to={`/category/${cat_id}/editItem/${item_id}/${index}`}>
                    Edit Item</Link>
                <button onClick = {() => 
                    this.handleClick(item, cat_id, item_id, index, access_token)}> 
                    Remove Item </button> 
            </div>
        } else {
            return null
        }
    }

    handleError = (error) => {
        if (Object.keys(error).length !== 0) {
          const {message, status, statusText} = error
          error = <div className='error'> {status} - {statusText} - {message} </div>
        } else {
          error = null
        }
        return error
    }

    render() {
        // Handle error
        let error = this.props.error
        if (error) { error = this.handleError(error) }
        if (error) {
            return <div> {error} </div>
        }

        const {match, items, access_token, user} = this.props
        const item_id = Number(match.params.item_id)
        const cat_id = Number(match.params.cat_id) 
        if (!access_token) {
            return (<div>
                <div className='loader'> User has not been authorized to see this content. 
                                        Please login again. </div>
                <div className='button-container'>
                    <Link to='/login' className='button'> Login </Link>
                </div>
            </div>)
        }

        if (Object.keys(items).length === 0) {
            return <div className='loader'>
                ...loading
            </div>
        } else {    
            const items_list = items.items
            const item = items_list.find((item) => item.id === item_id)
            const index = items_list.findIndex((item) => item.id === item_id)
            if (item) {
                const modifyButtons = this.modifyButtons(item, cat_id, item_id, index, 
                      access_token, user)
                return <div>
                    <Logout {...this.props}/>
                    <center>
                        <h2> Item Detail </h2>
                        <Item item={item} index={index}/>
                    </center>
                    {modifyButtons}
                    </div>
            } else {
                return <h1> No Item Found </h1>
            }
        }
    }
}

export default SingleItem