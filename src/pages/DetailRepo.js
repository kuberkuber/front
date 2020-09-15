import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import MyDropzone from '../components/MyDropZone';
import { useLocation } from 'react-router-dom';
import { Typography, Chip } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import Endpoint from 'components/DetailRepo/Endpoint';
import YAML from 'yamljs';

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

const swaggerRead = (e) => {
	let swaggerInfo = null;
	let file = e.target.files[0];
	let fileReader = new FileReader();
	if (file !== undefined) {
		fileReader.onload = () => {
			swaggerInfo = YAML.parse(fileReader.result);
		};
		fileReader.readAsText(file);
	}
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

// const useStyles = makeStyles((theme) => ({
// root: {
// 	flexGrow: 1,
// 	backgroundColor: theme.palette.background.paper,
// },
// }));

const New = () => {
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const location = useLocation();
	const row = location.state.row;
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
			</div>
			<div style={title}>
				<AppBar position="static">
					<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
						<Tab label="Intro" {...a11yProps(0)} />
						<Tab label="Demo Page" {...a11yProps(1)} />
						<Tab label="Test" {...a11yProps(2)} />
						<Tab label="Log" {...a11yProps(3)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<MyDropzone swaggerRead={swaggerRead} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					Demo Page
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Typography style={typoStyle}align="center" variant="h6" gutterBottom>
						API endpoints
					</Typography>
					<div style={content}>
						{!row.apiDoc ?
							<div></div>
							: <Endpoint endpoint={row.endpoint} apiDoc={row.apiDoc} />
						}
					</div>
				</TabPanel>
				<TabPanel value={value} index={3}>
					Log Page
				</TabPanel>
			</div>
		</div>
	);
}

export default New;


// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import Endpoint from 'components/DetailRepo/Endpoint';

// const content = {
//     "marginBottom": "50px"
// };

// const DetailRepo = () => {
//     const location = useLocation();
//     const row = location.state.row;

//     return (
//         <div style={content}>
//             {!row.apiDoc ?
//                 <div></div>
//                 : <Endpoint endpoint={row.endpoint} apiDoc={row.apiDoc} />
//             }
//         </div>
//     );
// }


// export default DetailRepo;
