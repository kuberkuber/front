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

const HeaderTable = ({headers}) => {
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
			{Object.keys(headers).map(key =>
				<TableRow key={key}>
				<TableCell component="th" scope="row">
					<Typography>
						{key}
					</Typography>
				</TableCell>
				<TableCell align="left">
					{headers[key]}
				</TableCell>
				</TableRow>
			)}
			</TableBody>
		</Table>
		</TableContainer>
	);
}

export default HeaderTable;
