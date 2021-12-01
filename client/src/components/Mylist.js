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

  function getRecipe(id){
    //let result = "no value";
    axios.get(`http://localhost:4000/recipes/${id}`)
            .then((response)=>{
           //display titles
           const v=response.data.title;
           //result = v;
           console.log(v);
           return(v);
          
           })
    //return result;
  }



class Mylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          myArray: [],
        }
    }

    componentDidMount = ()=>{
      this.getUser();
      this.setState({
        myArray: this.state.myArray
      })

      
    }

    getUser=()=>{
      var self=this;
      let userid=localStorage.getItem('userInfo');
      userid=JSON.parse(userid);
      axios.get(`http://localhost:4000/users/find/${userid}`)
        .then((response)=>{
          console.log(response.data.myList)//for debugging
          const list=response.data.myList;
          //onsole.log(list.length)//size of my list
          for(let i=0;i<list.length; i++){
            //console.log(this.getRecipe3(list[i]))
            axios.get(`http://localhost:4000/recipes/${list[i]}`)
            .then((response)=>{
           //display titles
           const v=response.data.title;
           //result = v;
           console.log(v);
           this.state.myArray.push(v);
          
           })
           
            
           
          }
          console.log(this.state.myArray)
          //console.log(A)//check array
          //console.log(A.length)
          let DailyList;
          if (response.data.LikeList === undefined) {
            DailyList = [];
          } else{



           // DailyList = response.data.map(element => {
           // const post = {
           //   "id": element._id,
           //   "title": element.title,
           // }
           // return post;
         // });
        
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