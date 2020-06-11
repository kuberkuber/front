import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';

function createData(name, status, time, ) {
	return { name, status, time };
  }

const rows = [
	createData('echo-server', 'Available', 'Jun. 09 2020, 16:14:34 +09:00'),
];

const tableStyle = {
	"margin-top": "100px",
};

const RepoTable = () => {
	return (
		<div style={tableStyle}>
			<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell align="left">Status</TableCell>
					<TableCell align="left">Deploy time</TableCell>
					<TableCell align="left">Setting</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{rows.map((row) => (
					<TableRow key={row.name}>
					<TableCell component="th" scope="row">
						<Link to={`/jjungeun/echo-server`} style={{ textDecoration: 'none' }}>
							{row.name}
						</Link>
					</TableCell>
					<TableCell align="left">
						{row.status}
					</TableCell>
					<TableCell align="left">{row.time}</TableCell>
					<TableCell align="left">
						<SettingsIcon />
					</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
			</TableContainer>
		</div>
	);
}

export default RepoTable;
