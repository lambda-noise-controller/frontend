import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import { Game } from './NoiseControllerGame';
import { Register, Login } from './auth';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className='App'>
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/game' component={Game} />
    </div>
  );
}

export default App;
