import React from 'react';


export default class PostRecipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            like: 0,
            category: null
        }
    }
    handleLike() {
        const like = this.state.like;
        this.setState({ like: like + 1 });
    }
    render() {
        return (
            <div className="post">
                <div className="post-content">
                    <img
                        src={this.props.image}
                        alt="testing">
                    </img>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                    

                </div>

                <span className="category">#{this.props.category}</span>
                <div className="like-container">
                    <button className="like-button" onClick={(i) => this.props.handleLike(i)}>
                        Like!
                    </button>
                    <span>{this.props.like}</span>
                </div>
            </div>
        )
    }
}