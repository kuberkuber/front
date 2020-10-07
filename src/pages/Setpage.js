import React, { useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const title = {
    "marginTop": "60px",
    "marginBottom": "50px",
};

const content = {
    "marginBottom": "50px"
};

const labelStyle = {
    "fontWeight": "500",
    "paddingRight" : "50px"
};

const Setpage = (props) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.kuberData.repos);
    const location = useLocation();
    const row = location.state.row;

    const d = data.filter(repo=>repo.name===row.name);
//    console.log(d[0]);
    let placeport = "";

    for (const key in d[0]) {
        if( key === "port" && d[0].hasOwnProperty(key))
            row.port = d[0].port;
            placeport = d[0].port;
    }
//    console.log(row);
    const [port, setPort] = useState('');

    const isError = (pport) => {
        const portError = "port number should be number"
        if(isNaN(pport))
            return portError;
        return false;
    }
    const asyncPortFunc = (formData) => { //action type : UPDATEDATA 일 경우,
        dispatch({
            type: 'CHANGEPORT',
            name: formData.repoName,
            data : formData.portNum
        });
//        row.port = formData.portNum;
    }
    const asyncFunc = (formData,res) => { //action type : UPDATEDATA 일 경우,
        dispatch({
            type: 'CHANGEDATA',
            name: formData.repoName,
            data : res.data
        });
    }
    const asyncDelFunc =(formData) => { //action type : DELETEDATA 일 경우,
        dispatch({
            type: 'DELETEDATA',
            name: formData.repoName
        })
    }
    const goMainPage = () => {
        props.history.push({
            pathname: '/',
        });
    }
    const request = async (formData) => { // reDeploy
        try {
<<<<<<< HEAD
            const requestUrl = "http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com/" + localStorage.getItem('namespace') + "/repo/" + row.name;
=======
            const requestUrl = "http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com:5000/" + localStorage.getItem('namespace') + "/repo/" + row.name;
            // const requestUrl = "http://localhost:5000/" + localStorage.getItem('namespace') + "/repo/" + row.name;
>>>>>>> upstream/master
            const response = await axios.post(requestUrl + "/redeploy",
            formData,
            {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }});
            await asyncFunc(formData,response);
        }
        catch (error) {
            console.log(error);
        }
    }

    const update = async (formData) => { // port Update
        try {
<<<<<<< HEAD
            const requestUrl = "http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com/" + localStorage.getItem('namespace') + "/repo/" + row.name;
=======
            const requestUrl = "http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com:5000/" + localStorage.getItem('namespace') + "/repo/" + row.name;
            // const requestUrl = "http://localhost:5000/" + localStorage.getItem('namespace') + "/repo/" + row.name;
>>>>>>> upstream/master
            const response = await axios.patch(requestUrl, formData,
            {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }});
            await asyncPortFunc(formData,response);
            alert("port 변경!");
        }
        catch (error) {
            console.log(error);
        }
    }
    const remove = async (formData) => { // Delete repository
        try {
<<<<<<< HEAD
            const requestUrl = "http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com/" + localStorage.getItem('namespace') + "/repo/" + row.name;
=======
            const requestUrl = "http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com:5000/" + localStorage.getItem('namespace') + "/repo/" + row.name;
            // const requestUrl = "http://localhost:5000/" + localStorage.getItem('namespace') + "/repo/" + row.name;
>>>>>>> upstream/master
            const response = await axios.delete(requestUrl,
            {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
                },
                data: {
                    formData: formData
                }
            });
            await asyncDelFunc(formData);
            await goMainPage();
        }
        catch (error) {
            console.log(error);
        }
    }
    const updatePort = (e) => { // port Update 버튼
        e.preventDefault();
        const msg = isError(port);
        if(msg !== false) {
            alert(msg);
        }
        const formData = {
            repoName: row.name,
            portNum : port
        };
        row.port = formData.portNum;
        update(formData);
    }
    const reDeploy = (e) => { // re-deploy 버튼
        e.preventDefault();
        const formData = {
            repoName: row.name,
        };
        request(formData);
    }
    const deleteRepo = (e) => { // delete 버튼
        e.preventDefault();
        const formData = {
            repoName: row.name,
        }
        remove(formData);
    }
    return (
            <div>
                <div style={title}>
                <Typography variant="h4" gutterBottom >
                    {row.image }
				</Typography>
                </div>

                <div style={content}>
                    <Typography variant="h6" gutterBottom style={{marginBottom:"20px"}}>
                        Connected container
				    </Typography>
                    <label style={labelStyle}>Container </label>
                    <a target='_blank' rel="noopener noreferrer" href={"https://hub.docker.com/r/"+row.image}>https://hub.docker.com/r/{row.image}</a>
                    <div style={{marginTop:"20px"}}>
                    <form onSubmit={reDeploy}>
                        <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        >
                            Re-deploy
                        </Button>
                        <span style={{padding:"20px"}}>
                        {row.deployTime}
                        </span>
                        </form>
                     </div>
                </div>
                <div style={content}>
                    <Typography variant="h6" style={{ "textAlign": "left" }} >
                        Port
				    </Typography>
                    <TextField
                        id="standard-full-width"
                        placeholder={placeport}
                        value={port}
                        onChange={
                            (e) => {
                                setPort(e.target.value)
                            }
                        }
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <div style={content}>
                    <form onSubmit={updatePort} >
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            style={{ marginTop: "10px" }}
                        >
                            Update
					</Button>
                    </form>
                    </div>
                </div>
                <div style={content}>
				<Typography variant="h6" style={{"textAlign":"left"}} gutterBottom>
					Delete Project
				</Typography>
                <p>Deleting a project will make your deployment unavailable,
                    but your image will remain at the original repository.</p>
                <form onSubmit={deleteRepo}>
                <Button variant="outlined" color="secondary" type="submit">
                        Delete
					</Button>
                    </form>
			    </div>
                 <br/>
            </div>
    );
}
export default withRouter(Setpage);
