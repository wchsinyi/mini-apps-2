import React from 'react';
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

var CommentList = function ({ data }) {
    var items = data.map((i,idx) => {
        return (
            <li key={idx.toString()}>
                {i.description} ({i.category2}, {i.category1})
            </li>
        )
    })
    return (
        <ul>
        {items}
        </ul>
    )
}

export default CommentList

            // {/* <li>
            //     {i.lang}
            // </li>
            // <li>
            //     {i.category2}
            // </li>
            // <li>
            //     {i.category1}
            // </li> */}
