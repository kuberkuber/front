// // import React from 'react';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';
// import React, { useEffect } from 'react';
// import { Link, Switch, Route } from 'react-router-dom';
// import {
//     Button
// } from '@material-ui/core';
// // import { AddRepo, DetailRepo, Setpage, Login } from '.';
// import RepoTable from 'components/RepoTable';
// import { useSelector, useDispatch } from 'react-redux';
// // import axios from 'axios';

// const response = "http://8bb8d2572824.ngrok.io/login";

// //const client_id = "a1867741904e42ccabee";
// //const clientSecret = process.env.clientSecret;

// const button = {
//   textDecoration: 'none',
//   float: 'right',
// };


// const Login = (props) => {
//   console.log("props",props);
//   // const dispatch = useDispatch();

//   // const mylogin = () => {
//   //   dispatch({
//   //     type:'LOGIN',
//   //     namespace: window.location.href.split("?")
//   //   });
//   // }
//   const mylogin2 = async () => {
//     try {
//       const response = await axios.get("http://8bb8d2572824.ngrok.io/login");
//       window.location.href = response.data;
//       // return window.location.href.split("?");
//       // mylogin(window.location.href.split("?"));
//     }
//     catch (err){
//       console.log(err)
//     }
//   }
//   mylogin2();
//   // const a = mylogin2();
//   // console.log(a);
//   // return mylogin2();

//   // return (
//   //   <div>{mylogin2} </div>
//   // )
//   // const kuberData = useSelector(state => state.kuberData);
//   // const data = kuberData.repos;
// //  get https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={http://...}
//   //   axios.get(response)
//   //  .then(res => {
//   //    window.location.href = res.data;
//   //  })
//   //  .catch(err => {
//   //    console.log(err)
//   //  })

//   //, { headers:  { "Access-Control-Allow-Origin" : "*"}}s
// //async (props)
// };


// export default Login;

