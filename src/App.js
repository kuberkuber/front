import React, { Component }  from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { Dashboard } from 'pages';
import Menu from 'components/Menu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Route
          path="/"
          render={(props) => <Dashboard {...props}/>}
        />
      </div >
    );
  }
}

export default App;
