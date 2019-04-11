import React, {Component} from 'react'
import logo from "../assets/images/oneamerica_logo.png"
import "../assets/login.css"
import axios from "axios";
import sha256 from 'js-sha256';

var globalPassword = ""

export default class CreateUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            username:"",
            password:"",
            confirm:"",
            isValid:true,
            success:false,
            isCreated:false,
            isSameUserName:false,
            host:null
        }
    }
    
    componentWillMount(){
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        } else {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        }
    }

    createUserButton = (password) => {
        var url = this.state.host + '/users/add'
        axios.post(url, {
            username: this.state.username,
            password: password
        }).then(response => {
            switch(response.status){
                case 200:
                    this.props.history.push('/login')
                    break;
                default:
                    this.setState({sucess: false})
            }
        })
    }
    
    authenticate = (password) => {
        var url = this.state.host + '/users/username'
        axios.get(url,{
            params:{
                username:this.state.username
            }
        }).then(response => {
            console.log(response.data.data)
            if(response.data.data[0]){
                this.setState({isSameUserName: true})
            }else{
                this.createUserButton(password);
            }
        })
        if(this.state.success === true){
            this.props.history.push('/oneamerica/login')
        }
    }

    render(){
        return (
            <div>
                <div id="body">
                    <div id="login_fields">
                        <img id="logo" src={logo} alt="OneAmerica Logo" title="Oneamerica Logo" />
                        <h4>Admin Panel Login</h4>
                        <div id="login-page-vspacer"></div>
                        {
                                this.state.isSameUserName &&
                                <div>
                                    This username is already used.
                                </div>
                            }
                            {
                                !this.state.isValid &&
                                <div>
                                    Your passwords do not match.
                                </div>
                            }
                        <div id="login-page-input">
                            <div id="textleft">
                                <label>New Username</label>
                            </div>
                            <input className="login-input" type="text" name="password" onChange={(e) => {
                                this.setState({
                                    username: e.target.value
                                    })
                                }}/><br/>
                            <div id="textleft">
                                <label>New Password</label>
                            </div>
                            <input className="login-input" type="password" name="password"
                            onChange={(e) => {
                                this.setState({
                                    password: sha256(e.target.value)
                                    })
                                    globalPassword = e.target.value
                                }}></input>
                            <div id="textleft">
                                <label>Confirm Password</label>
                            </div>
                            <input className="login-input" type="password" name="password" 
                            onKeyPress={(e) => { 
                                if(e.key === 'Enter'){
                                    this.createUserButton();
                                }}}
                            onChange={(e) => {
                                this.setState({
                                    confirm: sha256(e.target.value)
                                    })
                                }}/>
                            <div id="login_button">
                                <input 
                                    type="button" 
                                    id="loginbutton" 
                                    onClick={ () => {
                                        if(this.state.confirm === this.state.password){
                                            this.setState({isValid: true})
                                            this.authenticate(globalPassword)
                                        }
                                        else{
                                            this.setState({isValid: false})
                                        }
                                    }}
                                        
                                    value="Create User" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}