//action
// DATA => REPO로 바꿈.

const GETREPO = 'GETREPO';
const INSERTREPO = 'INSERTREPO';
const ACTIVEREPO = 'ACTIVEREPO';
const UPDATEALLREPO = 'UPDATEALLREPO';
const DELETEREPO = 'DELETEREPO';
const REDEPLOYREPO = 'REDEPLOYREPO';
const UPDATEREPO = 'UPDATEREPO';
const UPDATEPORT = 'UPDATEPORT';
const UPDATEREADME = 'UPDATEREADME';

const initialState = {
    // { name: 'echo-server', create_time: 'Jun. 09 2020, 16:14:34 +09:00',status: "True"}
    repos: []
};

function kuberData(state = initialState, action) {
    switch (action.type) {
        case GETREPO:
            return {
                state
            };
        case INSERTREPO:
            return {
                ...state,
                repos: [...state.repos, action.data]
            };
        case ACTIVEREPO: {
            let idx = -1;
            idx = (state.repos).findIndex(repo=>(repo.name===action.name && repo.status==="Deploying..."));
            if(idx!==-1) {
                state.repos[idx].status = "True";
                state.repos[idx].deployTime = action.deployTime;
                state.repos[idx].endpoint = action.endpoint;
                state.repos[idx].apiDoc = action.apiDoc;
                state.repos[idx].readmeDoc = action.readmeDoc;
            }
            return {
                ...state,
                repos: [...state.repos]
            };
        }
        case UPDATEALLREPO: {
            let ndata = [];
            ndata = ndata.concat(action.data);
            return {
                ...state,
                repos: ndata
            };
        }
        case REDEPLOYREPO:{
            let idx = (state.repos).findIndex(repo=>(repo.name===action.name));
            state.repos[idx].deployTime = action.data;
            return {
                ...state,
                repos: [...state.repos]
            };
        }
        case UPDATEPORT:{
            let idx = (state.repos).findIndex(repo=>(repo.name===action.name));
            state.repos[idx].port = action.data;
            return {
                ...state,
                repos: [...state.repos]
            };
        }
        // case DELETEDATA:{
        case DELETEREPO: {
            return {
                ...state,
                repos : state.repos.filter(repo => repo.name !== action.name)
            };
        }
        case UPDATEREADME: {
            let idx = (state.repos).findIndex(repo=>(repo.name===action.name));
            state.repos[idx].readmeDoc = action.readmeDoc;
            return {
                ...state,
                repos: [...state.repos]
            };
        }
        // case UPDATEREPO: {
        //     let idx = -1;
        //     idx = (state.repos).findIndex(repo=>(repo.name===action.name));
        //     if(idx!==-1) {
        //         state.repos[idx].status = action.status;
        //         state.repos[idx].deployTime = action.deployTime;
        //         state.repos[idx].endpoint = action.endpoint;
        //         state.repos[idx].port = action.port;
        //         state.repos[idx].apiDoc = action.apiDoc;
        //         state.repos[idx].readmeDoc = action.readmeDoc;
        //     }
        //     console.log(state.repos)
        //     return {
        //         ...state,
        //         repos: [...state.repos]
        //     };
        // }
        default:
            return state;
    }
}

export default kuberData;
