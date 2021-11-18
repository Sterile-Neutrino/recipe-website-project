import React from 'react';
import './Upload.css';
import { useState } from 'react';
import axios from "axios";

function SelectionBar(props) {
    const titleLimit = 50;
    const descriptionLimit = 400;
    const caloriesLimit=6;
    const ingredientLimit= 200;
    return (props.trigger) ? (
        <div className="SelectionBar">
            <div className="SelectionBar-inner">
            <h2>New Recipe</h2>
                <input id="input-title" className="Upload-recipe" type="text" maxLength={titleLimit} placeholder="Recipe Title"></input>
                <input id="input-description" className="Upload-recipe" type="textarea" maxLength={descriptionLimit} placeholder="Description"></input>
                <input id="input-calories" className="Upload-recipe" type="text" maxLength={caloriesLimit} placeholder="Calories"></input>
                <input id="input-ingredient" className="Upload-recipe" type="text" maxLength={ingredientLimit} placeholder="Ingredient"></input>
                <select id="input-category" className="Upload-category" name="Category" >
                    <option value="" hidden>Please Choose a Category</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Dish">Main Dish</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Drink">Drink</option>
                    <option value="Soup">Soup</option>
                    <option value="Snack">Snack</option>
                    <option value="Other">Other</option>
                </select>
                <input id="input-image" className="Upload-image" type="file"></input>
                <button type="button" className="Upload-submit" onClick={() => props.handleSubmit()}>Submit</button>
            </div>
        </div>
    ) : "";
}

function Upload() {
    const buttonSelectionBar = useState(false);
    const setButtonSelectionBar = useState(true);
    function handleSubmit() {
        //check if user logged in
        //local storage 在前端 login里面set了
        let user = localStorage.getItem('userInfo');
        if (user === null) {
            alert("You have to log in to upload a recipe!")
            return;
        }
        user = JSON.parse(user);
        let recipeData = new FormData();
        recipeData.append("author", user.username);
        recipeData.append("title", document.getElementById("input-title").value);
        recipeData.append("calories", document.getElementById("input-calories").value);
        recipeData.append("ingredient", document.getElementById("input-ingredient").value);
        recipeData.append("description", document.getElementById("input-description").value);
        recipeData.append("category", document.getElementById("input-category").value);
        recipeData.append("image", document.getElementById("input-image").files[0]);
        
        axios({
            method: "post",
            url: "http://localhost:3000/recipe",
            data: recipeData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then( (res) =>{
                //handle success
                console.log("success");
            })
            .catch((res) => {
                //handle error
                console.log(res);
            });
    }

    return (
        <div className="button-container">

            
            <SelectionBar trigger={buttonSelectionBar} setTrigger={setButtonSelectionBar} handleSubmit={handleSubmit} />
        </div>
    )
}

export default Upload;