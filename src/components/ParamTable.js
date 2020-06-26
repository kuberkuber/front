import React from 'react';
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

const ParamTable = ({endpoint, parameters}) => {
	const rows = parameters;
	const dispatch = useDispatch();
	let uri = endpoint;

    const asyncFunc = (formData,res) => {
        console.log('서버응답후',res);
        dispatch({
            type: 'ACTIVEDATA',
            name: formData.repo_name
        });
    }

    const goMainPage = (formData) => {
        dispatch({
            type: 'INSERTDATA',
            data: { name: formData.repo_name, create_time: new Date().toString(),status: "False" }
        });
    }
    const request = async (formData) => {
        try {
			const response = await axios.get(uri, {
				params: {
				  namespace: "test"
				}
			});
			console.log(response.data);
            await asyncFunc(formData,response);
            // const response = await axios.post("",formData);
            // return response;
        }
        catch (error) {
            console.log(error);
        }
	}

	// const onSubmitForm = (e) => {
    //     e.preventDefault();
    //     if( msg !== false){
    //         alert(msg);
    //         return ;
    //     }
    //     const formData = {
    //         namespace : "test",
    //         repo_name : repoName,
    //         image_name: dockerImage,
    //         port_num : port,
    //         api_doc : swaggerInfo === null ? null : swaggerInfo.paths
    //     };
    //     console.log(swaggerInfo);
    //     request(formData);
    //     goMainPage(formData);
    // };

	return (
		<form>
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
									/>
									:
									<TextField
										id="outlined-required"
										label="Option"
										placeholder={row.type}
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
