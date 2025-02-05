import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
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
          Ingredients: {ingredient} 
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
function RecipePicture(image_src) {
    return (
      <div className="picture">
        <img src={image_src} alt=""/>
      </div>
    );
}

class recipePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          id: '',
          user:'',
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
      const id = this.props.params.id;//.toString();
      this.getRecipe(id);
      this.getUser(id);
    }
    
    getUser=(id)=>{
      var self=this;
      let userid=localStorage.getItem('userInfo');
      userid=JSON.parse(userid);
      self.setState({user:userid});
      axios.get(`http://localhost:4000/users/find/${userid}`)
        .then((response)=>{
          console.log(response.data)//for debugging
          if (response.data.likeList.includes(id)){
            self.setState({liked:true});
            console.log(response.data.likeList)
          };
          if (response.data.myList.includes(id)){
            self.setState({added:true});
          }
        })
    }

    getRecipe=(id)=>{
      var self=this;
      axios.get(`http://localhost:4000/recipes/${id}`)
        .then((response)=>{
          self.setState({id:response.data._id})
          self.setState({title:response.data.title})
          self.setState({description:response.data.description})
          self.setState({calories:response.data.calories})
          self.setState({likes:response.data.likes})
          self.setState({category:response.data.category})
          self.setState({ingredients:response.data.ingredients})
        })
    }
    
    Likeit(){
      if (this.state.liked==false){ //click to like
      
        this.setState({liked:true});
        const likes=this.state.likes;
        this.setState({ likes: likes + 1 });
        let id = this.state.id
        let user = this.state.user
        var data={
          userId: user,
          recipeId: id
        };
        axios.post(`/users/like`, data);
        axios.post(`/recipes/like`,data)
      }
      else if (this.state.liked==true){ //click to dislike
        this.setState({liked:false});
        const likes=this.state.likes;
        this.setState({likes:likes-1});
        let id = this.state.id
        let user = this.state.user
        var data={
          userId: user,
          recipeId: id
        };
        axios.post(`/users/dislike`, data);
        axios.post(`/recipes/dislike`,data);
      }
    }


    AddtoFavorite(){
      if (this.state.added==false){ //click to add
        this.setState({added:true});
        let id = this.state.id
        let user = this.state.user
        var data={
          userId: user,
          recipeId: id
        };
        axios.post(`/users/addToList`,data);
      }
      else if (this.state.added==true){ //click to remove from list
        this.setState({added:false});
        let id = this.state.id
        let user = this.state.user
        var data={
          userId: user,
          recipeId: id
        };
        axios.post(`/users/removeFromList`,data);
      }
    }

    
    render() {
      let like_button_name = this.state.liked ? "LikedButton" : "LikeButton";
      let like_button_text=this.state.liked ? "Liked " : "Like ";
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
            {RecipePicture('/recipes/recipeImage/' + this.state.id)}
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

const withRouter = WrappedComponent => props => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

export default withRouter(recipePage);