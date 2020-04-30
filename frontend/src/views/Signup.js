import React from 'react';
// import logo from '../assets/logo.png';

import { apiPost } from '../utils';

import { Redirect } from 'react-router-dom';

import core from '../core';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            un: '',
            pw: '',
            fn: '',
            ln: '',
            c: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUFirstNameChange = this.handleUFirstNameChange.bind(this);
        this.handleLasttNameChange = this.handleLasttNameChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
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


    handleUFirstNameChange(event) {
        this.setState({
            fn: event.target.value
        });
    }

    handleLasttNameChange(event) {
        this.setState({
            ln: event.target.value
        });
    }

    handleCityChange(event) {
        this.setState({
            c: event.target.value
        });
    }

    async signupHandler() {
        core.something = "123";
        try {
            // console.log(this.state.un,this.state.pw,this.state.fn,this.state.ln,this.state.c)
            const signupResult = await apiPost(process.env.REACT_APP_API_URL + '/user', {
                body: {
                    username: this.state.un,
                    password: this.state.pw,
                    first_name: this.state.fn,
                    last_name: this.state.ln,
                    city: this.state.c
                }
            });

            alert(signupResult.data.description);

            this.setState({
                un: '',
                pw: '',
                fn: '',
                ln: '',
                c: ''
            });
        } catch (error) {
            alert(error.response.data.description)
        }
    }

    render() {
        if(core.token)
            return <Redirect to="/" />

        return (
            <div className="container container-signup">
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
                                            <input type="text" className="form-control" value={this.state.un} onChange={this.handleUsernameChange} />
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
                                            <label>First Name:</label>
                                            <input type="text" className="form-control" value={this.state.fn} onChange={this.handleUFirstNameChange} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>Last Name:</label>
                                            <input type="text" className="form-control" value={this.state.ln} onChange={this.handleLasttNameChange} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label>City:</label>
                                            <input type="text" className="form-control" value={this.state.c} onChange={this.handleCityChange} />
                                        </div>
                                    </div>


                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <button type="button" className="btn btn-secondary btn-sm btn-block" onClick={this.signupHandler}>REGISTER</button>
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