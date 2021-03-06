import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Link,withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const tableStyle = {
    "marginTop": "100px",
};
const iconStyle = {
    "color" : "#000000",
}
const RepoTable = ({ data }) => {
    const [rows, setRow] = useState(data);
    useEffect(() => {
        setRow(data);
    },[data]);
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
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    <Link to={{ pathname: `/repo/${row.name}`, state: {row} }} style={{ textDecoration: 'none' }}>
                                        {row.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">
                                    {/* {row.status === "True" ? 'Available' : 'Deploying'} */}
                                {row.status === "True" ?
                                    'Available' :
                                    row.status === "False" ?
                                    <div>
                                        <ErrorOutlineIcon fontSize="small" color="secondary"/>
                                        Error(Pull docker image)
                                    </div>:
                                    'Deploying...'
                                }
                                </TableCell>
                                {/* <TableCell align="left"><CircularProgress /></TableCell> */}
                                <TableCell align="left">
                                    {row.status === "True" || row.status === "False" ?
                                        row.deployTime :
                                        <CircularProgress />
                                    }
                                </TableCell>
                                <TableCell align="left">
                                <Link to={{pathname:`/setting/${row.name}`, state:{row} }}>
                                        <IconButton
                                            aria-label="setting"
                                            style={iconStyle}
                                        >
                                        <SettingsIcon/>
                                        </IconButton>
                                        </Link>
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
