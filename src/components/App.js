import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import Game from './NoiseControllerGame/Game';

function App() {
  return (
    <div className='App'>
      <Route exact path='/game' component={Game} />
    </div>
  );
}

export default App;
