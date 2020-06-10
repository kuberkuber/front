import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import {
	Button
} from '@material-ui/core';
import { AddRepo, DetailRepo } from '.';
import RepoTable from 'components/RepoTable';

const button = {
	textDecoration: 'none',
	float: 'right',
};

class Dashboard extends Component{

	render() {
		// const { match } = this.props;
		return(
		<div>
			<Switch>
				<Route path = {`/add`}>
					<AddRepo/>
				</Route>
				<Route path = {`/jjungeun/echo-server`}>
					<DetailRepo/>
				</Route>
				<Route exact path = {`/`}>
					<h1 style={{'text-align' : 'center'}}>
						Dashboard
					</h1>
					<Link to={`/add`} style={button}>
						<Button variant="outlined" color="primary">
							Register new repository
						</Button>
					</Link>
					<RepoTable />
				</Route>
			</Switch>
		</div>
		);
	}
}

export default Dashboard;
