import React, {useState} from 'react';
//import axios from 'axios';
import LoginForm from './LoginForm';

class SignUpForm extends React.Component{
    constructor(props){
        super(props);

        this.state={
            username: "",
            password: "",
            email: "",
            IsCompleted: false

        }
        //bind functions
        this.inputUsername=this.inputUsername.bind(this);
        this.inputPassword=this.inputPassword.bind(this);
        this.inputEmail=this.inputEmail.bind(this)

    }

    //functions
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

    //submit the data
    onSubmit(event){
        event.preventDefault();
        const SignUpData={
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        ///-----some axios input data codes here
        //------send data to backend
    }
    render(){
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
                    <input type="password" name="password" id="password" onChange={this.inputPassword} value={this.state.password} />
                </div>

                <input type="submit" value="SIGN UP" onClick={()=> this.finishSignUp()}/>

                
                <p class="form__text">
                    <a class="form__link" href="./" id="linkLogin">Already have an account? Sign in!</a>
                </p>

                
            </div>
            
        </form>
        </div>

            )
        }
        else{
            return(
                <LoginForm name={this.state.username}
                    email={this.state.email}
                    password={this.state.password}/>
            );
        }
    }



}


export default SignUpForm
