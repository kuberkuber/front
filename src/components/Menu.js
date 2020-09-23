import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Grid } from '@material-ui/core';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import axios from 'axios';
import { Login } from '../pages';

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
	const handleLogin =  async () => {
		// console.log("login")
		try {
			// const response = await axios.get("http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com:5000/login");
			const response = await axios.get("http://9c8f7dfa708c.ngrok.io/login");
			window.location.href = response.data;
		} catch (err){
			sessionStorage.clear()
            props.history.push({
                path: '/'
            })
			console.log(err)
		}
	};

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
						{sessionStorage.getItem('namespace') === null ?
							<IconButton onClick={handleLogin}>
								<GitHubIcon style={gitBtn} fontSize="large" />
							</IconButton>
							:
							<Typography style={name}>
								{sessionStorage.getItem('namespace')}
								<ExitToAppIcon/>
							</Typography>
						}
						{/* <IconButton onClick={()=> window.open("/login", 'new', 'scrollbars=no,resizable=no,width=570,height=350,left=100,top=150')}>
						<GitHubIcon style={gitBtn} fontSize="large"/>
					</IconButton> */}
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(Menu);
