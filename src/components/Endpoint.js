import React from 'react';
import API from 'components/API';

const content = {
	"marginBottom": "30px"
};

const pathStyle = {
	"marginRight": "10px"
}

const gridStyle = {
	"marginBottom": "30px",
};

const Endpoint = ({api_doc}) => {
	let api = api_doc.replace(/'/g,'"');
    api = api.replace(/True/g,'"True"');
    api = api.replace(/False/g,'"False"');
	api = JSON.parse(api)
	console.log(api)
	return (
		<div style={content}>
			<API method={"GET"} title={"/"} />
			<API method={"GET"} title={"/foo"} />
			<API method={"GET"} title={"/foo/bar"} />
		</div>
	);
};

export default Endpoint;
