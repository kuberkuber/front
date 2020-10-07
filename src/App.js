import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Dashboard } from 'pages';
import Menu from 'components/Menu';
import { Grid } from '@material-ui/core';
import { LandingPage } from './pages';

class App extends Component {
    render() {
        return (
            <div>
                <Menu />
                {localStorage.getItem('namespace') ?
                    <div className="App-content">
                        <Route path="/" render={(props) => <Dashboard {...props} />}/>
                    </div>
                    :
                    <LandingPage />
                }
            </div>
        );
    }
}

export default App;
