import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const title_style = {
	color:'#10175e',
	fontFamily:'Arial',
	marginTop: '100px',
	fontSize: 80,
	textAlign: 'center'
}
const title2_style = {
	color:'#10175e',
	fontFamily:'Arial',
	marginTop: '50px',
	fontSize: 42,
}
const subtitle_style = {
	color: '#070b38',
	marginTop: '10px',
	fontSize: 20,
	textAlign: 'center'

}
const grid_style = {
	marginTop: '100px',
	fontSize: 24,
	textAlign: 'center'

}
const bottom_style = {
	backgroundColor:'#070b38',
	marginTop: '50px',
	color: '#ffffff',
	height: '20vh',
	marginTop: '200px',
}
const bottom_text_style = {
	fontSize:12,
	textAlign: 'center'
}
const temp_style = {
	height: '18vh'
}
const top_style={
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	marginLeft: '15%',
	marginRight: '15%',
}

const LandingPage = () => {
	return (
		<div style={top_style}>
			<Grid container >
				<Grid item xs={12} style={title_style}>Kuber Kuber</Grid>
				<Grid item xs={12} style={subtitle_style}>For Open Source Activation</Grid>
			</Grid>
			<Grid container style={grid_style}>
				<Grid item xs={12} style={title2_style}>Our Special Features</Grid>
				<Grid item xs={6}>Convenient test</Grid>
				<Grid item xs={6}>Auto deployment</Grid>
			</Grid>
			<footer style={bottom_style}>
				<div style={temp_style}></div>
				<Grid container>
					<Grid item xs={4} style={bottom_text_style}>Kuber Kuber</Grid>
					<Grid item xs={4} style={bottom_text_style}>Copyright2020</Grid>
					<Grid item xs={4} style={bottom_text_style}>All Rights Reserved</Grid>
				</Grid>
			</footer>
		</div>
	);
}
export default LandingPage;
