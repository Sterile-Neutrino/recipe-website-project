import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./Mylist.css";
import range from "lodash/range";
import recipePage from './recipePage';
import { useParams, useLocation } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function RecipeItem (item) {
    
  const recipeID = item.item;
  const recipeTitle = item.title;

  
  // console.log(item)
  
  return(
      <Link to={{
          pathname: `/RecipePage/${recipeID}`, //test for dynamic route: path id
        }} component={recipePage} className="RecipeItem"  style = {{textDecoration: 'none' }}>
      <h1 className="RecipeTitle"> 
        {recipeTitle}
      </h1>
    </Link>

  )
};


  function Advise(){
    
    const rand = Math.floor(Math.random() * 10);
  
    const one="What a happly List";
    const two="That not what you want! Want some Fried Chiken?";
    const three="Nice choice overall!"
    if(rand<4){
      var advise=one;
    }
    if(rand>3 && rand <7){
      var advise=two;
    }
    if(rand>6){
      var advise=three;
    }
    

    return (
      <div >
        <h1 className="Advise">
        Advise: {advise}
      </h1>
      </div>

    )
  }

  



class Mylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          myArray: [],
          listTitle: [],
          calories:0
        }
        this.Ca=0;
        this.titles = [];
        this.listItem = new Object();
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount () {
      let userid=localStorage.getItem('userInfo');
      userid=JSON.parse(userid);
      axios.get(`http://localhost:4000/users/find/${userid}`)
      .then((response)=>{
        this.setState({myArray: response.data.myList});
        console.log(this.state.myArray);

      } )
      .then((response)=>{    
      this.getTitle();
      this.getCalories();
      })
      
      //this.getTitle();
    }

    getCalories=()=>{
      for (var ID of this.state.myArray) {
        axios.get(`http://localhost:4000/recipes/${ID}`)
        .then((response)=>{
            //console.log(ID);
            this.Ca=this.Ca+response.data.calories;
            this.setState({calories: this.Ca})
            console.log(this.state.calories);
        })
      }
    }

    getTitle = () => {
      console.log(this.state.myArray)
      for (var ID of this.state.myArray) {
          axios.get(`http://localhost:4000/recipes/${ID}`)
          .then((response)=>{
              console.log(ID);
              this.listItem[ID] = response.data.title;
              this.titles.push(response.data.title)
              this.setState({listTitle: this.titles})
              console.log(this.state.listTitle);
          })
        }
  }

 
   

    render() {

      let result;
        if (this.state.myArray) {
             result = 
             <div className="BasicList">
             {this.state.myArray.map(
               (id) => (<RecipeItem item = {id} title = {this.state.listTitle[this.state.myArray.indexOf(id)]}/>)
             )}
           </div>
        }else {
          result = 
          <strong>
      "Nothing in your list"
          </strong>
      }
      let count=this.state.calories;
      return (
        <div>

          <div className="CalorieCount">
          <h1 className="Calorie">Total Calories: {count} </h1>
          </div>

          <div className="DailyList">
          <h1 className="Title">
              My List of the day
            </h1>
           {result}
          </div>

          <div className="Advise">
            <Advise/>
          </div>
          
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

export default withRouter(Mylist);

//export default Mylist;