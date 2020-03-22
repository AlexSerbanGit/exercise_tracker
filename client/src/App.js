import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ExercisesList from './components/exercises_list';
import EditExercise from './components/edit_exercise';
import CreateExercise from './components/create_exercise';
import CreateUser from './components/create_user';  
import UsersList from './components/users_list';
import EditUser from './components/edit_user';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Logout from './components/auth/logout';

function App() {
  return (

    <Router>
      <Navbar />
      <br/>
      <Route path="/users" component={UsersList} />
      <Route path="/edit_user/:id" component={EditUser} />
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
    </Router>
   
  );
}

export default App;
