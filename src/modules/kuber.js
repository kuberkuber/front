//action

const GETDATA = 'GETDATA';
const INSERTDATA = 'INSERTDATA';
const ACTIVEDATA = 'ACTIVEDATA';
const UPDATEDATA = 'UPDATEDATA';
const DELETEDATA = 'DELETEDATA';
const CHANGEDATA = 'CHANGEDATA';
const CHANGEPORT = 'CHANGEPORT';

const initialState = {
    // { name: 'echo-server', create_time: 'Jun. 09 2020, 16:14:34 +09:00',status: "True"}
    repos: []
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
        case ACTIVEDATA: {
            let idx = -1;
            idx = (state.repos).findIndex(repo=>(repo.name===action.name && repo.status==="Deploying..."));
            if(idx!==-1) {
                state.repos[idx].status = "True";
                state.repos[idx].deploy_time = action.deploy_time;
                state.repos[idx].apiDoc = action.apiDoc;
            }
            return {
                ...state,
                repos: [...state.repos]
            };
        }
        case UPDATEDATA: {
            let ndata = [];
            ndata = ndata.concat(action.data);
            return {
                ...state,
                repos: ndata
            };
        }
        case CHANGEDATA:{
            let idx = (state.repos).findIndex(repo=>(repo.name===action.name));

            state.repos[idx].deploy_time = action.data;
            return {
                ...state,
                repos: [...state.repos]
            };
        }
        case CHANGEPORT:{
            let idx = (state.repos).findIndex(repo=>(repo.name===action.name));
            console.log(action.data);
            state.repos[idx].port = action.data;
            return {
                ...state,
                repos: [...state.repos]
            };
        }
        case DELETEDATA:{
            return {
                ...state,
                repos : state.repos.filter(repo => repo.name !== action.name)

            };
        }
        default:
            return state;
    }
}

export default kuberData;
