import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import jsonp from 'jsonp';

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

const ParamTable = ({ method, endpoint, parameters }) => {
    const rows = parameters;
    // console.log("parameters",parameters);
    // console.log("method",method);
    // console.log("endpoint",endpoint);
    const dispatch = useDispatch();
    let uri = endpoint;
    let refs = useRef([React.createRef(), React.createRef()]);

    const asyncFunc = (formData, res) => {
        console.log('서버응답후', res);
        dispatch({
            type: 'ACTIVEDATA',
            name: formData.repo_name
        });
    }

    const goMainPage = (formData) => {
        dispatch({
            type: 'INSERTDATA',
            data: { name: formData.repo_name, create_time: new Date().toString(), status: "False" }
        });
    }
    const request = async (params) => {
        try {
            // console.log("uri",uri);
            jsonp("http://kuberkuber-cluster-bace65abd86cb82e.elb.ap-northeast-2.amazonaws.com/test/trry/?namespace=test&name=a&age=13", null, (err, data) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(data);
                }
            });
			// const response = await axios.get('http://kuberkuber-cluster-bace65abd86cb82e.elb.ap-northeast-2.amazonaws.com/test/trry/?namespace=test&name=a&age=13', {
			// 	params
			// });
			// console.log(response.data);
            // await asyncFunc(formData,response);
            // return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        const params = {
            namespace: "test"
        };
        rows.map((e, i) => {
            params[parameters[i].name] = refs.current[i].current.value;
        });
        request(params);
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
