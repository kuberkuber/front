import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
	const login = async() => {
		try {
			const response = await axios.get("http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com/user" + window.location.search)
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
