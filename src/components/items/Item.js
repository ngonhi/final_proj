import React from 'react'
//import PropTypes from 'prop-types'
//import {Link} from 'react-router-dom'

function Item(props) {
    return (
    <div>hello</div>
    )

    // const post = props.post;
    // return <figure className='figure'> 
    //         <Link to={`/single/${post.id}`}> <img src={post.imageLink} alt={post.description} className="photo" /> </Link>
    //             <figcaption> <p> {post.description} </p></figcaption>
    //             <div className='button-container'> 
    //                 <button onClick = {() => {
    //                     props.startRemovingPost(props.index, post.id) // index of photo in props, id of photo in database
    //                     props.history.push('/')
    //                 }}> 
    //                     Remove </button> 

    //                 <Link className='button' to={`/single/${post.id}`}>
    //                     <div className='speech-bubble'> </div>
    //                     <div className='comment-count'> {props.comments[post.id] ? props.comments[post.id].length : 0} </div>
    //                 </Link>
                        
    //             </div>
    //        </figure>
}

// Photo.propTypes = {
//     post: PropTypes.object.isRequired
// }

export default Item