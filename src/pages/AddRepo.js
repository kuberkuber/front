import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button } from '@material-ui/core';

class AddRepo extends Component {
	render() {
		return(
		<div>
			<h2>
				AddRepo
			</h2>

			<Button variant="outlined" color="primary">
				Repository 등록
			</Button>
		</div>
		);
	}

}

export default AddRepo;
