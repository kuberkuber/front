import { render } from '@testing-library/react';
import React from 'react';
import { BranchSearch } from './BranchSearch';
import { RepoSearch } from './RepoSearch';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
export class ImageFinder extends React.Component {
    constructor() {
        super();
        this.state = {
            serachString: null,
            owner: null,
            reponame: null,
            branchname: null,
            stage: 0,
        }
    }
    render() {
        const stage = this.state.stage;
        return (
            <div>
                <button
                    style = {{
                        "background": "#BBFFBB",
                        "borderRadius": "3px",
                        "borderWidth": "0px",
                        "display": "inlineBlock"
                    }}
                >
                <ArrowBackOutlinedIcon
                    onClick = {() => {
                    this.setState((state)=> {
                            state.stage = Math.max(0,state.stage - 1);
                            return state;
                            });
                    }}
                    > 뒤로가기
                </ArrowBackOutlinedIcon>
                </button>
                {stage === 0 &&
                    <div>
                        <input type = "text" id = "searchString" style = {{
                            width: "500px",
                            height: "40px",
                            "lineHeight": "40px",
                            "fontSize": "37px",
                            "borderRadius": "12px",
                            "display": "inlineBlock"
                        }}/>
                        <button
                            style = {{
                                width: "60px",
                                height: "40px",
                                "display": "inlineBlock"
                            }}
                            onClick = {(stage) => {
                            this.setState((state) => {
                                state.searchString = document.getElementById('searchString').value;
                                state.stage++;
                                return state;
                            })
                        }}>
                            검색
                        </button>
                    </div>
                }
                {stage === 1 &&
                    <RepoSearch searchString = {this.state.searchString} onSelect = {(owner, reponame) => {
                        this.setState((state) => {
                            state.owner = owner;
                            state.reponame = reponame;
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
                {stage === 3 && <p> 선택 되었습니다. owner:{this.state.owner} reponame:{this.state.reponame} branch: {this.state.branchname}</p>}
            </div>
        );
    }
}
