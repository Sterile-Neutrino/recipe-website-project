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
        Roast chicken is chicken prepared as food by roasting whether in a home kitchen, over a fire, or with a rotisserie (rotary spit). Generally, the chicken is roasted with its own fat and juices by circulating the meat during roasting, and therefore, are usually cooked exposed to fire or heat with some type of rotary grill so that the circulation of these fats and juices is as efficient as possible. Roast chicken is a dish that appears in a wide variety of cuisines worldwide.
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

function Like(){
  return(
    <div className="LikeButton">
      <button onClick={likeit}>
        Like this recipe 👍🏻
      </button>
    </div>
  );
}
function likeit(){
  ;
}

function Favorite(){
  return(
    <div className="FavoriteButton">
      <button onClick={AddtoFavorite}>
        Add to my list ⭐
      </button>
    </div>
  );
}

function AddtoFavorite(){
  ;
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
          <div className="RecipeDescription">
            <RecipeDescription/>
          </div>

          <div className="RecipeCalories">
            <RecipeCalories/>
          </div>
          <div className="RecipePicture">
            <RecipePicture/>
          </div>
          <div className="Like">
            <Like/>
          </div>
          <div className="Favorite">
            <Favorite/>
          </div>
        </div>
      );
    }

}

export default recipePage;