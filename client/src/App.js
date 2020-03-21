import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ExercisesList from './components/exercises_list';
import EditExercise from './components/edit_exercise';
import CreateExercise from './components/create_exercise';
import CreateUser from './components/create_user';  

function App() {
  return (

    <Router>
      <Navbar />
      <br/>

      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
    </Router>
   
  );
}

export default App;
