import React from 'react';
import {
	// NavLink,
	Link
} from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import GitHubIcon from '@material-ui/icons/GitHub';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
const toolbar = {
	marginLeft: "25%",
};
const name = {
	color: "white",
	fontFamily: "Arial",
	paddingLeft: "10px"
};
const gitBtn = {
	color: "white",
};

const Menu = (props) => {
	const login = async () => {
		const response = await axios.get("http://8bb8d2572824.ngrok.io/login");
		window.location.href = response.data;
		props.history.push({
			pathname: '/',
		});
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
					<Grid item xs={6}>
						<IconButton onClick={login}>
							{/* <Link to={`/login`}> */}
							<GitHubIcon style={gitBtn} fontSize="large" />
							{/* </Link> */}
						</IconButton>
						{/* <IconButton onClick={()=> window.open("/login", 'new', 'scrollbars=no,resizable=no,width=570,height=350,left=100,top=150')}>
						<GitHubIcon style={gitBtn} fontSize="large"/>
					</IconButton> */}
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Menu;
