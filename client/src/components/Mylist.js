import React, {useDebugValue, useState} from 'react';
import axios from "axios";
import "./Mylist.css";
import range from "lodash/range";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const recipeList = ["Chicken Sandwitch", "Fried Rice", "Spaghetti with Italian Meatball"];

const RecipeItem = ({ index= {} }) => (
  <Link component={Link} to="/RecipePage" className="RecipeItem"  style = {{textDecoration: 'none' }}>
    <h1 className="RecipeTitle"> 
      {recipeList[index % 3]}
    </h1>
  </Link>
  

);
function CalorieCount() {
    var count=0

    return (
     <div >   
          <h1 className="Calorie">Total Calories: {count} </h1>

     </div>
     
    )
  
  }

  function DailyList(){
    const [render] = useState(true);

    return(
      <div className="DailyListDisplay">
        <h1 className="Title">
        My List Today!
      </h1>

      <div className="BasicList">
      {render &&
              range(3).map(item => (
                <RecipeItem key={item} index={item}/>
              ))}
          </div>
       </div>

    )
  }

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
    }

    getUser=()=>{
      var self=this;
      let userid=localStorage.getItem('userInfo');
      axios.get(`http://localhost:4000/users/find/${userid}`)
        .then((response)=>{
          console.log(response.data.myList)//for debugging
          if (response.data.likeList.includes('61a588e7de7ab6c1924f69a1')){
            self.setState({liked:true});
          };
          if (response.data.myList.includes('61a588e7de7ab6c1924f69a1')){
            self.setState({added:true});
            console.log(self.state.added);
          }
        })
    }


    render() {
      return (
        <div>

          <div className="CalorieCount">
            <CalorieCount/>
          </div>

          <div className="DailyList">
            <DailyList/>
          </div>

          <div className="Advise">
            <Advise/>
          </div>
          
        </div>
      );
    }

}

export default Mylist;