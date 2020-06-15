import React, {Component} from 'react'
import '../style/popup.css'

class Popup extends Component {   
    render() {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className="close" onClick={this.props.toggle}>
                    &times;
                </span>
                <p> {this.props.message} </p>
                {this.props.onHistory.push(`/Login`)}
            </div>
        </div>)
    }
}

export default Popup