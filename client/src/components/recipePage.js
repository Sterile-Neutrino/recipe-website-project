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
        <img src="/recipes/recipeImage/61a588e7de7ab6c1924f69a1" alt=""/>
      </div>
    );
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
          description:'',
          likes:0,
          userlikelist:[]
        };
        this.Likeit = this.Likeit.bind(this);
    }

    componentDidMount = ()=>{
      this.getRecipe();
      //this.getUser();
    }
    
    getUser=()=>{
      var self=this;
      let user = localStorage.getItem('userInfo')
      console.log(user);
      axios.get(`http://localhost:4000/users/${user}`)
        .then((response)=>{
          self.setState({userlikelist:response.data.likeList})
          console.log(response.data);
        })
    }

    getRecipe=()=>{
      var self=this;
      axios.get(`http://localhost:4000/recipes/61a588e7de7ab6c1924f69a1`)
        .then((response)=>{
          self.setState({title:response.data.title})
          self.setState({description:response.data.description})
          self.setState({calories:response.data.calories})
          self.setState({likes:response.data.likes})
          console.log(response.data);
        })
    }

    Likeit(){
      const likes=this.state.likes;
      this.setState({ likes: likes + 1 });
      axios.patch(`http://localhost:4000/recipes/61a588e7de7ab6c1924f69a1`, { "likes": this.state.likes });
      console.log(this.state.likes);
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
          <div className="RecipePicture">
            <RecipePicture/>
          </div>
          <div className="LikeButton">
            <button onClick={this.Likeit}>
               Like this recipe: {this.state.likes}  👍🏻
            </button>
          </div>
          <div className="Favorite">
            <Favorite/>
          </div>
        </div>
      );
    }

}
/*

*/

export default recipePage;