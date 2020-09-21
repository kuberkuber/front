import Github from "../modules/github";
import React from 'react';
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
        const searchDatas = await Github.search(searchString);
        const searchItems = [];
        for(const item of searchDatas.data.items) {
            let miniItem = {
                id: item.id,
                reponame: item.name,
                owner: item.owner.login
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
                            <div key = {index} onClick = {() =>{ 
                                this.props.onSelect(item.owner, item.reponame);
                            }}>
                                <p> id: {item.id} ,RepositoryName: {item.reponame}, owner: {item.owner} </p>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}