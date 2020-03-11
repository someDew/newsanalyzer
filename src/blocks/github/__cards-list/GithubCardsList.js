//PARENT
import GithubCard from '../__card/GithubCard.js';

export default class GithubCardsList extends GithubCard {
    constructor(dateFormater, gitApi, domElem, commitsToShow, slider) {
        super(dateFormater);
        this._api = gitApi;
        this._commitsBlock = domElem;
        this._commitsToShow = commitsToShow;
        this._slider = slider;
    }

    renderCommits() {
        this._api.getCommits()
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(response => response.length !== 0 ? response : Promise.reject(response))
            .then(response => {                
                for (let i = 0; i < this._commitsToShow; i++) {
                    const cardElem = this.buildCard(response[i]);
                    this._slider.appendSlide(cardElem);
                }

            })
            .catch(error => {
                console.log(error);
            })            
    }
}