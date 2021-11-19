import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./recipePage.css"

function recipeName (){
    return (
        <div className="recipeNameBlock">
            <h1 className="recipe_name">
                Roasted Chicken
            </h1>
        </div>
    );
}
function recipeDescription() {

    return (
      <div className="descriptionBlock">
        <h1 className="description_content">
        Roast chicken is chicken prepared as food by roasting.
        </h1>
      </div>
    );
}
function recipeCalories() {

    return (
      <div className="caloriesBlock">
        <h1 className="recipe_calories">
        142 calories
        </h1>
      </div>
    );
}
function recipePicture() {

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
          <div className="recipeName">
            <recipeName/>
          </div>

          <div className="recipeDescription">
            <recipeDescription/>
          </div>

          <div className="recipeCalories">
            <recipeCalories/>
          </div>
          <div className="recipePicture">
            <recipePicture/>
          </div>
        </div>
      );
    }

}

export default recipePage;