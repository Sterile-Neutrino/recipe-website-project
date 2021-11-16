import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./Home.css";
import range from "lodash/range";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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

const RecipeItem = ({ index, style = {} }) => (
  <div className={"RecipeItem"} style={style}>
    {recipeList[index % 3]}
  </div>
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
                <RecipeItem key={item} index={item} 
                style={{maxHeight: '100%', overflow: 'auto'}}/>
              ))}
          </div>
        </div>
  );
}

function Mylist() {

  return (
    <div className="MyListBlock">
      <h1 className="MyListTitle">Enter My List!</h1>
    </div>
  )

}

function UploadRecipe() {

  return (
    <div className="UploadBlock">
      <h1 className="UploadTitle">
        Upload
        New
        Recipe!
      </h1>
    </div>
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
        </div>
      );
    }

}

export default Home;