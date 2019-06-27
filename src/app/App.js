import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import { Register, Login } from './auth';
import { Game } from './NoiseControllerGame';
import { AddClassroom, SettingsPage } from './NoiseControllerGame/classrooms';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className='App'>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/classroom' component={Game} />
      <PrivateRoute exact path='/classroom/add' component={AddClassroom} />
      <PrivateRoute exact path='/settings' component={SettingsPage} />
    </div>
  );
}

export default App;
