export default class GitApi {
    constructor(gitCommitsUrl) {
        this._url = gitCommitsUrl;
    }

    getCommits() {
        return fetch(this._url)
            .then(response => response.ok ? response.json() : Promise.reject(response));
    }
}