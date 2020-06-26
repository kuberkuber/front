import React from 'react';
import {
	Grid,
	Button
} from '@material-ui/core';
import HeaderTable from './HeaderTable';

const titleStyle = {
	"marginRight": "10px"
}

const gridStyle = {
	// "marginTop": "30px",
	"marginBottom": "10px",
};

const bodyStyle = {
	"marginTop": "10px",
	"marginBottom": "20px",
	"backgroundColor": "black",
	"color": "white",
};

const textStyle = {
	"whiteSpace": "pre-wrap"
}

const codeStyle = {
	"margin": "10px"
}

const buttonStyle = {
	"backgroundColor": "yellowgreen",
	"color": "white"
}

// var res = {
// 	"results": [
// 		"string"
// 	],
// 	"options": [{
// 	  "key": "string",
// 	  "value": true
// 	}]
// }
// res = JSON.stringify(res, null, '\t');
var res = "Hello jungeun!"

const Response = ({responses}) => {
	return (
		<div>
			<Grid container >
				<Grid item xs={12} style={gridStyle}>
					<span style={titleStyle}>
						Response
					</span>
					<Button size="small" variant="contained" style={buttonStyle}>
						200
					</Button>
				</Grid>
				<Grid item xs={12}>
					Body
				</Grid>
				<Grid item xs={12} style={bodyStyle}>
					<div style={codeStyle}>
						<span style={textStyle}>
							{res}
						</span>
					</div>
				</Grid>
				<Grid item xs={12} style={gridStyle}>
					Headers
				</Grid>
				<Grid item xs={12} style={gridStyle}>
					<HeaderTable />
				</Grid>
			</Grid>
		</div>
	);
}

export default Response;
