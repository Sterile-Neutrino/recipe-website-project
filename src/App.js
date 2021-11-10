import React, {useState} from 'react';
import axios from "axios";
import "./App.css"


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import components here
import SignUp from "./components/SignUpForm";
import LoginForm from './components/LoginForm';

axios.defaults.withCredentials = true;


function App() {
  return(
    <Router>
      <div className="App">
        
      
        <div className="top-bar"></div>
        <nav>
          <Link to="/" className="logo"><h1>My Recipe App</h1></Link>
          <Link to="/" className="Home">
            My Account
          </Link>
          <Link to="/LoginForm" className="LoginForm">
            Login
          </Link>
          <Link to="/SignUp" className="Signup">
            Register
          </Link>
        </nav>
       
         <Routes>
          <Route exact path="/SignUp" exact element={<SignUp/>}/>
          <Route exact path="/LoginForm" exact element={<LoginForm/>}/>


        </Routes>


      </div>

    </Router>

  );
}










export default App;
