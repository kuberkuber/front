import React, { useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
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
    const location = useLocation();
    const row = location.state.row;
//    const [repoName, setRepoName] = useState('');
//    const [dockerImage, setDockerImage] = useState('');
    const [port, setPort] = useState('');
    const kuberData = useSelector(state => state.kuberData);
    const data = kuberData.repos;
    let swaggerInfo = null;
    
    const dispatch = useDispatch();

    const isError = (pport) => {
        const portError = "port number should be number"
        //port
        if(isNaN(pport))
            return portError;
        return false;
    }
    const asyncFunc = (formData,res) => {
        console.log('서버응답후',res);
        dispatch({
            type: 'ACTIVEDATA',
            name: formData.repo_name
        });
    }

    const goMainPage = (formData) => {
        dispatch({
            type: 'GETDATA',
            
        });
        props.history.push({
            pathname: '/',
        });
    }
    const update = async (formData) => {
        try {
            
            const response = await axios.patch("http://d9450dd1cd53.ngrok.io/test/repo/"+row.name,formData);
            await asyncFunc(formData,response);
            swaggerInfo = null;
            console.log(row.image);
        }
        catch (error) {
            console.log(error);
        }
    }
    const deleteProject = async (formData) => {
        
        try {
        const response = await axios.delete("http://d9450dd1cd53.ngrok.io/test/repo/"+row.name,formData);
            await asyncFunc(formData,response);
            swaggerInfo = null;
            // const response = await axios.post("",formData);
            // return response;
        }
        catch (error) {
            console.log(error);
        }
        goMainPage(formData);
    }
//     const onSubmitForm = (e) => {
//         e.preventDefault();
//         const msg = isError(repoName,port)
//         if( msg !== false){
//             alert(msg);
//             return ;
//         }
//         const formData = {
//             namespace : "test",
//             repo_name : repoName,
//             image_name: dockerImage,
//             port_num : port,
//             api_doc : swaggerInfo === null ? null : swaggerInfo.paths
//         };
//         console.log(formData);
//         console.log(swaggerInfo);
// //        request(formData);
//         goMainPage(formData);
//     };
    const updatePort = (e) => {

        e.preventDefault();
        const msg = isError(port);

        console.log(port);
        if(msg !== false) {
            alert(msg);
        }
        const formData = {
            port_num : port
        };
        console.log(formData);
        update(formData);

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
                    <a target='_blank'  href={"https://hub.docker.com/r/"+row.image}>https://hub.docker.com/r/{row.image}</a>
                    <div style={{marginTop:"20px"}}>
                        <Button variant="outlined" color="primary" type="submit" >
                            Re-deploy
                        </Button>
                        <span style={{padding:"20px"}}> 
                        {row.create_time}
                        </span>
                     </div>
                </div>
            
                <div style={content}>
                    <Typography variant="h6" style={{ "textAlign": "left" }} >
                        Port
				    </Typography>
                    <TextField
                        id="standard-full-width"
                        placeholder={row.port}
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
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            style={{ marginTop: "10px" }}
                            onClick={updatePort}                         
                        >
                            Update
					</Button>
                    </div>
                </div>

                <div style={content}>
				<Typography variant="h6" style={{"textAlign":"left"}} gutterBottom>
					API document
				</Typography>             
			    </div>
                <div style={content}>
				<Typography variant="h6" style={{"textAlign":"left"}} gutterBottom>
					Delete Project
				</Typography>
                <p>Deleting a project will make your deployment unavailable, 
                    but your image will remain at the original repository.</p>
                <Button variant="outlined" color="secondary" type="submit" onClick={deleteProject}>
                        Delete
					</Button>
			    </div>

                 <br/>
            </div>
    );
}
export default withRouter(Setpage);