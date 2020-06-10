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
} from '@material-ui/core';

function createData(key, value ) {
	return { key, value };
  }

const rows = [
	createData('Content-Type', 'text/html; charset=utf-8'),
	createData('Content-Length', '89'),
	createData('Server', 'Werkzeug/1.0.1 Python/3.6.9'),
	createData('Date', 'Wed, 10 Jun 2020 16:54:52 GMT'),
];

const HeaderTable = () => {
	return (
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
					{row.value}
				</TableCell>
				</TableRow>
			))}
			</TableBody>
		</Table>
		</TableContainer>
	);
}

export default HeaderTable;
