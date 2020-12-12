import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
	const login = async() => {
		try {
			const response = await axios.get("http://cfb8989e96aa.ngrok.io/user" + window.location.search)
			// const response = await axios.get("http://localhost:5000/user" + window.location.search)
			localStorage.setItem('namespace', response.data.name);
			localStorage.setItem('jwt', response.data.jwt);
		} catch (error) {
			console.log(error);
		} finally {
			props.history.push({
				pathname: '/',
			});
		}
	}
	login();
	return (
		<div></div>
	);
};

export default withRouter(Login);
