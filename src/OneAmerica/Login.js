import React, {Component} from 'react'
import logo from "../assets/images/oneamerica_logo.png"
import "../assets/login.css"
import axios from "axios";
import sha256 from 'js-sha256';

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            attempt:"",
            isAuthenticated:true,
            host:null,
            hidden:true
        }
    }

    componentWillMount(){
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        } else {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        }
    }

    loginButton = _ => {
        var url = this.state.host + '/users/username'
        axios.get(url,{
            params:{
                username:this.state.email
            }
        }).then(response => {
            if(response.data.data[0]){
                this.setState({ attempt: sha256(response.data.data[0].password) })
                this.authenticate();
            }else{
                this.setState({ isAuthenticated: false});
            }
        })
    }
    
    authenticate = _ => {
        if(this.state.password === this.state.attempt){
            this.props.history.push('/oneamerica/dashboard')
        }else{
            this.setState({ isAuthenticated: false })
        }
    }


    toggleHide = _ => {
        this.setState({hidden: !this.state.hidden})
    }

    createNewUser = _ => {
    }

    render(){

        return (
            <div>
                <div id="body">
                    <div id="login_fields">
                        <img id="logo" src={logo} alt="OneAmerica Logo" title="Barclay's Logo" />
                        <h4>Admin Panel Login</h4>
                        <div id="login-page-vspacer"></div>
                        <div id="login-page-input">
                            {
                                !this.state.isAuthenticated &&
                                <div>
                                    Wrong password or username
                                </div>
                            }
                            <div id="textleft">
                                <label>Username</label>
                            </div>
                            <input className="login-input" type="text" name="password" onChange={(e) => {
                                this.setState({
                                    email: e.target.value,
                                    isAuthenticated: true
                                    })
                                }}/><br/>
                            <div id="textleft">
                                <label>Password</label>
                            </div>
                            <input className="login-input" 
                            type={ this.state.hidden ? "password" : "text" } name="password" 
                            onKeyPress={(e) => { 
                                if(e.key === 'Enter'){
                                    this.loginButton();
                                }}}
                            onChange={(e) => {
                                this.setState({
                                    password: sha256(e.target.value),
                                    isAuthenticated: true
                                    })
                                }}/>
                            <div id="showPassword">
                                <label>
                                    Show Password
                                </label>
                                <input id="checkbox" type="checkbox" onClick={this.toggleHide} />
                            </div>
                            <div id="login_button">
                                <input 
                                    type="button" 
                                    className="login-input"
                                    id="loginbutton" 
                                    onClick={this.loginButton}
                                    value="Login" 
                                />
                            </div>
                            <h4 id="login-page-create-user" onClick={() => this.props.history.push('/oneamerica/createuser')}>Create New User</h4>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
