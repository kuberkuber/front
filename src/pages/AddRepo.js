import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
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
    const data = useSelector(state => state.kuberData.respos);
    // const namespace = useSelector(state => state.kuberData.user.namespace);
    const dispatch = useDispatch();

    let swaggerInfo = null;

    const isRepoNameError = () => {
        const repoError = "repository name must consist of lower case alphanumeric characters or '-', and must start and end with an alphanumeric character";
        const uniqueError = "repository name should be unique"
        const re = new RegExp('^[a-z]([-a-z0-9]*[a-z0-9])?$');
        if (repoName.length > 0 && !repoName.match(re))
            return repoError;
        for(const idx in data){
            if(data[idx].name === repoName)
            return uniqueError;
        }
        return '';
    }

    const isPortError = () => {
        const portError = "port number should be number"
        if (isNaN(port))
            return portError;
        return '';
    }

    const isError = (repoName, port) => {
        let errMsg = isRepoNameError(repoName);
        if (errMsg !== '')
            return errMsg;
        errMsg = isPortError(port);
        if (errMsg !== '')
            return errMsg;
        return ''
    }

    const asyncFunc = (formData,res) => {
        console.log(formData, res);
        dispatch({
            type: 'ACTIVEDATA',
            name: formData.repoName,
            deployTime: res.data.deployTime,
            endpoint: res.data.endpoint,
            apiDoc: formData.apiDoc
        });
    }

    const goMainPage = (formData) => {
        dispatch({
            type: 'INSERTDATA',
            data: { name: formData.repoName, deployTime: "",status: "Deploying..." }
        });
        props.history.push({
            pathname: '/',
        });
    }

    const request = async (formData) => {
        try {
            console.log(formData.apiDoc);
             const response = await axios.post("http://9c8f7dfa708c.ngrok.io/deploy",
             formData,
             {
                headers: {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('jwt')
            }});
            await asyncFunc(formData,response);
            swaggerInfo = null;
            return response.response;
        }
        catch (error) {
            console.log(error.response);
            return error.response;
        }
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        const msg = isError(repoName,port)
        if( msg !== ''){
            alert(msg);
            return ;
        }
        const formData = {
            namespace : sessionStorage.getItem('namespace'),
            repoName : repoName,
            imageName: dockerImage,
            portNum : port,
            apiDoc : swaggerInfo === null ? null : swaggerInfo.paths
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
            };
            fileReader.readAsText(file);
        }
    }
    console.log(sessionStorage.getItem('jwt'))
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
                        placeholder="my-first-repo"
                        value={repoName}
                        onChange={(e) => {
                            setRepoName(e.target.value)
                            }
                        }
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error = {isRepoNameError() !== '' ? true : false}
                        helperText= {isRepoNameError()}
                    />
                </div>
                <div style={content}>
                    <Typography variant="h6" gutterBottom>
                        Docker Image
                    </Typography>
                    <TextField
                        id="standard-full-width"
                        helperText="KuberKuber only support public image's lates tag"
                        placeholder="DockerHub image to deploy (e.g. demo/image)"
                        value={dockerImage}
                        onChange={(e) => {
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
                        onChange={(e) => {
                            setPort(e.target.value)
                            }
                        }
                        error = {isPortError() !== '' ? true : false}
                        helperText={isPortError()}
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
                    <Button variant="outlined" color="primary" type="submit">
                        Register and Deploy
					</Button>
                </div>
            </div>
        </form>
    );
}

export default withRouter(AddRepo);
