import React from 'react';
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate';
import $ from 'jquery';
import CommentList from './CommentList.jsx'
import axios from 'axios';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            offset: 0,
            searchStr: 'king'
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.loadEventFromServer = this.loadEventFromServer.bind(this);
    }

    loadEventFromServer() {
        axios.get(`/events`, {
            params: {
                q: 'while',
                _limit: this.props.perPage,
                _page: this.state.offset
            },
            data:{
            }
        })

        .then(res => {
            console.log('res data', res.data)
        //   console.log('res.headers["x-total-count"]',res.headers["x-total-count"]);
          this.setState({ 
              data:res.data , 
              pageCount: Math.ceil(res.headers["x-total-count"] / this.props.perPage)
         }, ()=>{
             console.log('this.state.data', this.state.data, 
             'this.state.pageCount', this.state.pageCount)
         });
        })
  
        // $.ajax({
        //     url: 'http://localhost:3000/events?q='+this.state.searchStr,
        //     data: { _limit: this.props.perPage, _page: this.state.offset },
        //     dataType: 'json',
        //     type: 'GET',
        //     success: (data,arg2,arg3) => {
        //         console.log('data', data, 'data.meta.total_count, data.meta.limit', data.meta);
        //         this.setState({
        //           data: data,
        //           pageCount: Math.ceil(data.length / 10),
        //         });
        //     }
        // })
     ;
    }
    componentDidMount() {
        this.loadEventFromServer();
    }
    handlePageClick(data){
        console.log(data.selected, this.props.perPage);
        let selected = data.selected;
        let offset = Math.ceil(selected);
        // let offset = Math.ceil(selected * this.props.perPage);
        console.log('offset', offset);
    
        this.setState({ offset: offset }, () => {
            console.log('offset after set state', this.state.offset);
          this.loadEventFromServer();
        });
      };
    
    render() {
        return(
    <div className="eventBox"> 
    {/* commmentBox */}
        <CommentList data={this.state.data} />
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
        />
    </div>
        )
    }


}


ReactDOM.render(
    <App url={'http://localhost:3000/events'} author={'adele'} perPage={5} />,
    document.getElementById('react-paginate')
  );
  