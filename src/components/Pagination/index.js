import React, { Component } from 'react'

class Pagination extends Component {
    render() {
        const pageNumbers = [];
        const {totalObjs, objsPerPage} = this.props

        for (let i = 1; i <= Math.ceil(totalObjs / objsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
        <div>
            <center>
        <ul className='pagination'>
            {pageNumbers.map((number) => (
            <li 
                className={this.props.activeIndex === number ? 'pagination-active' : ''}
                key={number}
                onClick={() => this.props.paginate(number)}>
                {number}
            </li>
            ))}
        </ul>
        </center>
        </div>
        )
    };
};

export default Pagination