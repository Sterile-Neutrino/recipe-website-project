
   
import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./Home.css";
import recipePage from "./recipePage"
import range from "lodash/range";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from './Upload';


const recipeList = ["Chicken Sandwitch", "Fried Rice", "Spaghetti with Italian Meatball"];

const list = [
  "61a588e7de7ab6c1924f69a1",
  "61a5f41dbd14dc54b5f54b74",
  "61a5f50cbd14dc54b5f54b7c",
  "61a5f57bbd14dc54b5f54b85",
  "61a5f730dbdd9e100a938840",
  "61a6daf4712330dac939e925",
  "61a6daa0712330dac939e91d",
  "61a6da1e712330dac939e904",
  "61a6e03e9614f64f0688e387",
  "61a6e12f9614f64f0688e391",
  "61a6e25e9614f64f0688e3e3",
  "61a5f41dbd14dc54b5f54b74",
  "61a5f50cbd14dc54b5f54b7c",
  "61a6e3479614f64f0688e42c",
  "61a6e3f09614f64f0688e478",
]


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

        listTitle: new Object(),
        // listItem: {id: [], title: []}

    };
    this.listItem = new Object();
    this.titles = [];
    this.componentDidMount = this.componentDidMount.bind(this)
}

  componentDidMount () {
    const listID = list;
    for (var ID of listID) {
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
          <h1 className="Title">
            What's popular today?
          </h1>
              <div className="BasicList">
                {list.map(
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
  axios.get('/recipes/61a588e7de7ab6c1924f69a1')
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
              pathname: `/RecipePage/61a5f41dbd14dc54b5f54b74`, //test for dynamic route: path id
            }} component={recipePage} className="RecommendationBlock">
            <h1 className="RecommendationTitle" componentDidMount>
              {this.state.title}
            </h1>
            <h2 className="RecommendationContent">
              {this.state.desciption.slice(0,180) + "..."}
            </h2>
            <div className="RecommendationThumbnail">
              <img src='http://localhost:4000/recipes/recipeImage/61a588e7de7ab6c1924f69a1' alt=""/>
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