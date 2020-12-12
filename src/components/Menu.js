import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const toolbar = {
	marginLeft: "15%",
};
const name = {
	color: "white",
	fontFamily: "Arial",
	margin: "auto 10px"

};
const gitBtn = {
	color: "white",
};

const Menu = (props) => {
	const handleLogin =  async () => {
		try {
			const response = await axios.get("http://cfb8989e96aa.ngrok.io/login");
			// const response = await axios.get("http://localhost:5000/login");
			window.location.href = response.data;
		} catch (err){
			localStorage.clear()
            props.history.push({
                path: '/'
            })
			console.log(err)
		}
	};
	const handleLogout = () => {
		localStorage.clear()
		props.history.push({
			path: '/'
		})
	}

	return (
		<div>
			<AppBar position="static">
				<Toolbar disableGutters style={toolbar}>
					<Grid item xs={9}>
						<IconButton edge="start" size="medium" color="inherit">
							<CloudQueueIcon style={{ "fontSize": "40" }} />
							<Link to={`/`} style={{ textDecoration: 'none' }}>
								<Typography variant="h4" style={name}>
									KuberKuber
								</Typography>
							</Link>
						</IconButton>
					</Grid>
					<Grid item xs={3}>
						{localStorage.getItem('namespace') === null ?
							<IconButton onClick={handleLogin}>
								<GitHubIcon style={gitBtn} fontSize="large" />
							</IconButton>
							:
							<div style={{display: "flex"}}>
								<Typography style={name}>
									{localStorage.getItem('namespace')}
								</Typography>
								<Button onClick={handleLogout} size="small" variant="outlined" color="inherit">
									LogOut
								</Button>
							</div>
						}
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(Menu);
