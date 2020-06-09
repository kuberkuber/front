import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AddRepo } from '.';

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
					<h2>
						Dashboard
					</h2>
					<Link to={`${match.url}add`} style={{ textDecoration: 'none' }}>
						<Button variant="outlined" color="primary">
							Repository 생성
						</Button>
					</Link>
				</Route>
			</Switch>
		</div>
		);
	}
}

export default Dashboard;
