
   
import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./Home.css";
import recipePage from "./recipePage"
import range from "lodash/range";

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

class DailyList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        // listID: [],
        listID: [],
        listTitle: new Object()
        // listItem: {id: [], title: []}

    };
    this.listItem = new Object();
    this.titles = [];
    this.componentDidMount = this.componentDidMount.bind(this)
}



  componentDidMount () {
    axios.get('http://localhost:4000/recipes//sortByLikes/list')
    .then((response)=>{
    //   this.SearchResult = response.data;
      this.setState({listID: response.data})
    //   console.log(this.SearchResult); //for debugging

      for (var value of this.state.listID) {
          console.log(value)
      }
    })
    .then((response) => {
        this.getTitle();
    })
  }

  getTitle = () => {
    console.log(this.state.listID)
    for (var ID of this.state.listID) {
        axios.get(`http://localhost:4000/recipes/${ID}`)
        .then((response)=>{
            var items = this.state.listTitle
            items[response.data._id] = response.data.title;
            this.setState({listTitle: items})
        })
      }
  }
  
  render() {
      return (
        <div>
          <h1 className="ListTitle">
            What's popular today?
          </h1>
              <div className="BasicList">
                {this.state.listID.map(
                  (id) => (<RecipeItem item = {id} title = {this.state.listTitle[id]}/>)
                )}
              </div>
            </div>
      );
    }

}

function Mylist() {

  return (
    <Link component={Link} to="/MyList" className="MyListBlock">
      Enter My Daily List!
    </Link>
  )

}

function UploadRecipe() {

  return (
        <Link component={Link} to="/Upload" className="UploadBlock">
          Upload Recipe!
        </Link>
  )

}

function Logout() {
      localStorage.clear();
      console.log("Sign Out");
      alert('You have logged out.')
}

class Recommendation extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          id: "",
          title: '',
          desciption: '',

      };
      this.componentDidMount = this.componentDidMount.bind(this)
  }

componentDidMount = () => {  
  var self = this;
  axios.get('/recipes/find/random')
  .then(function (response) {
    self.setState({
      id: response.data._id,
      title: response.data.title, 
      desciption: response.data.description})
  });
}

  render() {
      return (
        <div>
          <Link to={{
              pathname: `/RecipePage/` + this.state.id, //test for dynamic route: path id
            }} component={recipePage} className="RecommendationBlock">
            <h1 className="RecommendationTitle" componentDidMount>
              {"Chef's Recommendation: " + this.state.title}
            </h1>
            <h2 className="RecommendationContent">
              {this.state.desciption.slice(0,180) + "..."}
            </h2>
            <div className="RecommendationThumbnail">
              <img src={'http://localhost:4000/recipes/recipeImage/' + this.state.id} alt=""/>
            </div>
          {/* </Link> */}
          </Link>
        </div>

      );
  }

}


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
          <div className="DailyList">
            <DailyList/>
          </div>

          <div className="MyList">
            <Mylist/>
          </div>

          <div className="UploadRecipe">
            <UploadRecipe/>
          </div>

          <div className="Recommendation">
            <Recommendation/>
          </div>
          <div className="Logout">
          <button onClick={Logout}>
             Logout
         </button>
          </div>
        </div>
      );
    }

}

export default Home;