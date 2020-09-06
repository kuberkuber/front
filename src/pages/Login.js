import React from 'react';
import { Typography, Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const btnStyle = {
  backgroundColor: "black",
  color: "white",
  paddingLeft:"20px",
  paddingRight:"20px",
}
const gitIcon = {
  color: "white",
  paddingRight: "30px"
}
const Login = () => {
  
  return (
    <div style={{"textAlign":"center"}}>
      <h1 style={{"marginBottom":"50px"}}>
        로그인
      </h1>
      <div>
        <Button variant="contained" style={btnStyle}>
          <GitHubIcon fontSize="medium" style={gitIcon} />
          Github로 계속하기
					</Button>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Login;
