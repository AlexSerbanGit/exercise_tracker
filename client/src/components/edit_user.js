import React, { Component } from 'react'
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
        }
    }

    componentDidMount() {

        const token = localStorage.getItem('x-auth-token');
        axios.defaults.headers.common['x-auth-token'] = token;

        const id = this.props.match.params.id;
        console.log(id);

        axios.get('http://localhost:5000/user/'+id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                });
            })
            .catch(err => console.log(err));

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.post('http://localhost:5000/update_user/'+this.props.match.params.id, user)
            .then(res => {console.log(res.data);
            console.log("SENT!");

            this.setState({
                username: ''
            });    

            this.forceUpdate();
            this.props.history.push('/users');

            })
            .catch(err => console.log(err));

        
        // window.location = "/users";
        
    }

    render() {
        return (
            <div className="container">

                <h3>Edit user</h3>
                
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">

                        <label>Username: </label>
                        <input type="text"
                        placeholder="Username"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />

                    </div>  

                    <div className="form-group">
                        <input type="submit" value="Create user" className="btn btn-primary" />
                    </div>

                </form>

            </div>
        )
    }
}
