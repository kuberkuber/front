import React, { useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import {
    Button
} from '@material-ui/core';
import { AddRepo, DetailRepo, Setpage } from './';
import RepoTable from 'components/RepoTable';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const button = {
    textDecoration: 'none',
    float: 'right',
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const kuberData = useSelector(state => state.kuberData);
    let namespace = kuberData.user.namespace;
    const data = kuberData.repos;

    const request = async () => {
        try {
            if (namespace === '') {
                const params = new URLSearchParams(window.location.search);
                namespace = params.get('namespace');
                if (namespace !== '') {
                    dispatch({
                        type:'LOGIN',
                        namespace: namespace,
                        userToken: ''
                    });
                }
            }
            console.log("namespace", namespace);
            const response = await axios.get("http://8bb8d2572824.ngrok.io/", {
                params: {
                    namespace: namespace
                }
            });
            dispatch({
                type: 'UPDATEDATA',
                data: response.data
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        request();
    }, []);

    return (
        <div>
            <Switch>
                {/* Route에 setting page 경로 추가 */}
                <Route path={`/setting/`}>
                    <Setpage />
                </Route>
                {/* {<Route path={`/login`}>
                    <Login/>
                </Route>} */}
                <Route path={`/add`}>
                    <AddRepo />
                </Route>
                <Route path={`/repo/`}>
                    <DetailRepo />
                </Route>
                <Route exact path={`/`}>
                    <h1 style={{ 'textAlign': 'center' }}>
                        Dashboard
                    </h1>
                    <Link to={`/add`} style={button}>
                        <Button variant="outlined" color="primary">
                            Register new repository
						</Button>
                    </Link>
                    <RepoTable data={data} />
                    <br />
                </Route>
            </Switch>
        </div>
    );
}


export default Dashboard;
