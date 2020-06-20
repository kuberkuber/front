import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import YAML from 'yamljs';
const title = {
    "marginTop": "60px",
    "marginBottom": "50px"
};

const content = {
    "marginBottom": "50px"
};

const AddRepo = (props) => {
    const [repoName, setRepoName] = useState('');
    const [dockerImage, setDockerImage] = useState('');
    const [port, setPort] = useState('');

    let swaggerInfo = null;

    const dispatch = useDispatch();

    const asyncFunc = (formData,res) => {
        console.log('서버응답후',res);
        dispatch({
            type: 'ACTIVEDATA',
            repoName: formData.repo_name
        });
    }

    const goMainPage = (formData) => {
        dispatch({
            type: 'INSERTDATA',
            data: { repoName: formData.repo_name, status: false, time: new Date().toString() }
        });
        props.history.push({
            pathname: '/',
        });
    }
    const request = async (formData) => {
        try {
            const response = await axios.post("http://ef1beadeda41.ngrok.io/deploy",formData);
            await asyncFunc(formData,response);
            swaggerInfo = null;
            // const response = await axios.post("",formData);
            // return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        const formData = {
            namespace : "test",
            repo_name : repoName,
            image_name: "vad1mo/hello-word-rest",
            port_num : Number(port),
            api_doc : swaggerInfo===null ? null : swaggerInfo.paths
        };
        request(formData);
        goMainPage(formData);
    };
    const swaggerRead = (e) => {
        let file = e.target.files[0];
        let fileReader = new FileReader();

        if (file !== undefined) {
            fileReader.onload = () => {
                swaggerInfo = YAML.parse(fileReader.result);
                console.log(swaggerInfo);
            };
            fileReader.readAsText(file);
        }
    }
    return (
        <form onSubmit={onSubmitForm}>

            <div>
                <div style={title}>
                    <Typography variant="h4" gutterBottom>
                        Register new repository
				</Typography>
                </div>
                <div style={content}>
                    <Typography variant="h6" gutterBottom>
                        Repository name
				</Typography>
                    <TextField
                        id="standard-full-width"
                        label="Repository name should be unique"
                        placeholder="MyfirstRepo"
                        value={repoName}
                        onChange={
                            (e) => {
                                setRepoName(e.target.value)
                            }
                        }
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={content}>
                    <Typography variant="h6" gutterBottom>
                        Docker Image
				</Typography>
                    <TextField
                        id="standard-full-width"
                        label="KuberKuber only support public image's lates tag"
                        placeholder="DockerHub image to deploy (e.g. demo/image)"
                        value={dockerImage}
                        onChange={
                            (e) => {
                                setDockerImage(e.target.value)
                            }
                        }
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div style={content}>
                    <Typography variant="h6" style={{ "textAlign": "left" }} gutterBottom>
                        Port
				</Typography>
                    <TextField
                        id="standard-full-width"
                        placeholder="80"
                        value={port}
                        onChange={
                            (e) => {
                                setPort(e.target.value)
                            }
                        }
                        helperText="Port number for access to container"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <input type="file" onChange={swaggerRead} />
                </div>
                <br/>
                <div style={content}>
                    {/* <Link to={`/`} style={{ textDecoration: 'none' }}> */}
                    <Button variant="outlined" color="primary" type="submit">
                        Register and Deploy
					</Button>
                    {/* </Link> */}
                </div>
            </div>
        </form>
    );
}


export default withRouter(AddRepo);
