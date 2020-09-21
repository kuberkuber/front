import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const response = "http://59b0f175ead6.ngrok.io/login";

//const client_id = "a1867741904e42ccabee";
//const clientSecret = process.env.clientSecret;

const Login = ()=> (
  console.log("hi"),
//  get https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={http://...}
   axios.get(response)
   .then(res => {
     window.location.href= res.data;
   }) 
   .catch(err => {
     console.log(err)
   })
  //, { headers:  { "Access-Control-Allow-Origin" : "*"}}s
//async (props)
  );


export default Login;

