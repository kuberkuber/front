//action

const GETDATA = 'GETDATA';
const LOGIN = 'LOGIN';
const INSERTDATA = 'INSERTDATA';
const ACTIVEDATA = 'ACTIVEDATA';
const UPDATEDATA = 'UPDATEDATA';
const DELETEDATA = 'DELETEDATA';
const CHANGEDATA = 'CHANGEDATA';
const CHANGEPORT = 'CHANGEPORT';

const initialState = {
    // { name: 'echo-server', create_time: 'Jun. 09 2020, 16:14:34 +09:00',status: "True"}
    user: {
        namespace: '',
        userToken: ''
    },
    repos: []
};

function kuberData(state = initialState, action) {
    switch (action.type) {
        /* Add Login action */
        case LOGIN:
            return {
                ...state,
                user: {
                    namespace: action.namespace,
                    userToken: action.userToken
                }
            }
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
                state.repos[idx].deployTime = action.deployTime;
                state.repos[idx].endpoint = action.endpoint;
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

            state.repos[idx].deployTime = action.data;
            return {
                ...state,
                repos: [...state.repos]
            };
        }
        case CHANGEPORT:{
            let idx = (state.repos).findIndex(repo=>(repo.name===action.name));
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
