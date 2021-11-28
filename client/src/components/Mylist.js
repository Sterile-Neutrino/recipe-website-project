import React from 'react';
import RecipeList from './RecipeList.js';
import axios from "axios";


class Test extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        posts: [],
        postArr: [],
      }
      this.handleFetch();
    }
  
    handleFetch = () => {
      axios.get(`http://localhost:4000/recipes`).then((response) => this.handleResponse(response));
    };
  
    handleResponse = (response) => {
      let newPosts;
      if (response.data.length === undefined) {
        newPosts = [];
      } else {
        newPosts = response.data.map(element => {
          const post = {
            "id": element._id,
            "author": element.author,
            "title": element.title,
            "description": element.description,
            "ingredient": element.ingredient,
            "like": element.like,
            "category": element.category,
            "imageId": element.imageId
          }
          return post;
        });
      }
      this.setState({
        posts: newPosts,
        postArr: newPosts
      })
    }
  
    handleLike(i) {
      let newPosts = [...this.state.posts];
      let post = newPosts[i];
      post.like = post.like + 1;
  
      axios.patch(`http://localhost:4000/posts/${post.id}`, { "like": post.like })
        .catch(err => console.log(err.response.data));
      this.setState({
        posts: newPosts
      })
    }
  
  
    
  
   
  
    render() {
      return (
        <div>
          <h1>Hello</h1>
          <RecipeList handleFetch={() => this.handleFetch()}
            handleLike={(i) => this.handleLike(i)}
            postArr={this.state.postArr} />
        </div>
      );
    }
  }
  export default Test;