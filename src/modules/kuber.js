//action

const GETDATA = 'GETDATA';
const INSERTDATA = 'INSERTDATA';
const ACTIVEDATA = 'ACTIVEDATA';

const initialState = {
    repos: [{ repoName: 'echo-server', status: true, time: 'Jun. 09 2020, 16:14:34 +09:00' }]
};

function kuberData(state = initialState, action) {
    switch (action.type) {
        case GETDATA:
            return {
                state
            };
        case INSERTDATA:
            return {
                ...state,
                repos: [...state.repos, action.data]
            };
        case ACTIVEDATA:
            let idx = (state.repos).findIndex(repo=>(repo.repoName===action.repoName && repo.status===false));
            state.repos[idx].status = true;
            return {
                ...state,
                repos: [...state.repos]
            };
        default:
            return state;
    }
}

export default kuberData;