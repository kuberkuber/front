import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import YAML from 'yamljs';
import MyDropzone from 'components/MyDropZone';

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
    const kuberData = useSelector(state => state.kuberData);
    const data = kuberData.repos;
    let swaggerInfo = null;

    const dispatch = useDispatch();

    const isLowerAlpha = (c) => {
        if (c >= 'a' && c <= 'z')
            return true;
        return false;
    }

    const isError = (pname,pport) => {
        const repoError = "repository name must consist of lower case alphanumeric characters or '-', and must start and end with an alphanumeric character";
        const uniqueError = "repository name should be unique"
        const portError = "port number should be number"
        //repo name 체크
        const len = pname.length;
        if ( len === 0 ||
            (isNaN(pname[0]) && !isLowerAlpha(pname[0])) ||
            (isNaN(pname[len - 1]) && !isLowerAlpha(pname[len - 1])))
            return repoError;
        else {
            for(const c of pname){
                if(!isLowerAlpha(c) && isNaN(c) && c !== '-' )
                    return repoError;
            }
        }
        //중복체크
        for(const e in data){
            if(e.name === pname)
                return uniqueError;
        }
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

//    const refreshPage
    const goMainPage = (formData) => {
        dispatch({
            type: 'INSERTDATA',
            data: { name: formData.repo_name, deploy_time: new Date().toString(),status: "Deploying..." }
        });
        props.history.push({
            pathname: '/',
        });
    }
    const request = async (formData) => {
        try {
            //const response = await axios.post("http://127.0.0.1:5000/deploy",formData);
            const response = await axios.post("http://0d2ab618eb53.ngrok.io/deploy",formData);
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
        const msg = isError(repoName,port)
        if( msg !== false){
            alert(msg);
            return ;
        }
        const formData = {
            namespace : "test",
            repo_name : repoName,
            image_name: dockerImage,
            port_num : port,
            api_doc : swaggerInfo === null ? null : swaggerInfo.paths
        };
        console.log(swaggerInfo);
        request(formData);
        goMainPage(formData);
    };
    const swaggerRead = (e) => {

        let file = e.target.files[0];
        let fileReader = new FileReader();
        console.log(file);
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
                        placeholder="my-first-repo"
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
                <div style={content}>
                    <Typography variant="h6" style={{ "textAlign": "left" }} gutterBottom>
                        API document
				</Typography>

                    <MyDropzone swaggerRead={swaggerRead} />
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
