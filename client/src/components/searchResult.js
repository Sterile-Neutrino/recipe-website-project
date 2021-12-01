import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./searchResult.css";
import range from "lodash/range";
import { useParams, useLocation } from 'react-router-dom';
import recipePage from './recipePage';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from './Upload';


function RecipeItem (item) {
    
    const recipeID = item.item;
    const recipeTitle = item.title;
  
    
    // console.log(item)
    
    return(
        <Link to={{
            pathname: `/RecipePage/${recipeID}`, //test for dynamic route: path id
          }} component={recipePage} className="RecipeItem"  style = {{textDecoration: 'none' }}>
        <h1 className="RecipeTitle"> 
          {recipeTitle}
        </h1>
      </Link>
  
    )
  };
  
  class SearchResult extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
          // listID: [],
          listTitle: [],
          resultList: []
          // listItem: {id: [], title: []}
  
      };
      this.listItem = new Object();
      this.titles = [];
      this.componentDidMount = this.componentDidMount.bind(this)
  }
    componentDidMount () {
        this.searchWord = this.props.params.s;
        axios.get(`http://localhost:4000/recipes/search/${this.searchWord}`)
        .then((response)=>{
        //   this.SearchResult = response.data;
          this.setState({resultList: response.data})
        //   console.log(this.SearchResult); //for debugging

          for (var value of this.state.resultList) {
              console.log(value)
          }
        })
        .then((response) => {
            this.getTitle();
        })

        this.getTitle()
    }

    getTitle = () => {
        console.log(this.state.resultList)
        for (var ID of this.state.resultList) {
            axios.get(`http://localhost:4000/recipes/${ID}`)
            .then((response)=>{
                console.log(ID);
                this.listItem[ID] = response.data.title;
                this.titles.push(response.data.title)
                this.setState({listTitle: this.titles})
                console.log(this.state.listTitle);
            })
          }
    }
  
    render() {
        return (
          <div>
            <h1 className="Title">
              Search Results!
            </h1>
                <div className="BasicList">
                  {this.state.resultList.map(
                    (id) => (<RecipeItem item = {id} title = {this.state.listTitle[this.state.resultList.indexOf(id)]}/>)
                  )}
                </div>
              </div>
        );
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