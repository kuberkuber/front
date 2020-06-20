import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Typography,
    Chip,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import API from 'components/API';

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

const chipStyle = {
    color: "white",
    "background-color": "darkgreen",
}

const DetailRepo = () => {
    const location = useLocation();
    console.log(location.state); // "bar"

    return (
        <div>
            <div style={title}>
                <Typography variant="h3" gutterBottom>
                    <span style={titleStyle}>
                        echo-server
					</span>
                    <Chip
                        size="small"
                        label="Available"
                        clickable
                        style={chipStyle}
                    />
                </Typography>
                <Link style={{ textDecoration: 'none' }}>
                    <Typography variant="h6" gutterBottom>
                        Access to endpoint of deployment
						<LinkIcon />
                    </Typography>
                </Link>
            </div>
            <div style={content}>
                <Typography variant="h6" gutterBottom>
                    API endpoints
				</Typography>
                <API method={"GET"} title={"/"} />
                <API method={"GET"} title={"/foo"} />
                <API method={"GET"} title={"/foo/bar"} />
            </div>
        </div>
    );
}


export default DetailRepo;
