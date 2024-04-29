import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './components/UI/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <HomePage />
      </Router>
    </div>
  );
}

export default App;
