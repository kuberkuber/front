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
    
    
    console.log(row);
    const [repoName, setRepoName] = useState('');
    const [dockerImage, setDockerImage] = useState('');
    const [reDeploytime, setreDeploytime ] = useState('');
    const [port, setPort] = useState('');
    const kuberData = useSelector(state => state.kuberData);
    const data = kuberData.repos;
    console.log(data);
    
//    let swaggerInfo = null;
    
    const dispatch = useDispatch();

    const isError = (pport) => {
        const portError = "port number should be number"
        //port
        if(isNaN(pport))
            return portError;
        return false;
    }
    const asyncportFunc = (formData,res) => { //action type : UPDATEDATA 일 경우,
        console.log('서버응답후',res);
        console.log(formData);
        dispatch({
            type: 'CHANGEPORT',
            name: formData.repo_name,
            data : res.data
        });
    }
    const asyncFunc = (formData,res) => { //action type : UPDATEDATA 일 경우,
        console.log('서버응답후',res);
        
        dispatch({
            type: 'CHANGEDATA',
            name: formData.repo_name,
            data : res.data
        });
    }
    const asyncdelFunc =(formData, res) => { //action type : DELETEDATA 일 경우
        console.log('[delete버튼] 서버 응답 후 ', res);
        dispatch({
            type: 'DELETEDATA',
            name: formData.repo_name
        })
    }

    const goMainPage = (formData) => {
        dispatch({
            type: 'GETDATA',
            
        });
        props.history.push({
            pathname: '/',
        });
    }
    const request = async (formData) => { // reDeploy 
        try {
//            const response = await axios.post("http://127.0.0.1:5000/deploy",formData);
            const response = await axios.post("http://0d2ab618eb53.ngrok.io/test/repo/"+row.name+"/redeploy",formData);
//            row.deploy_time = response.data;
            await asyncFunc(formData,response);
//            console.log(row.image)
//            swaggerInfo = null;

        }
        catch (error) {
            console.log(error);
        }
    }
    const update = async (formData) => { // port Update 
       
        try {
//            const response = await axios.post("http://127.0.0.1:5000/deploy",formData);
            const response = await axios.patch("http://0d2ab618eb53.ngrok.io/test/repo/"+row.name,formData);
            await asyncportFunc(formData,response);
//            swaggerInfo = null;
        }
        catch (error) {
            console.log(error);
        }
    }
    const deleteProject = async (formData) => { // delete 버튼
        
        try {

            const response = await axios.delete("http://0d2ab618eb53.ngrok.io/test/repo/"+row.name,formData);
            await asyncdelFunc(formData,response);
            await goMainPage(formData);
            // swaggerInfo = null;
            // const response = await axios.post("",formData);
            // return response;
        }
        catch (error) {
            console.log(error);
        }
//        goMainPage(formData);
    }
    const updatePort = (e) => { // update 버튼

        e.preventDefault();
        const msg = isError(port);

        console.log(port);
        if(msg !== false) {
            alert(msg);
        }
        const formData = {
            repo_name: row.name,
            port_num : port
        };
        console.log(formData);
        update(formData);
    }
    const reDeploy = (e) => { // re-deploy 버튼
        e.preventDefault();
        const formData = {
            repo_name: row.name,
        
            
//             namespace : "test",
//             repo_name : repoName,
//             image_name: dockerImage,
//             port_num : port,
//             api_doc : swaggerInfo === null ? null : swaggerInfo.paths
        };
        console.log(formData);
        request(formData);
//        refreshPage(formData);
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
                    <form onSubmit={reDeploy}>
                        <Button 
                        variant="outlined" 
                        color="primary" 
                        type="submit" 
                        >
                            Re-deploy
                        </Button>
                        <span style={{padding:"20px"}}> 
                        {row.deploy_time}
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
                    <form onSubmit={updatePort}>
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
                <form onSubmit={deleteProject}>
                <Button variant="outlined" color="secondary" type="submit" onClick={deleteProject}>
                        Delete
					</Button>
                    </form>
			    </div>

                 <br/>
            </div>
    );
}
export default withRouter(Setpage);