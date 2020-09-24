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
            const response = await axios.get("http://b4662ae0a162.ngrok.io/", {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                },
                params: {
                    namespace: localStorage.getItem('namespace')
                }
            });
            await dispatch({
                type: 'UPDATEDATA',
                data: response.data
            });
            return response.data;
        }
        catch (error) {
            localStorage.clear()
            console.log(error)
            props.history.push({
                path: '/'
            })
        }
    };

    useEffect(() => {
        if (localStorage.getItem('jwt') !== null)
            request();
    }, [localStorage.getItem('namespace')]);
    return (
        <div>
            <Switch>
                {/* Route에 setting page 경로 추가 */}
                <Route path={`/setting/`} component={Setpage} />
                <Route path={`/add`} component={AddRepo} />
                <Route path="/user" component={Login} />
                    {/* {console.log(window.location)} */}
                <Route path={`/repo/`} component={DetailRepo} />
                <Route path={`/search`} component={ImageFinder}/>
                <Route path="/">
                    {console.log("Here")}
                    {localStorage.getItem('namespace') ?
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
