import React from 'react';
import {
	// NavLink,
	Link
 } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';


const Menu = () => {
  return (
	<AppBar>
		<Toolbar>
			<Link to={`/`} style={{ textDecoration: 'none' }}>
				<Button variant="Typography" color="white">
				KuberKuber
				</Button>
			</Link>
		</Toolbar>
	</AppBar>
  );
};

export default Menu;
