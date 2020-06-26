import React from 'react';
import API from 'components/API';

const Endpoint = ({endpoint, api_doc}) => {
	let apis = api_doc.replace(/'/g,'"');
    apis = apis.replace(/True/g,'"True"');
    apis = apis.replace(/False/g,'"False"');
	apis = JSON.parse(apis)

	return (
		<div>
			{Object.keys(apis).map((api) => (
				Object.keys(apis[api]).map((method) => (
					<API key={method}
						method={method.toUpperCase()}
						title={api}
						info={apis[api][method]}
						endpoint={endpoint+api}
					/>
				))
			))}
		</div>
	);
};

export default Endpoint;
