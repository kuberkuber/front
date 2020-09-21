import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Typography,
    Chip,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import Endpoint from 'components/DetailRepo/Endpoint';

const title = {
    "marginTop": "60px",
    "marginBottom": "50px"
};

const titleStyle = {
    "marginRight": "10px"
}

const content = {
    "marginBottom": "50px"
};

const availableStyle = {
    color: "white",
    "backgroundColor": "darkgreen",
}

const unavailableStyle = {
    color: "white",
    "backgroundColor": "red",
}

const DetailRepo = () => {
    const location = useLocation();
    const row = location.state.row;

    return (
        <div>
            <div style={title}>
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
            <div style={content}>
                <Typography variant="h6" gutterBottom>
                    API endpoints
				</Typography>
                {!row.apiDoc ?
                    <div></div>
                    :
                    <Endpoint endpoint={row.endpoint} apiDoc={row.apiDoc} />
                }
            </div>
        </div>
    );
}


export default DetailRepo;
