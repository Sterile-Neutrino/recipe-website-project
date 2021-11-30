
   
import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./Home.css";
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

//function Logout() {
//      localStorage.clear();
//}

class Recommendation extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          title: '',
          desciption: '',

      };
      this.componentDidMount = this.componentDidMount.bind(this)
  }

componentDidMount = () => {  
  var self = this;
  axios.get('/recipes/61a4a21083e49fbd03fefcb8')
  .then(function (response) {
    console.log(response.data);
    self.setState({title: response.data.title, 
      desciption: response.data.description})
  });
}

  render() {
      return (
        <div>
          <Link component={Link} to="/RecipePage" className="RecommendationBlock">
          <h1 className="RecommendationTitle" componentDidMount>
            {this.state.title}
          </h1>
          <h2 className="RecommendationContent">
            {this.state.desciption.slice(0,200) + "..."}
          </h2>
          <div className="RecommendationThumbnail">
            <img src='http://localhost:4000/recipes/image/61a588e7de7ab6c1924f69a1' alt=""/>
          </div>
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
          
        </div>
      );
    }

}

export default Home;