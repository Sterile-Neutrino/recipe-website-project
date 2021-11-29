import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./recipePage.css"

function RecipeName (name){
    return (
        <div className="recipeNameBlock">
            <h1 className="recipe_name">
                {name}
            </h1>
        </div>
    );
}
function RecipeDescription(description) {

    return (
      <div className="descriptionBlock">
        <h1 className="description_content">
        {description}
        </h1>
      </div>
    );
}
function RecipeCalories(calories) {

    return (
      <div className="caloriesBlock">
        <h1 className="recipe_calories">
        {calories}
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
        super(props)
        this.state = {
          title:'',//gets a list of recipes
          description:''
        };
    }

    componentDidMount = ()=>{
      this.getRecipe();
    }

    getRecipe=()=>{
      var self=this;
      axios.get(`http://localhost:4000/recipes/61a30821433f18541efc7fc5`)
        .then((response)=>{
          self.setState({title:response.data.title})
          self.setState({description:response.data.description})
          self.setState({calories:response.data.calories})
          console.log(response.data);
        })
    }

    render() {
      return (
        
        <div>
          <div className="RecipeName"> 
            {RecipeName(this.state.title)}
          </div>
          <div className="RecipeDescription">
            {RecipeDescription(this.state.description)}
          </div>
          <div className="RecipeCalories">
           {RecipeCalories(this.state.calories)}
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
/*
<div className="RecipeCalories">
  <RecipeCalories/>
</div>
<div className="RecipePicture">
  <RecipePicture/>
</div>*/

export default recipePage;