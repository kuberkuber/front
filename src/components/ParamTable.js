import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	TextField,
	Grid,
	Button
} from '@material-ui/core';

function createData(key, value, required ) {
	return { key, value, required };
  }

const rows = [
	createData('name', 'string', true),
	createData('pretty', 'boolean', false),
];

const inputStyle = {
	width : "100%"
}

const gridStyle = {
	"marginBottom": "30px",
};

const buttonStyle = {
	width: "100%",
	float: "center",
	color : "white",
	"backgroundColor": "darkgreen",
}

const ParamTable = () => {
	return (
		<div>
			<Grid container >
				<Grid item xs={12} style={gridStyle}>
					Parameters
				</Grid>
				<Grid item xs={12} style={gridStyle}>
					<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
						<TableRow>
							<TableCell>Key</TableCell>
							<TableCell align="left">Value</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
						{rows.map((row) => (
							<TableRow key={row.key}>
							<TableCell component="th" scope="row">
								<Typography>
									{row.key}
								</Typography>
							</TableCell>
							<TableCell align="left">
								{row.required ?
								<TextField
									required
									id="outlined-required"
									label="Required"
									placeholder={row.value}
									variant="outlined"
									color="secondary"
									style={inputStyle}
								/>
								:
								<TextField
									id="outlined-required"
									label="Option"
									placeholder={row.value}
									variant="outlined"
									style={inputStyle}
								/>
							}
							</TableCell>
							</TableRow>
						))}
						</TableBody>
					</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={4} style={{"margin": "auto"}}>
					<Button variant="contained" color="primary" style={buttonStyle}>
						request
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

export default ParamTable;
