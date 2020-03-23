export default class GithubCardsList{
    constructor(properties) {        
        this._api = properties.gitApi;
        this._commitsToShow = properties.commitsToShow;
        this._slider = properties.slider;
        this._githubCard = properties.githubCard;
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