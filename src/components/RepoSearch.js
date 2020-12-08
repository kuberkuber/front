import Github from "../modules/github";
import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
export class RepoSearch extends React.Component {
    constructor(props) {
        super();
        this.state = {
            searchItems: []
        };
        this.search = this.search.bind(this);
        this.search(props.searchString);
    }
    async search(searchString) {
        const searchDatas = await Github.searchRepository(searchString);
        if(!searchDatas) {
            return;
        }
        const searchItems = [];
        for(const item of searchDatas.data.items) {
            let miniItem = {
                id: item.id,
                reponame: item.name,
                owner: item.owner.login,
                license: item.license
            }
            searchItems.push(miniItem);
        }
        this.setState((state) => {
            state.searchItems = searchItems;
            return state;
        });
    }
    render() {
        return (
            <div>
                {
                    this.state.searchItems.map((item, index) => {
                        return (
                            <ExpansionPanel key = {index} onClick = {() => {this.props.onSelect(item.owner, item.reponame, item.license);}}>
                                <ExpansionPanelSummary
                                expandIcon={<CheckOutlinedIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                    <Typography variant="h6">
                                        {item.reponame}/{item.owner}
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