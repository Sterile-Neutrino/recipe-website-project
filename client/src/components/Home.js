
   
import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./Home.css";
import recipePage from "./recipePage"
import range from "lodash/range";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from './Upload';


const recipeList = ["Chicken Sandwitch", "Fried Rice", "Spaghetti with Italian Meatball"];

const RecipeItem = ({ index= {} }) => (
  <Link component={Link} to="/RecipePage" className="RecipeItem"  style = {{textDecoration: 'none' }}>
    <h1 className="RecipeTitle"> 
      {recipeList[index % 3]}
    </h1>
  </Link>
  

);

const RecipeItem2 = ({ index, style = {} }) => (
  <div className={"ListItemEven"} style={style}>
    {recipeList[index % 3]}
  </div>
);

function DailyList() {
  const [render, setRender] = useState(true);

  return (
    <div>
      <h1 className="Title">
        What's popular today?
      </h1>
          <div className="BasicList">
            {render &&
              range(50).map(item => (
                <RecipeItem key={item} index={item}/>
              ))}
          </div>
        </div>
  );
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
              pathname: `/RecipePage/61a588e7de7ab6c1924f69a1`, //test for dynamic route: path id
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