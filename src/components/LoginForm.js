import React, {useState} from 'react';
import SignUp from './SignUpForm';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



class LoginForm extends React.Component{

    constructor(props){
        super(props);
        /// Setting up state
        this.state={
            username: "",
            password: "",
            IsCompleted: false,
            redirect: null,
            LoggedIn: false

        };
        /// Setting up functions - set 'this' context to this class
        this.inputUsername=this.inputUsername.bind(this);
        this.inputPassword=this.inputPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    //input functions
    inputUsername(event){
        this.setState({
            username: event.target.value
        });
    }
    inputPassword(event){
        this.setState({
            password: event.target.value
        });
    }

    finishLogin(){
        this.setState({
            IsCompleted: true
        });
    }
    
 /*
      CheckLoggedIn({
        axios
        .post("Some address http://localhost")
        .then((res) => {
          // if true, means logged in
          this.setState({ loggedIn: true, redirect: "/" });
        })
        .catch((err) => {
           // if err, means not logged in, so valid for logging
          this.setState({ loggedIn: false });
        });

      })
      */



      //submit the data
    onSubmit(event){
        event.preventDefault();
        const LoginData={
            username: this.state.username,
            password: this.state.password
        };
        if(LoginData.username===""|| LoginData.password==="" ){
            alert("Cannot be empty form!");
            return;
        }
        /*axios
      .post("some address", objObject)
      .then((res) => {
        // only remove if complete successfully
        this.setState({ username: "", password: "" });
        this.setState({ redirect: "/Home" });
      })
      .catch((err) => {
        // if error, notify user
        this.setState({ name: "", password: "" });
        alert(err.response.data.message);
      });*/





    }
    render(){
        if(this.state.redirect){
            return <Link to={this.state.redirect}/>
        }
        if(!this.IsCompleted){
            return(
        <div className="SignInBox" >
        <form className="input_form" onSubmit={this.onSubmit}>
            <div className="form-inner">
                <h2>Log In</h2>
                
               
                <div className="form-group">
                    <label htmlFor="name">UserName:</label>
                    <input type="text" placeholder="Sam Lee" name="name" id="name" onChange={this.inputUsername} value={this.state.username} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="123456" name="password" id="password" onChange={this.inputPassword} value={this.state.password} />
                </div>

                <input type="submit" value="LOGIN" onClick={()=> this.finishLogin()}/>
                
                
            </div>
            
        </form>
        </div>

            )
        }
        else{
            return(
                <LoginForm name={this.state.username}
                    password={this.state.password}/>
            );
        }
    
    }



}




export default LoginForm
