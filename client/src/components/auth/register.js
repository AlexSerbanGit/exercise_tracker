import React, { Component } from 'react'

export default class Register extends Component {
    
    componentDidMount() {

        if(!localStorage.getItem('x-auth-token')){
            // this.props.history.push('/users');
        }

    }
    
    render() {
        return (
            <div>
                Register
            </div>
        )
    }
}
