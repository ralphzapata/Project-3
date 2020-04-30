import React from 'react';
import { Link } from "react-router-dom";

import logo from '../assets/logo.png'

import { getCookie, deleteCookie } from '../utils';

import core from '../core';

class NavigationBar extends React.Component {
    constructor(props) {
        super();
        if (getCookie("tv_token") && getCookie("tv_username")) {
            core.token = getCookie("tv_token");
            core.username = getCookie("tv_username");
        }
    }
    logoutHandler(){

        deleteCookie("tv_token");
        deleteCookie("tv_username");

        core.token = null;
        core.username = null;
    }
    render() {
        if (!core.token)
            return (
                <div>
                    <nav className="navbar navbar-expand-lg  navbar-light">
                        <div className="container">
                            <Link to="/" className="navbar-brand">
                                <img src={logo} alt="Logo" />
                                {/* Travel Verse */}
                            </Link>

                            <button type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbars"
                                aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div id="navbarContent" className="collapse navbar-collapse">
                                <ul className="nav navbar-nav mr-auto">
                                    {/* <li className="nav-item"><Link to="/signup" className="nav-link">signup</Link></li> */}
                                </ul>

                                <ul className="nav navbar-nav navbar-right">
                                    <li className="nav-item"><Link to="/login" className="nav-link">LOGIN</Link></li>
                                    <li className="nav-item"><Link to="/signup" className="nav-link">SIGNUP</Link></li>
                                </ul>

                            </div>
                        </div>
                    </nav>
                    {core.something}
                </div>
            )

        return (
            <div>
                <nav className="navbar navbar-expand-lg  navbar-light">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="Logo" />
                            {/* Travel Verse */}
                        </Link>

                        <button type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbars"
                            aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div id="navbarContent" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav mr-auto">
                                {/* <li className="nav-item"><Link to="/signup" className="nav-link">signup</Link></li> */}
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                {/* <li className="nav-item"><Link to="/" className="nav-link">HOME</Link></li> */}
                                <li className="nav-item"><Link to="/login" onClick={this.logoutHandler} className="nav-link">LOGOUT({core.username})</Link></li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavigationBar;