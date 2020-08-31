import React from 'react';
import API from 'components/API';

const Endpoint = ({endpoint, apiDoc}) => {
	return (
		<div>
			{Object.keys(apiDoc).map((api) => (
				Object.keys(apiDoc[api]).map((method) => (
					<API key={method}
						method={method.toUpperCase()}
						title={api}
						info={apiDoc[api][method]}
						endpoint={endpoint+api}
					/>
				))
			))}
		</div>
	);
};

export default Endpoint;
