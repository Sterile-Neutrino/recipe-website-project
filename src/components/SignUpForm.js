import React, {useState} from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import Button from "react-bootstrap/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
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
            redirect: null,

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

        axios
        .post("http://localhost:3000/users/SignUp", SignUpData)
        .then((res) => {
            console.log(res);
            // only remove if complete successfully
            //if signed up, go login page
            this.setState({ username: "", email: "", password: "" });
            this.setState({ redirect: "/LoginForm" });
        })
        .catch((err) => {
            // if error, notify user
            alert("Error");
        }); 
        
    }
    render(){
        //if directed to other pages, go
        if(this.state.redirect){
            return <Navigate to={this.state.redirect}/>
        }

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

                <input type="submit" value="SIGN UP" />
                
                
            </div>
            
        </form>
        </div>

            )
        }
}

export default SignUpForm

