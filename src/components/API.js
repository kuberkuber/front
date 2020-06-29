import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParamTable from './ParamTable';
import Response from './Response';
import {Grid} from '@material-ui/core';

const content = {
	"marginBottom": "30px"
};

const pathStyle = {
	"marginRight": "10px"
}

const gridStyle = {
	"marginBottom": "30px",
};

const API = ({method, title, info, endpoint}) => {
	const [res, setRes] = useState(null)
	const getResponse = (response) => {
		setRes(response);
	}

	return (
		<div style={content}>
			<ExpansionPanel>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography variant="h6" style={pathStyle}>
						{method}
					</Typography>
					<Typography variant="h6">
						{title}
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container >
						<Grid item xs={12} style={gridStyle}>
							<ParamTable method={method} endpoint= {endpoint} parameters={info.parameters} getResponse={getResponse}/>
						</Grid>
						{
							res != null ?
							<Grid item xs={12} style={gridStyle}>
								<Response info={info.responses} response={res}/>
							</Grid> :
							""
						}
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
};

export default API;
