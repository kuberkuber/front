import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@material-ui/core';
import { AddRepo } from '.';

const button = {
	textDecoration: 'none',
	float: 'right',
};

class Dashboard extends Component{
	render() {
		const { match } = this.props;
		return(
		<div>
			<Switch>
				<Route path = {`/add`}>
					<AddRepo/>
				</Route>
				<Route exact path = {`/`}>
					<h1 style={{'text-align' : 'center'}}>
						Dashboard
					</h1>
					<Link to={`${match.url}add`} style={button}>
						<Button variant="outlined" color="primary">
							Register new repository
						</Button>
					</Link>

				</Route>
			</Switch>
		</div>
		);
	}
}

export default Dashboard;
