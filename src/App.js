import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import { Dashboard } from 'pages';
import Menu from 'components/Menu';
import { Grid } from '@material-ui/core';

// import {kuberProvider} from './contexts/context'
class App extends Component {
    render() {
		// console.log("props", this.props);

        return (
            // <kuberProvider>
                <div>
                    <Menu {...this.props}/>
                    <div className="App-content">
                        <Grid>
                            <Grid item xs={12}>
                                <Route
                                    path="/"
                                   render={(props) => <Dashboard {...props} />}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div >
            // </kuberProvider>
        );
    }
}

export default withRouter(App);
