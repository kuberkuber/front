import React, { useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import {
    Button
} from '@material-ui/core';
import { AddRepo, DetailRepo, Setpage, Login, LandingPage } from '.';
import RepoTable from 'components/RepoTable';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ImageFinder } from '../components/ImageFinder';

const button = {
    textDecoration: 'none',
    float: 'right',
};

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.kuberData.repos);
    const request = async () => {
        try {
            const response = await axios.get("http://9c8f7dfa708c.ngrok.io/", {
                headers: {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('jwt')
                },
                params: {
                    namespace: sessionStorage.getItem('namespace')
                }
            });
            await dispatch({
                type: 'UPDATEDATA',
                data: response.data
            });
            return response.data;
        }
        catch (error) {
            sessionStorage.clear()
            console.log(error)
            props.history.push({
                path: '/'
            })
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem('jwt') !== null)
            request();
    }, [sessionStorage.getItem('namespace')]);
    return (
        <div>
            <Switch>
                {/* Route에 setting page 경로 추가 */}
                <Route path={`/setting/`} component={Setpage} />
                <Route path={`/add`} component={AddRepo} />
                <Route path="/user" component={Login} />
                    {/* {console.log(window.location)} */}
                <Route path={`/repo/`} component={DetailRepo} />
                <Route path="/">
                    {console.log("Here")}
                    {sessionStorage.getItem('namespace') ?
                        <div>
                            <h1 style={{ 'textAlign': 'center' }}>
                                Dashboard
                            </h1>
                            <Link to={`/add`} style={button}>
                                <Button variant="outlined" color="primary">
                                    Register new repository
                                </Button>
                            </Link>
                            {/* <RepoTable data={data} /> */}
                            <RepoTable data={repos} />
                            <br />
                        </div>
                    : <LandingPage />
                    }
                </Route>

            </Switch>
        </div>
    );
}

export default Dashboard;
