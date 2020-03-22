import React, { Component } from 'react'

export default class logout extends Component {

    componentWillMount() {
        // console.log("will mount");
        if(localStorage.getItem('x-auth-token')){

            localStorage.clear();
            window.location.reload();

        }
    }

    componentDidMount() {
        
        // console.log("Is mounted");


        this.props.history.push('/');

    }

    render() {
        return (
            <div>
                Logout
            </div>
        )
    }
}
