import { render } from '@testing-library/react';
import React from 'react';
import { BranchSearch } from './BranchSearch';
import { RepoSearch } from './RepoSearch';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, IconButton } from "@material-ui/core"

const searchContainer = {
    "marginTop":"25px",
}
export class ImageFinder extends React.Component {
    constructor() {
        super();
        this.state = {
            serachString: null,
            owner: null,
            reponame: null,
            branchname: null,
            license: {
                name: null
            },
            stage: 0,
        }
    }
    render() {
        const stage = this.state.stage;
        return (
            <div>
                {stage === 0 &&
                    <div style={searchContainer}>
                        {/* <div style={searchBar}> */}

                        <TextField
                            style={{
                                "width":"500px"
                            }}
                            placeholder="Search..."
                            id="searchString"
                            inputProps={{style: {fontSize: 16}}}
                            InputLabelProps={{style: {fontSize: 16}}} // font size of input label

                        />

                        <IconButton variant="outlined" color="primary"
                            onClick = {(stage) => {
                            this.setState((state) => {

                                state.searchString = document.getElementById('searchString').value;
                                state.stage++;
                                return state;
                            })
                        }}>
                        <SearchIcon color="primary" fontSize="medium"/>
                        </IconButton>

                    </div>
                }
                {stage === 1 &&
                    <RepoSearch searchString = {this.state.searchString} onSelect = {
                        (owner, reponame, license) => {
                        this.setState((state) => {
                            state.owner = owner;
                            state.reponame = reponame;
                            state.license = license;
                            state.stage++;
                            return state;
                        });
                    }}/>
                }
                {stage === 2 &&
                    <BranchSearch owner = {this.state.owner} reponame = {this.state.reponame} onSelect = {
                        (branchname) => {
                            this.setState((state) => {
                                state.branchname = branchname;
                                state.stage++;
                                if(this.props.onSelect) {
                                    this.props.onSelect(this.state.owner, this.state.reponame, this.state.branchname);
                                }
                                return state;
                            })
                        }
                    }/>
                }
                {stage === 3 && <p> 선택 되었습니다. owner:{this.state.owner} reponame:{this.state.reponame} branch: {this.state.branchname} license: {this.state.license.name}</p>}
            </div>
        );
    }
}

export default ImageFinder;
