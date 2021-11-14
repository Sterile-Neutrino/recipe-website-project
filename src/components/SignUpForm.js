import React, {useState} from 'react';
//import axios from 'axios';
import LoginForm from './LoginForm';
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import { Link } from "react-router-dom";
//axios.defaults.withCredentials = true;

class SignUpForm extends React.Component{
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
        /// Setting up functions - set 'this' context to this class
        this.inputUsername=this.inputUsername.bind(this);
        this.inputPassword=this.inputPassword.bind(this);
        this.inputEmail=this.inputEmail.bind(this);
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
    inputEmail(event){
        this.setState({
            email: event.target.value
        });
    }


    finishSignUp(){
        this.setState({
            IsCompleted: true
        });
    }

    //onSubmitBack(e) {
        //e.preventDefault();
       // this.setState({ redirect: "/" });
    //  }

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
        const SignUpData={
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        if(SignUpData.username===""|| SignUpData.password==="" || SignUpData.email===""){
            alert("Cannot be empty form!");
            return;
        }

        /*-----some axios input data codes here
        ------axios send data to backend
        ------need send to a specific location address
        axios
        .post("some address start with http://localhost", SignUpData)
        .then((res) => {
            // only remove if complete successfully
            this.setState({ username: "", email: "", password: "" });
            this.setState({ redirect: "/LoginForm" });
        })
        .catch((err) => {
            // if error, notify user
            alert(err.response.data.message);
        }); 
        */
    }
    render(){
        //if directed to other pages, go
        if(this.state.redirect){
            return <Link to={this.state.redirect}/>
        }
        if(!this.IsCompleted){
            return(
        <div className="SignUpBox" >
        <form className="input_form" onSubmit={this.onSubmit}>
            <div className="form-inner">
                <h2>Sign up</h2>
                
               
                <div className="form-group">
                    <label htmlFor="name">UserName:</label>
                    <input type="text" placeholder="Sam Lee" name="name" id="name" onChange={this.inputUsername} value={this.state.username} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="example@email.com" name="email" id="email" onChange={this.inputEmail} value={this.state.email} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder="123456" name="password" id="password" onChange={this.inputPassword} value={this.state.password} />
                </div>

                <input type="submit" value="SIGN UP" onClick={()=> this.finishSignUp()}/>
                
                
            </div>
            
        </form>
        </div>

            )
        }
        else{
            return(
                <SignUpForm name={this.state.username}
                    email={this.state.email}
                    password={this.state.password}/>
            );
        }
    }



}


export default SignUpForm
