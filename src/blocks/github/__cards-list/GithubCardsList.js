//PARENT
import GithubCard from '../__card/GithubCard.js';

export default class GithubCardsList extends GithubCard {
    constructor(dateFormater, gitApi, domElem, commitsToShow) {
        super(dateFormater);
        this._api = gitApi;
        this._commitsBlock = domElem;
        this._commitsToShow = commitsToShow;
    }

    renderCommits() {
        this._api.getCommits()
            .then(response => response.ok ? response.json() : Promise.reject(response))
            .then(response => response.length !== 0 ? response : Promise.reject(response))
            .then(response => {
                for (let i = 0; i < this._commitsToShow; i++) {
                    const cardElem = this.buildCard(response[i]);
                    this._commitsBlock.querySelector('.github__cards-list').appendChild(cardElem);
                }

            })

            // next in progress...
            .catch(error => {
                console.log(error);
                /* this._notFound.show(error.status); */
            })
            .finally(() => {
                /* this._storageHandler.calculateHistogram();
                this._unblockForm();
                this._preloader.hide(); */
            });
    }
}