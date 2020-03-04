// PARENT CLASS
import NewsCard from '../__card/NewsCard.js';

export default class NewsCardsList extends NewsCard {
    constructor(dateFormater, showNewsOnceTime, domElem, storageHandler) {        
        super(dateFormater);
        this._showNewsOnceTime = showNewsOnceTime;
        this._cardsBlock = domElem;
        this._storageHandler = storageHandler;
        this._moreButton = domElem.querySelector('.news__button');

        this._moreButton.addEventListener('click', this.showCardsGroup.bind(this));
    }

    _renderCard() {
        const cardData = this._storageHandler.getNewsData(sessionStorage.getItem('showedNews'));
        const cardElem = this.buildCard(cardData);
        this._cardsBlock.querySelector('.news__cards-list').appendChild(cardElem);

        // increase count of showed news
        sessionStorage.setItem('showedNews', (+sessionStorage.getItem('showedNews') + 1));
    }

    showCardsGroup() {
        let remainNews = sessionStorage.totalNews - sessionStorage.showedNews;
        if (remainNews > this._showNewsOnceTime) {
            for (let i = 0; i < this._showNewsOnceTime; i++) {
                this._renderCard()
            }
            this._moreButton.classList.remove('news__button_disabled');
        } else {
            for (let i = 0; i < remainNews; i++) {
                this._renderCard()
            }
            this._moreButton.classList.add('news__button_disabled');
        }
    }

    deleteCards() {
        this._cardsBlock.querySelector('.news__cards-list').innerHTML = '';
    }

    showCardsList() {
        this._cardsBlock.classList.remove('news_disable');
    }

    hideCardsList() {
        this._cardsBlock.classList.add('news_disable');
    }
}