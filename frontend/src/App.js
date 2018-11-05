import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'setup/Routes';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}

export default App;
