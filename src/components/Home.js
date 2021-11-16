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

      {/* <div>
        Item count:{" "}
        <input
          type="number"
          value={itemCount}
          onChange={({ target: { value } }) => {
            setItemCount(value);
            setRender(false);
          }}
        />
      </div> */}
            {/* <button onClick={() => setRender(true)}>Render</button>
            <button onClick={() => setRender(false)}>Clear</button> */}

          <div className="BasicList">
            {render &&
              range(50).map(item => (

                // <Recipe key={item} index={item} 
                // title={item} style={{maxHeight: '100%', overflow: 'auto'}}/>
                <RecipeItem key={item} index={item} 
                style={{maxHeight: '100%', overflow: 'auto'}}/>
              ))}
          </div>
        </div>
  );
}

function Mylist() {

  
}


class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
          <div className="DailyList">
              <DailyList/>
          </div>
      );
    }

}

export default Home;