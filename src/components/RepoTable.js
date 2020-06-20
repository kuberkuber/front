import React, { useEffect, useState } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link,withRouter } from 'react-router-dom';

const tableStyle = {
    "marginTop": "100px",
};

const RepoTable = ({ data }) => {

    const [rows, setRow] = useState(data);
    return (
        <div key={data} style={tableStyle}>
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
                            <TableRow key={row.repoName}>
                                <TableCell component="th" scope="row">
                                    {row.status == true ?
                                        <Link to={{ pathname: `/repo/`, state: { 'foo': 'bar'} }} style={{ textDecoration: 'none' }}>
                                            {row.repoName}
                                        </Link> 
                                        :
                                        <Link style={{ textDecoration: 'none' }}>
                                            {row.repoName}
                                        </Link> 
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    {row.status == true ? 'ACTIVE' : 'WAIT'}
                                </TableCell>
                                <TableCell align="left">{row.time}</TableCell>
                                <TableCell align="left">
                                    {row.status == true ? <SettingsIcon /> : <CircularProgress />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default withRouter(RepoTable);
