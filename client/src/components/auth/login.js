import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
    
    constructor(props) {

        super(props);

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }

    }

    componentDidMount() {

        if(localStorage.getItem('x-auth-token')){
            // this.props.history.push('/users');

            this.props.history.push('/');

        }

    }

    onChangeEmail(e) {

        this.setState({
            email: e.target.value,
        });

    }

    onChangePassword(e) {

        this.setState({
            password: e.target.value,
        });

    }

    onSubmit(e) {

        e.preventDefault();
        // console.log(this.state);
        alert("submit");

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        // console.log(user);
        
        axios.post('http://localhost:5000/login', user)
            .then(res => {
                
                // console.log(res.data);

                const token = res.data.token;
                const username = res.data.user.name;
                const email = res.data.user.email;

                localStorage.setItem('x-auth-token', token);
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);

                window.location.reload();

            })
            .catch(err => console.log(err));

        // this.setState({
        //     username: ''
        // });


    }

    render() {
        return (
            <div className="container">
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Username:</label>
                        <input className="form-control" placeholder="email" required type="email" onChange={this.onChangeEmail} />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control" placeholder="password" required type="password" onChange={this.onChangePassword} />
                    </div>

                    <input type="submit" className="btn btn-primary" />

                </form>
            </div>
        )
    }
}
