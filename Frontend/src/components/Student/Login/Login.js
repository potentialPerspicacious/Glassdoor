import React, {Component} from 'react';
import '../../../Login.css';
import '../../../App.css';
import axios from 'axios';
import backendServer from '../../../webConfig';
import { Link } from 'react-router-dom';
import LoginNavbar from '../Navbar/navbar_login';
import {Button} from 'react-bootstrap';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            first_name: "",
            last_name: "",
            authFlag : false,
            err: "",
            error: null
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.divStyle = {
            width: '100%',
            height: '900px',
            backgroundImage: `url(https://www.glassdoor.com/app/static/img/home/vr.jpg)`,
            backgroundSize: 'cover'
        };
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSignUp = (e) => {
        e.preventDefault();
        if (this.state.password.length < 7) {
          this.setState({
            message: "Minimum password length is 6 characters"
          })
          return
        }
        const data = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email : this.state.email,
          password : this.state.password
        }
        axios.defaults.withCredentials = true;
        axios.post(`${backendServer}student/register`,data)
            .then(response => {
                console.log(response.data)
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                  alert("Signed Up successfully")
                 
                }else{
                    this.setState({

                        authFlag : false,
                        invalid: true
                    })
                }
            })
            .catch(err => {
              console.log(err)
                    this.setState({
                        message : "Email already exists"
                    })
            })
    }

    render(){
        let redirectVar = null;    
        if(this.state.redirect){
            redirectVar = this.state.redirect
        }
        return(
            <div style={this.divStyle}> 
                {redirectVar}
                <div>
                  <LoginNavbar></LoginNavbar>
                    <br /><br /><br />
                    <div class="d-flex justify-content-center h-100">
                        <div class="login-card">
                            <div class="card-header">
                                <h3>Sign Up</h3>
                            </div>
                            <div class="card-body">
                                <form onSubmit={this.onSignUp}>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input required type="text" class="form-control" onChange = {this.changeHandler} name="first_name" placeholder="First Name" />
                                
                                    </div>

                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input required type="text" class="form-control" onChange = {this.changeHandler} name="last_name" placeholder="Last Name" />
                                
                                    </div>

                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        </div>
                                        <input required type="email" class="form-control" onChange = {this.changeHandler} name="email" placeholder="Create account with Email" />
                                
                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input required type="password" class="form-control" name="password" onChange = {this.changeHandler} placeholder="Password" />
                                    </div>
                                    <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                                    <div class="form-group">
                                        <Button type="submit" variant="success" className="float-right"> Continue with Email </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="post-jobs">
                  Are you hiring?<Link to="/company/login"> Post Jobs</Link>
                </div>
            </div>
        )
    }
}

export default Login;