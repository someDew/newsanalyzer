export default class GithubCardsList{
    constructor(gitApi, commitsToShow, slider, githubCard) {        
        this._api = gitApi;
        this._commitsToShow = commitsToShow;
        this._slider = slider;
        this._githubCard = githubCard;
    }

    renderCommits() {
        this._api.getCommits()
            .then(response => response.length !== 0 ? response : Promise.reject(response))
            .then(response => {                
                for (let i = 0; i < this._commitsToShow; i++) {
                    const cardElem = this._githubCard.buildCard(response[i]);
                    this._slider.appendSlide(cardElem);
                }

            })
            .catch(error => {
                console.log(error);
            })            
    }
}