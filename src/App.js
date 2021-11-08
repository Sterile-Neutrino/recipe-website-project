import React, {useState} from 'react';
import { Route, Router } from 'react-router';
import LoginForm from './components/LoginForm';
//import SignUpForm from './components/SignUpForm';

function App() {
  //default email formula
  const adminUser={
    name: "username",
    password: "123456"
  }

//useState hook to initilize state
  const [user,setUser] = useState({name: ""});
  const [error, setError] = useState("");

  const Login = details => {
    //console.log() method writes a message to the console.
    console.log(details);
    //if username matches  password
    if(details.name==adminUser.name && details.password==adminUser.password){
      console.log("Logged in")
      setUser({
        name: details.name
      });
    }else{
      console.log("Username password combination not match")
      setError("Username password combination not match")
    }

  }

  const Logout =() => {
    setUser({name:""});
  }

  return (
    <div className="App">
      {(user.name !="") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ):(
        <LoginForm Login={Login} error={error}/>
        
      )}
    </div>
  );
}

export default App;
