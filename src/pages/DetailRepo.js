import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import MyDropzone from '../components/MyDropZone';
import { useLocation } from 'react-router-dom';
import { Typography, Chip, Button } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import Endpoint from 'components/Endpoint';
import ReactMarkdown from "react-markdown";
import axios from 'axios';

const content = {
    "marginBottom": "50px"
};

const title = {
	"marginTop": "60px",
	"marginBottom": "50px",
};

const repoNameStyle = {
	"marginTop": "60px",
	"marginBottom": "50px",
};

const titleStyle = {
	"marginRight": "10px"
};

const availableStyle = {
	color: "white",
	"backgroundColor": "darkgreen",
};

const unavailableStyle = {
	color: "white",
	"backgroundColor": "red",
};

const typoStyle = {
	"marginTop" : "20px",
	"marginBottom" : "20px"
};

const readmeStyle = {
	"marginTop" : "20px",
	"marginLeft" : "0",
	"marginRight" : "0",
	"padding" : "32px",
	"border" : "1px solid rgb(64,83,175)",
	"borderRadius" : "6px",
};

const logStyle = {
	"marginTop" : "20px",
	"marginLeft" : "0",
	"marginRight" : "0",
	"padding" : "32px",
	"border" : "1px solid rgb(0,0,0)",
	"borderRadius" : "6px",
	"color" : "white",
	"backgroundColor": "black",
};

const panelStyle = {
	width: "90%",
	margin: "0 auto"
}

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
			>
			{value === index && (
				/* <Box component="span" p/> = {3}> */
				<Box component="span">
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}


const DetailRepo = () => {
	const [value, setValue] = React.useState(0);
	const [podLog, setPodLog] = useState([]);
	const location = useLocation();
	const row = location.state.row;
	const license = row.license;
	// const data = useSelector(state => state.kuberData.repos[row]);
	let readmeInfo = null;
	// let log_arr = [];

	const dispatch = useDispatch();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

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

	const requestReadme = async (formData) => {
		try {
			const requestUrl = "http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com:5000/" + localStorage.getItem('namespace') + "/repo/" + row.name;
			const response = await axios.patch(requestUrl + "/readmedoc", formData,
			{
				headers: {
					'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
			}});
			await dispatch({
				type: 'UPDATEREADME',
				name: response.data.name,
				readmeDoc: response.data.readmeDoc,
			});
			return response.response;
		}
		catch (error) {
			console.error(error)
			alert("Error! README update");
			return error.response;
		}
	};

	const updateReadme = (e) => {
		e.preventDefault();
		const formData = {
			repoName: row.name,
			readmeDoc: readmeInfo
		};
		requestReadme(formData);
	};


	const getLog = async (e) => {
		const requestUrl = "http://ec2-15-165-100-105.ap-northeast-2.compute.amazonaws.com:5000/" + localStorage.getItem('namespace') + "/repo/" + row.name;
		const response = await axios.get(requestUrl + "/log",
		{
			headers: {
				'Authorization' : 'Bearer ' + localStorage.getItem('jwt')
		}});
		setPodLog(response.data.split('\n'))
	}

	return (
		<div>
			<div style={repoNameStyle}>
				<Typography variant="h3" gutterBottom>
					<span style={titleStyle}>
						{row.name}
					</span>
					{row.status === "True" ?
						<Chip
							size="small"
							label="Available"
							clickable
							style={availableStyle}
						/>
						:
						<Chip
							size="small"
							label="Unavailable"
							clickable
							style={unavailableStyle}
						/>
					}
				</Typography>
				<a target='_blank' rel="noopener noreferrer" href={row.endpoint} style={{ textDecoration: 'none' }}>
					<Typography variant="h6" gutterBottom>
						Access to endpoint of deployment
						<LinkIcon />
					</Typography>
				</a>
				<Button variant="outlined" color="primary">
					{license}
				</Button>

			</div>
			<div style={title}>
				<AppBar position="static">
					<Tabs value={value} onChange={handleChange} aria-label="simple tabs example"
					variant="fullWidth">
						<Tab label="Intro" {...a11yProps(0)} />
						<Tab label="Test" {...a11yProps(1)} />
						<Tab label="Log" {...a11yProps(2)} />
						<Tab label="Demo Page" {...a11yProps(3)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<div style={panelStyle}>
						<div style={{display:"flex", marginTop: "20px"}}>
							<h3 style={{margin: "auto auto auto 0"}}>README.md</h3>
							<form onSubmit={updateReadme} >
								<Button variant="outlined" color="primary" type="submit">
									{row.readmeDoc === null ? "Update" : "Delete"}
								</Button>
							</form>
						</div>
						{row.readmeDoc === null ?
							<div style={{marginTop: "20px"}}>
								<MyDropzone swaggerRead={readmeRead}/>
							</div>
						:
							<div style={readmeStyle}>
								<ReactMarkdown source={row.readmeDoc} />
							</div>
						}
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<div style={panelStyle}>
						<Typography style={typoStyle}align="center" variant="h6" gutterBottom>
							API endpoints
						</Typography>
						<div style={content}>
							{!row.apiDoc ?
								<div></div>
								: <Endpoint endpoint={row.endpoint} apiDoc={row.apiDoc} />
							}
						</div>
					</div>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<div style={{display:"flex", marginTop: "20px"}}>
						<h3 style={{margin: "auto auto auto 0"}}>Log Page</h3>
						<Button variant="contained" color="primary" onClick={getLog}>
							refresh
						</Button>
					</div>
					<div style={logStyle}>
						{podLog.map((logLine) => (
							<div key={logLine}>{logLine}</div>
						))}
					</div>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<div style={panelStyle}>
						Demo Page
					</div>
				</TabPanel>
			</div>
		</div>
	);
}

export default DetailRepo;
