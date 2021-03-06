import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class UsersList extends Component {
    
    constructor(props){

        super(props);

        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            users: [],
        }

    }

    componentDidMount() {

        const token = localStorage.getItem('x-auth-token');
        axios.defaults.headers.common['x-auth-token'] = token;

        axios.get('http://localhost:5000/users')
            .then(res => {
                console.log("mounted");

                // console.log("DADADA");
                this.setState({
                    users: res.data,
                });
            });

    }

    deleteUser(id) {

        axios.get('http://localhost:5000/delete_user/'+id)
            .then(res => {
                console.log(res);
                this.setState({
                    users: this.state.users.filter(user => user._id !== id),
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    usersList() {

        return this.state.users.map(user => {
            return <div className="alert alert-info">{user.username}
                <div className="float-right"> 
                    <Link to={"/edit_user/" + user._id} style={{ marginTop: -7, marginRight: 5 }} className="btn btn-warning">Edit</Link>
                    <button style={{ marginTop: -7 }} onClick={ () => this.deleteUser(user._id) } className="btn btn-danger">Delete</button>
                </div>
            </div>
        });

    }

    render() {
        return (
            <div className="container">
                <h3>Users list</h3>
                { this.usersList() }
            </div>
        )
    }
}
