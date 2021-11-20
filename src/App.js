import React, {useState} from 'react';
import axios from "axios";
import "./App.css"


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import components here
import SignUp from "./components/SignUpForm";
import LoginForm from './components/LoginForm';
import Home from "./components/Home";
import Mylist from "./components/Mylist.js";
import recipePage from "./components/recipePage.js";

axios.defaults.withCredentials = true;


function App() {

//some code here to make sure user must log in in order to navigate pages
//useEffect(()=>{
  
//});

  return(
    <Router>
      <div className="App">
        
      
        <div className="top-bar"></div>
        <nav>
          <Link to="/Upload" className="logo"><h1>My Recipe App</h1></Link>
          <Link to="/Home" className="Home">
            HomePage
          </Link>
          <Link to="/LoginForm" className="LoginForm">
            Login
          </Link>
          <Link to="/SignUp" className="Signup">
            Register
          </Link>
          <Link to="/recipePage" className="recipePage">
            Recipe Page
          </Link>
        </nav>
       
         <Routes>
          <Route exact path="/SignUp" exact element={<SignUp/>}/>
          <Route exact path="/LoginForm" exact element={<LoginForm/>}/>
          <Route exact path="/Mylist" exact element={<Mylist/>}/>
          <Route exact path="/Home" exact element={<Home/>}/>
          <Route exact path="/recipePage" exact element={<recipePage/>}/>
          <Route exact path="/Upload" exact element={<Upload/>}/>


        </Routes>


      </div>

    </Router>

  );
}
export default App;
