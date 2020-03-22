import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const AuthNavLinks = props => (
    <div>
        <Link to="/login">Login</Link> / <Link to="/register">Register</Link>
    </div>
)

const UserNavLinks = props => (
    <div>
        <Link to="#">{props.username}</Link> / <Link to="/logout">Logout</Link>
    </div>
)

export default class Navbar extends Component {

    componentDidMount() {

        // console.log("da");
        // if(!localStorage.getItem('x-auth-token')){
        //     alert('not auth');
        // }

    }

    isAuth() {
        
        if(!localStorage.getItem('x-auth-token')){
            return <AuthNavLinks />;
        }

        const username = localStorage.getItem('username');

        return <UserNavLinks username={username} />;

    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container">
                <Link to="/" className="navbar-brand">ExerTracker</Link>

                <div className="navbar-collapse">

                    <ul className="navbar-nav mr-auto">

                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create exercise</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create user</Link>
                        </li>

                    </ul>

                    <span className="navbar-text">
                        {
                            this.isAuth()
                        }
                    </span>

                </div>
                
                </div>

            </nav>
        )
    }
}
