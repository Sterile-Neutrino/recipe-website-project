import React from "react";
import sample from '../background.jpg'
import PostRecipe from './PostRecipe.js';



export default class RecipeList extends React.Component {
    renderPosts(arr) {
        const postArr = arr.map((post, index) => {
            return (
                <PostRecipe
                    key={post.id}
                    image={post.imageId === undefined ? sample : `http://localhost:4000/recipes/upload/${post.imageId}`}
                    title={post.title}
                    author={post.author}
                    description={post.description}
                    ingredient={post.ingredient}
                    like={post.like}
                    category={post.category}
                    handleLike={() => this.props.handleLike(index)}
                />
            )
        });
        return <ul>{postArr}</ul>;
    }

    render() {
        return (
            <div className="post-list">
                {this.renderPosts(this.props.postArr)}
            </div>
        )
    }
}