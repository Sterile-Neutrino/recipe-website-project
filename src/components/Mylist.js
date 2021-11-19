import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Mylist.css"

class Mylist extends React.Component{
     divList = document.querySelector('.listHolder');
    constructor(props){
        super(props);
        /// Setting up state
        this.state={
            username: "",
            password: "",
            email: "",
            IsCompleted: false,
            redirect: null,
            LoggedIn: false

        };
    }
    
    render() {
        return(
        <div className="Mylist" >
            <h2 class="task-list-title">My lists</h2>
            <div class="RecipeList">
            <ul class="list">
            <nav>
            <li>
            <Link to="/" className="ListHolder"><h1>Chicken Sandwich</h1></Link>
            </li>
            <li>
            <Link to="/" className="ListHolder"><h1>Vegetable Salad</h1></Link>
            </li>
            <li>
            <Link to="/" className="ListHolder"><h1>French Fries</h1></Link>
            </li>

            </nav>
            </ul>
             </div>
        </div>
        )
      }



}

export default Mylist



