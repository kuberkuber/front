import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import pic1 from '../resources/pic1.svg';
import pic2 from '../resources/pic2.svg';
import pic3 from '../resources/pic3.svg';
import pic4 from '../resources/pic4.svg';

const title_style = {
	color:'#10175e',
	fontFamily:'Arial',
	marginTop: '100px',
	fontSize: 80,
	// textAlign: 'center'
}
const subtitle_style = {
	color: '#070b38',
	marginTop: '10px',
	fontSize: 20,
	// textAlign: 'center'
}
const title2_style = {
	color:'#10175e',
	fontFamily:'Arial',
	marginTop: '50px',
	fontSize: 42,
}
const grid_style = {
	marginTop: '100px',
	fontSize: 24,
	// textAlign: 'center'
}
const bottom_style = {
	backgroundColor:'#070b38',
	marginTop: '50px',
	color: '#ffffff',
	height: '20vh',
	// marginTop: '200px',
}
const bottom_text_style = {
	fontSize:12,
	// textAlign: 'center',
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
	textAlign: 'center',
}

const imgStyle = {
	width: "20%",
	height: "20%",
	maxWidth: "150px",
	maxHeight: "150px",
	margin: "auto"
}

const imgPanelStyle = {
	display: "flex",
	marginTop: "100px"
}


const LandingPage = () => {
	return (
		<div>
			<div style={top_style}>
				<Grid container >
					<Grid item xs={12} style={title_style}>Kuber Kuber</Grid>
					<Grid item xs={12} style={subtitle_style}>For Open Source Activation</Grid>
				</Grid>
			</div>
			<div style={imgPanelStyle}>
				<img src={pic1} style={imgStyle}></img>
				<img src={pic3} style={imgStyle}></img>
				<img src={pic4} style={imgStyle}></img>
				<img src={pic2} style={imgStyle}></img>
			</div>
		</div>
	);
}
export default LandingPage;
