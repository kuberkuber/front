import { render } from '@testing-library/react';
import React from 'react';
import { BranchSearch } from './BranchSearch';
import { RepoSearch } from './RepoSearch';

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
                <button onClick = {() => {
                    this.setState((state)=> {
                        state.stage = Math.max(0,state.stage - 1);
                        return state;
                        });
                }}> 뒤로가기 </button>
                {stage == 0 && 
                    <div>
                        <input type = "text" id = "searchString"/>
                        <button onClick = {(stage) => {
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
                {stage == 1 && 
                    <RepoSearch searchString = {this.state.searchString} onSelect = {(owner, reponame) => {
                        this.setState((state) => {
                            state.owner = owner;
                            state.reponame = reponame;
                            state.stage++;
                            return state;
                        });
                    }}/>
                }
                {stage == 2 && 
                    <BranchSearch owner = {this.state.owner} reponame = {this.state.reponame} onSelect = {
                        (branchname) => {
                            this.setState((state) => {
                                state.branchname = branchname;
                                state.stage++;
                                return state;
                            })
                        }
                    }/>
                }
                {stage == 3 && <p> 선택 되었습니다. </p>}
            </div>
        );
    }
}