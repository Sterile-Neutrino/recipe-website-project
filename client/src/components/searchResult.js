import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./searchResult.css";
import range from "lodash/range";
import { useParams, useLocation } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from './Upload';

// function SearchResult() {
//     const params = useParams();
//     const resultList = params.resultList;
//     console.log(resultList)
// }

class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        this.searchWord = '';
        this.searchResult = '';
    }

    componentDidMount = ()=>{
        console.log(this.props.params.s)
        this.searchWord = this.props.params.s;
          axios.get(`http://localhost:4000/recipes/search/${this.searchWord}`)
        .then((response)=>{
          this.SearchResult = response.data;
          // console.log(response.data); //for debugging
        })
        console.log(this.SearchResult)
    }

    render() {
        return (
            <strong>
                {this.searchWord}
            </strong>
        )
    }
}
    
const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        params={params}
        // etc...
      />
    );
  };

export default withRouter(SearchResult);