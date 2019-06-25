import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

import { Game } from './NoiseControllerGame';

function App() {
  return (
    <div className='App'>
      <Route path='/' component={Game} />
    </div>
  );
}

export default App;
