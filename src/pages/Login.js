// import React from 'react';
import axios from 'axios';

const Login = async() => {
	try {
		const response = await axios.get("http://a94597cb3692.ngrok.io/login");
		window.location.href = response.data;
	} catch (err){
		console.log(err)
	}
};

export default Login;
