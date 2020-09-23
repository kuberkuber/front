import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
	const login = async() => {
		try {
			const response = await axios.get("http://9c8f7dfa708c.ngrok.io/user" + window.location.search)
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
