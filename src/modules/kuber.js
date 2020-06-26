//action

const GETDATA = 'GETDATA';
const INSERTDATA = 'INSERTDATA';
const ACTIVEDATA = 'ACTIVEDATA';
const UPDATEDATA = 'UPDATEDATA';

const initialState = {
    // { name: 'echo-server', create_time: 'Jun. 09 2020, 16:14:34 +09:00',status: "True"}
    repos: []
};

function kuberData(state = initialState, action) {
    switch (action.type) {
        case GETDATA:
            return {
                ...state
            };
        case INSERTDATA:
            return {
                ...state,
                repos: [...state.repos, action.data]
            };
        case ACTIVEDATA:
            let idx = -1;
            idx = (state.repos).findIndex(repo=>(repo.name===action.name && repo.status==="False"));
            if(idx!=-1)
                state.repos[idx].status = "True";
            return {
                ...state,
                repos: [...state.repos]
            };
        case UPDATEDATA:
            let ndata = [];
            ndata = ndata.concat(action.data);
            return {
                ...state,
                repos: ndata
            };
        default:
            return state;
    }
}

export default kuberData;