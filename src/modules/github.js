const { default: Axios } = require("axios");

async function search(searchString) {
    if(typeof searchString !== 'string') {
        return null;
    }
    return await Axios.get(`https://api.github.com/search/repositories?q=${searchString}&sort=stars&order=desc`);
};
async function getRepository(owner, reponame) {
    if(!(typeof owner === 'string' && typeof reponame === 'string')) {
        return null;
    }
    return await Axios.get(`https://api.github.com/repos/${owner}/${reponame}`);
};
async function getBranches(owner, reponame) {
    if(!(typeof owner === 'string' && typeof reponame === 'string')) {
        return null;
    }
    return await Axios.get(`https://api.github.com/repos/${owner}/${reponame}/branches`);
}
module.exports = {
    search: search,
    getRepository: getRepository,
    getBranches: getBranches
}