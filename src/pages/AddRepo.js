import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';

const title = {
	"margin-top": "60px",
	"margin-bottom": "50px"
};

const content = {
	"margin-bottom": "50px"
};

class AddRepo extends Component {
	render() {
		return(
		<div>
			<div style={title}>
				<Typography variant="h4" gutterBottom>
					Register new repository
				</Typography>
				<Typography variant="body2" gutterBottom>

				</Typography>
			</div>
			<div style={content}>
				<Typography variant="h6" gutterBottom>
					Repository name
				</Typography>
				<TextField
					id="standard-full-width"
					label="Repository name should be unique"
					placeholder="MyfirstRepo"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>
			<div style={content}>
				<Typography variant="h6" gutterBottom>
					Docker Image
				</Typography>
				<TextField
					id="standard-full-width"
					label="KuberKuber only support public image's lates tag"
					placeholder="DockerHub image to deploy (e.g. demo/image)"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>
			<div style={content}>
				<Typography variant="h6" style={{"textAlign":"left"}} gutterBottom>
					Port
				</Typography>
				<TextField
					id="standard-full-width"
					placeholder="80"
					helperText="Port number for access to container"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</div>
			<div style={content}>

				<Link to={`/`} style={{ textDecoration: 'none' }}>
					<Button variant="outlined" color="primary">
						Register and Deploy
					</Button>
				</Link>
				</div>
		</div>
		);
	}

}

export default AddRepo;
