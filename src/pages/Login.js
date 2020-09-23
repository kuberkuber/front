import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
	const login = async() => {
		try {
			const response = await axios.get("http://df6c49165a65.ngrok.io/user" + window.location.search)
			sessionStorage.setItem('namespace', response.data.name);
			sessionStorage.setItem('jwt', response.data.jwt);
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
