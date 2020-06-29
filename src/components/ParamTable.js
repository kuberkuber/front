import React, { useRef } from 'react';
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
import axios from 'axios';

const inputStyle = {
    width: "100%"
}

const gridStyle = {
    "marginBottom": "30px",
};

const buttonStyle = {
    width: "100%",
    float: "center",
    color: "white",
    "backgroundColor": "darkgreen",
}

const ParamTable = ({ method, endpoint, parameters, getResponse }) => {
    const rows = parameters;
    let uri = endpoint;
    let refs = useRef([React.createRef(), React.createRef()]);

    const passResponse = (response) => {
        getResponse(response);
    }

    const request = async (params) => {
        try {
            const response = await axios.get(uri+params);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        let params = "?";
        rows.map((e, i) => {
            params += parameters[i].name +"="+refs.current[i].current.value+"&";
        });
        try {
            const response = await request(params.slice(0, -1));
            passResponse(response)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={onSubmitForm}>
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
                                    {rows.map((row, i) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                <Typography>
                                                    {row.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.required ?
                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Required"
                                                        placeholder={row.type}
                                                        variant="outlined"
                                                        color="secondary"
                                                        style={inputStyle}
                                                        inputRef={refs.current[i]}
                                                    />
                                                    :
                                                    <TextField
                                                        id="outlined-required"
                                                        label="Option"
                                                        placeholder={row.type}
                                                        variant="outlined"
                                                        style={inputStyle}
                                                        inputRef={refs.current[i]}
                                                    />
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={4} style={{ "margin": "auto" }}>
                        <Button variant="contained" color="primary" style={buttonStyle} type="submit">
                            request
						</Button>
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}

export default ParamTable;
