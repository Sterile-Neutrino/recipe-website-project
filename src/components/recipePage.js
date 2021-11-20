import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./recipePage.css"

function RecipeName (){
    return (
        <div className="recipeNameBlock">
            <h1 className="recipe_name">
                Roasted Chicken
            </h1>
        </div>
    );
}
function RecipeDescription() {

    return (
      <div className="descriptionBlock">
        <h1 className="description_content">
        Roast chicken is chicken prepared as food by roasting.
        </h1>
      </div>
    );
}
function RecipeCalories() {

    return (
      <div className="caloriesBlock">
        <h1 className="recipe_calories">
        142 calories
        </h1>
      </div>
    );
}
function RecipePicture() {

    return (
      <div className="picture">
        <img src="./images/sample.jpg" alt=""/>
      </div>
    );
}

class recipePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        
        <div>
          <div className="RecipeName">
            <RecipeName/>
          </div>
          <h1>Hello!!!</h1>
          <div className="RecipeDescription">
            <RecipeDescription/>
          </div>

          <div className="RecipeCalories">
            <RecipeCalories/>
          </div>
          <div className="RecipePicture">
            <RecipePicture/>
          </div>
        </div>
      );
    }

}

export default recipePage;