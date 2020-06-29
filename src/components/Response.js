import React, { useState, useEffect } from 'react';
import {
	Grid,
	Button
} from '@material-ui/core';
import HeaderTable from './HeaderTable';

const titleStyle = {
	"marginRight": "10px"
}

const gridStyle = {
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

const Response = ({info, response}) => {
	const [body, setBody] = useState('');
	const [headers, setHeader] = useState('');
	const [resStatus, setResStatus] = useState('');

	useEffect(() => {
		if(response) {
			setBody(response.data);
			setResStatus(response.status);
			setHeader(response.headers);
		}
	}, [response]);

	return (
		<div>
			<Grid container >
				<Grid item xs={12} style={gridStyle}>
					<span style={titleStyle}>
						Response
					</span>
					<Button size="small" variant="contained" style={buttonStyle}>
						{resStatus}
					</Button>
				</Grid>
				<Grid item xs={12}>
					Body
				</Grid>
				<Grid item xs={12} style={bodyStyle}>
					<div style={codeStyle}>
						<span style={textStyle}>
							{body}
						</span>
					</div>
				</Grid>
				<Grid item xs={12} style={gridStyle}>
					Headers
				</Grid>
				<Grid item xs={12} style={gridStyle}>
					<HeaderTable headers={headers}/>
				</Grid>
			</Grid>
		</div>
	);
}

export default Response;
