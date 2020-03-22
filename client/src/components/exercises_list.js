import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date}</td>
        <td>
            <Link className="btn btn-warning" to={"/edit/"+props.exercise._id} style={{ marginRight: 10 }}>edit</Link> 
            <button onClick={() => {props.deleteExercise(props.exercise._id)}} className="btn btn-danger">delete</button>
        </td>
    </tr>
)

export default class ExercisesList extends Component {

    constructor(props){

        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.exercisesList = this.exercisesList.bind(this);

        this.state = {exercises: []};

    }

    componentDidMount() {

        // no auth token 
        if(!localStorage.getItem('x-auth-token')){
            this.props.history.push('/login');
        }
        const token = localStorage.getItem('x-auth-token');
        axios.defaults.headers.common['x-auth-token'] = token;

        axios.get('http://localhost:5000/exercises')
            .then(response => {
                this.setState({
                    exercises: response.data,
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    deleteExercise(id) {

        axios.get('http://localhost:5000/delete_exercise/'+id)
            .then(res => {
                console.log(res.data);

                this.setState({
                    exercises: this.state.exercises.filter(el => el._id !== id),
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    exercisesList() {
        
        
            console.log(this.state.exercises);
            return this.state.exercises.map(exercise => {
                console.log("DA");
                return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id} />
            });
       
        

    }

    render() {
        return (
            <div className="container">
                <h3>Exercises list</h3>

                <table className="table">

                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        { this.exercisesList() }
                    </tbody>

                </table>

            </div>
        )
    }
}
