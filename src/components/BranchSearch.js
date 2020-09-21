import React from 'react';
import Github from '../modules/github'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
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
            <div>
            {
                this.state.branches.map((branch, index) => {
                    return (
                        <ExpansionPanel key = {index} onClick = {() => {this.props.onSelect(branch.name);}}>
                            <ExpansionPanelSummary
                            expandIcon={<CheckOutlinedIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                                <Typography variant="h6">
                                    {branch.name}
                                </Typography>
                            </ExpansionPanelSummary>
                        </ExpansionPanel>
                    );
                })
            }
            </div>
        );
    }
}