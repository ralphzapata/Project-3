import React from 'react';
// import logo from '../assets/logo.png';

import { apiPost, createCookie } from '../utils';
import { Redirect } from 'react-router-dom';

import core from '../core';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {un: '', pw: ''};

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({
            un: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            pw: event.target.value
        });
    }

    async loginHandler() {
        try {            
            const loginResult = await apiPost(process.env.REACT_APP_API_URL + '/user/login', {
                body: {
                    username: this.state.un,
                    password: this.state.pw
                }
            });
            const token = loginResult.data.body.token;
            const expiration = loginResult.data.body.expiration;
            createCookie("tv_token", token, expiration)
            createCookie("tv_username", this.state.un, expiration)

            core.token = token;
            core.username = this.state.un;

            alert(loginResult.data.description);
            
        } catch (error) {
            alert(error.response.data.description)
        }
    }

    render() {
        if(core.token)
            return <Redirect to="/" />
        
        return (
            <div className="container container-login">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="col-md-12">
                            <div className="card border-0">
                                <div className="card-body">
                                    {/* <div className="form-row text-center">
                                        <img src={logo} alt="Logo" className="mx-auto logo"/>
                                    </div> */}
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>Username:</label>
                                            <input type="text" className="form-control" value={this.state.un} onChange={this.handleUsernameChange}  />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>Password:</label>
                                            <input type="password" className="form-control" value={this.state.pw} onChange={this.handlePasswordChange} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <button type="button" className="btn btn-secondary btn-sm btn-block" onClick={this.loginHandler}>LOGIN</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;