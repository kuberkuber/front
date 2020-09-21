import React from 'react';
import Github from '../modules/github'
export class BranchSearch extends React.Component {
    constructor(props) {
        super();
        this.state = {
            branches: []
        };
        this.search = this.search.bind(this);
        this.search(props.owner, props.reponame);
    }
    async search(owner, reponame) {
        const branchesDatas = await Github.getBranches(owner, reponame);
        if(!branchesDatas) {
            return;
        }
        this.setState((state, props) => {
            state.branches = [];
            for(const data of branchesDatas.data) {
                state.branches.push({
                    name: data.name
                });
            }
            return state;
        })
    }
    render() {
        return (
            <div onClick = {() => {this.props.onSelect(this.state.name);}}>
                    {
                        this.state.branches.map((branch, index) => {
                            return <p key = {index}> branchname: {branch.name}</p>
                        })
                    }
            </div>
        );
    }
}