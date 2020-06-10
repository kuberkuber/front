import React from 'react';
import {
	// NavLink,
	Link
 } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

const toolbar = {
	marginLeft: "25%",
};

const name = {
	color:"white",
	fontFamily:"Arial",
};

const Menu = () => {
  return (
	<div>
		<AppBar position="static">
			<Toolbar disableGutters style={toolbar}>
				<IconButton edge="start" size="medium" color="inherit">
					<CloudQueueIcon style={{"fontSize": "40"}}/>
				</IconButton>
				<Link to={`/`} style={{ textDecoration: 'none' }}>
					<Typography variant="h4" style={name}>
						KuberKuber
					</Typography>
				</Link>
			</Toolbar>
		</AppBar>
	</div>
  );
};

export default Menu;
