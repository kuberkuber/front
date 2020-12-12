import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Dashboard } from 'pages';
import Menu from 'components/Menu';

class App extends Component {
    render() {
        return (
            <div>
                <Menu />
                <div className="App-content">
                    <Route path="/" render={(props) => <Dashboard {...props} />}/>
                </div>
            </div>
        );
    }
}

export default App;
