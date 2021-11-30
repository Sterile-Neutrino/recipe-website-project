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
function RecipeCategory (category){
  return (
      <div className="CategoryBlock">
          <h1 className="category_content">
              {category}
          </h1>
      </div>
  );
}
function RecipeDescription(description,ingredient) {

    return (
      <div className="descriptionBlock">
        <h1 className="ingredient_content">
          ingredients: {ingredient} 
        </h1>
        <p className="description_content">
          {description}
        </p>
      </div>
    );
}
function RecipeCalories(calories) {

    return (
      <div className="caloriesBlock">
        <h1 className="recipe_calories">
          Calories: {calories}
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

class recipePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          title:'',//gets a list of recipes
          description:'',
          calories:'',
          likes:0,
          category:'',
          ingredients:'',
          liked:false,
          added:false
        };
        this.Likeit = this.Likeit.bind(this);
        this.AddtoFavorite=this.AddtoFavorite.bind(this);
    }

    componentDidMount = ()=>{
      this.getRecipe();
      this.getUser();
    }
    
    getUser=()=>{
      var self=this;
      let userid=localStorage.getItem('userInfo');
      console.log(userid)
      axios.get(`http://localhost:4000/users/find/${userid}`)
        .then((response)=>{
          console.log(response.data)//for debugging
          if (response.data.likeList.includes('61a588e7de7ab6c1924f69a1')){
            self.setState({liked:true});
          };
          if (response.data.myList.includes('61a588e7de7ab6c1924f69a1')){
            self.setState({added:true});
            console.log(self.state.added);
          }
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
          self.setState({category:response.data.category})
          self.setState({ingredients:response.data.ingredients}) //for debugging
        })
    }

    Likeit(){
      if (this.state.liked==false){ //click to like
      
        const likes=this.state.likes;
        this.setState({ likes: likes + 1 });
        this.setState({liked:true});
        var data={
          userId: '61a588bbde7ab6c1924f6998',
          recipeId: '61a588e7de7ab6c1924f69a1'
        };
        axios.post(`users/like`, data);
      }
      else if (this.state.liked==true){ //click to dislike
        this.setState({liked:false});
        const likes=this.state.likes;
        this.setState({likes:likes-1});
      }
    }
    AddtoFavorite(){
      if (this.state.added==false){ //click to add
        this.setState({added:true});
        var data={
          userId: '61a588bbde7ab6c1924f6998',
          recipeId: '61a588e7de7ab6c1924f69a1'
        };
        axios.post('users/addToList',data);
      }
      else if (this.state.added==true){ //click to remove from list
        this.setState({added:false});
      }
    }
    render() {
      let like_button_name = this.state.liked ? "LikedButton" : "LikeButton";
      let like_button_text=this.state.liked ? "Dislike " : "Like ";
      let add_button_name = this.state.added ? "FavoritedButton" : "FavoriteButton";
      let add_button_text=this.state.added ? "Remove from " : "Add to";
      return (
        <div>
          <div className="RecipeCategory">
            {RecipeCategory(this.state.category)}
          </div>
          <div className="RecipeName"> 
            {RecipeName(this.state.title)}
          </div>
          <div className="RecipeDescription">
            {RecipeDescription(this.state.description,this.state.ingredients)}
          </div>
          <div className="RecipeCalories">
           {RecipeCalories(this.state.calories)}
          </div>
          <div className="RecipePicture">
            <RecipePicture/>
          </div>
          <button className = {like_button_name}  onClick={this.Likeit}>
             {like_button_text}this recipe: {this.state.likes}  👍🏻
          </button>
          <button className = {add_button_name} onClick={this.AddtoFavorite}>
             {add_button_text}my list ⭐
          </button>
        </div>
      );
    }

}
/*

*/

export default recipePage;