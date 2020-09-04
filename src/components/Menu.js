import React from 'react';
import {
	// NavLink,
	Link
 } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Grid } from '@material-ui/core';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

const toolbar = {
	marginLeft: "25%",
};
const name = {
	color:"white",
	fontFamily:"Arial",
	paddingLeft:"10px"
};
const toolbarBtn = {
	  color:"white",
	  fontSize: '18px',
	};


const Menu = () => {
  return (
	<div>
		<AppBar position="static">
			<Toolbar disableGutters style={toolbar}>
				<Grid item xs={9}>
				<IconButton edge="start" size="medium" color="inherit">
					<CloudQueueIcon style={{"fontSize": "40"}}/>
					<Link to={`/`} style={{ textDecoration: 'none' }}>
					<Typography variant="h4" style={name}>
						KuberKuber
					</Typography>
					</Link>					
				</IconButton>
				</Grid>
				<Grid item xs={6}>
				<Button style={toolbarBtn} variant="inherit" href="\login" >
  					Login
				</Button>
				</Grid>
			</Toolbar>
		</AppBar>
	</div>
  );
};

export default Menu;
