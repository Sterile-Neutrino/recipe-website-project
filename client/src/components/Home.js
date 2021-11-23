
   
import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./Home.css";
import range from "lodash/range";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from './Upload';

// function recipe(props) {
//     return (
//       <button className="Recipe">
//         {/* {this.props.title} */}
//         Chicken Sandwitch
//       </button>
//     )
// }

// const Recipe = ({ title, index, style = {} }) => {
//   <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
//     {recipeList[title % 3]}
//   </div>
// };

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

function Recommendation() {

  return (
    <Link component={Link} to="/RecipePage" className="RecommendationBlock">
      <h1 className="RecommendationTitle">
        Recommended to You: Roast Chicken!
      </h1>
      <h2 className="RecommendationContent">
      Roast chicken is chicken prepared as food by roasting whether in a home kitchen, over a fire, or with a rotisserie (rotary spit). Generally, the chicken is roasted with its own fat and juices...
      </h2>
      <div className="RecommendationThumbnail">
        <img src="./images/sample.jpg" alt=""/>
      </div>
    </Link>

    // <Link component={Link} to="/RecipePage" className="RecommendationThumbnail">
    //   <img src="./images/sample.jpg" alt=""/>
    // </Link>
  )

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