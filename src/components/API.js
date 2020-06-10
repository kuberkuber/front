import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParamTable from './ParamTable';
import Response from './Response';
import {Grid} from '@material-ui/core';

const content = {
	"margin-bottom": "30px"
};

const pathStyle = {
	"margin-right": "10px"
}

const gridStyle = {
	"margin-bottom": "30px",
};

const API = ({method, title}) => {
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
							<ParamTable />
						</Grid>
						<Grid item xs={12} style={gridStyle}>
							<Response />
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
};

export default API;
