export default class NewsCardsList {
    constructor(showNewsOnceTime, domElem, storageHandler, newsCard) {        
        this._showNewsOnceTime = showNewsOnceTime;
        this._newsBlock = domElem;
        this._storageHandler = storageHandler;
        this._newsCard = newsCard;
        this._moreButton = domElem.querySelector('.news__button');

        this._cardsList = this._newsBlock.querySelector('.news__cards-list');
        this._moreButton.addEventListener('click', this.showCardsGroup.bind(this));
    }

    _renderCard() {
        let showed = this._storageHandler.readShowedNews();
        const cardData = this._storageHandler.getNewsData(showed);
        const cardElem = this._newsCard.buildCard(cardData);
        this._cardsList.appendChild(cardElem);

        // increase count of showed news        
        this._storageHandler.writeShowedNews(++showed);
    }

    showCardsGroup() {
        // 'remainNews' is diference between showed on main page news cards and all news in server response
        const remainNews = this._storageHandler.getTotalNews() - this._storageHandler.readShowedNews();
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
        while (this._cardsList.firstChild) 
            this._cardsList.removeChild(this._cardsList.firstChild);
    }

    showCardsList() {
        this._newsBlock.classList.remove('news_disable');
    }

    hideCardsList() {
        this._newsBlock.classList.add('news_disable');
    }
}