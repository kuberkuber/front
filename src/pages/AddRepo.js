import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Typography, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import YAML from 'yamljs';
import MyDropzone from 'components/MyDropZone';
import ImageFinder from 'components/ImageFinder';
import Github from "../modules/github";

const title = {
    "marginTop": "60px",
    "marginBottom": "50px"
};

const content = {
    "marginBottom": "50px"
};

const AddRepo = (props) => {
    const [repoName, setRepoName] = useState('');
    const [license, setLicense] = useState('');
    const [gitUrl, setGitUrl] = useState('');
    const [dockerImage, setDockerImage] = useState('');
    const [port, setPort] = useState('');
    const data = useSelector(state => state.kuberData.respos);
    // const namespace = useSelector(state => state.kuberData.user.namespace);
    const dispatch = useDispatch();

    let swaggerInfo = null;
    let readmeInfo = null;

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
        dispatch({
            type: 'ACTIVEREPO',
            name: formData.repoName,
            deployTime: res.data.deployTime,
            endpoint: res.data.endpoint,
            apiDoc: formData.apiDoc,
            readmeDoc: formData.readmeDoc,
            license: formData.license
        });
    }

    const goMainPage = (formData) => {
        dispatch({
            type: 'INSERTREPO',
            data: { name: formData.repoName, deployTime: "",status: "Deploying..." }
        });
        props.history.push({
            pathname: '/',
        });
    }

    const request = async (formData) => {
        try {
             const response = await axios.post("http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com:5000/deploy",
            //  const response = await axios.post("http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com:5000/deploy",
             formData,
             {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
            }});
            await asyncFunc(formData,response);
            console.log(response);
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
            namespace : localStorage.getItem('namespace'),
            repoName : repoName,
            license : license,
            imageName: dockerImage,
            portNum : port,
            apiDoc : swaggerInfo === null ? null : swaggerInfo.paths,
            readmeDoc : readmeInfo === null ? null : readmeInfo
        };
        request(formData);
        goMainPage(formData);
    };

    const searchLicense = async (e) => {
        var tokens = gitUrl.split('/').reverse();
        var reponame = tokens[0];
        var owner = tokens[1];
        var res = await (await Github.getRepository(owner, reponame)).data.license;
        if (res !== null) {
            res = res.name;
        }
        setLicense(res);
        console.log(res);

    }

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

    const readmeRead = (e) => {
        let file = e.target.files[0];
        let fileReader = new FileReader();
        if (file !== undefined) {
            fileReader.onload = () => {
                readmeInfo = fileReader.result;
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
                        Search Github Repository for License
                    </Typography>
                    {/* <ImageFinder/> */}
                    <TextField
                        id="standard-full-width"
                        // helperText="KuberKuber only support public image's lates tag"
                        // placeholder="DockerHub image to deploy (e.g. demo/image)"
                        value={gitUrl}
                        onChange={(e) => {
                            setGitUrl(e.target.value)
                            }
                        }
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="outlined" color="primary" onClick={searchLicense}>
                        찾기
                    </Button>
                    <span style={{padding:"20px"}}>
                        {license}
                        </span>

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
                <div style={content}>
                    <Typography variant="h6" style={{ "textAlign": "left" }} gutterBottom>
                        README document
                    </Typography>
                    <MyDropzone swaggerRead={readmeRead} />
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
