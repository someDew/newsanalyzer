export default class CardsList {
    constructor(card, cardsQuantity, domElem, storageHandler) {
        this._card = card;
        this._cardsQuantity = cardsQuantity;
        this._cardsBlock = domElem;
        this._storageHandler = storageHandler;
        this._moreButton = domElem.querySelector('.results__button');
        
        this._moreButton.addEventListener('click', this.showCardsGroup.bind(this));
    }

    _renderCard() {
        const cardData = this._storageHandler.getNewsData(sessionStorage.getItem('showedNews'));
        const cardElem = this._card.buildCard(cardData);
        this._cardsBlock.querySelector('.cards-list').appendChild(cardElem);
        
        // increase count of showed news
        sessionStorage.setItem('showedNews', (+sessionStorage.getItem('showedNews') + 1));
    }

    showCardsGroup() {
        let remainNews = sessionStorage.totalNews - sessionStorage.showedNews;
        if (remainNews >= this._cardsQuantity) {
            for ( let i = 0; i < this._cardsQuantity; i++) {
                this._renderCard()
            }
        } else if (remainNews < this._cardsQuantity) {
            for ( let i = 0; i < remainNews; i++) {
                this._renderCard()
            }
        }

        if (sessionStorage.totalNews === sessionStorage.showedNews) {
            this._moreButton.classList.add('results__button_disabled');
        }
    }

    deleteCards() {
        this._cardsBlock.querySelector('.cards-list').innerHTML = '';
    }

    showCardsList() {
        this._cardsBlock.classList.remove('results_disable');
    }

    hideCardsList() {
        this._cardsBlock.classList.add('results_disable');
    }
}