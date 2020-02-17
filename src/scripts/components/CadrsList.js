export default class CardsList {
    constructor(func, constant, domElem) {
        this.cardsBlock = domElem;
        this._showMoreButton = domElem.querySelector('.results__button');
        this._cardInstanceCreator = func;
        this._group = constant;
        
        this._showMoreButton.addEventListener('click', this.showCardsGroup.bind(this));
    }

    _takeCardData() {
        sessionStorage.setItem('showedNews', (+sessionStorage.getItem('showedNews') + 1));
        const cardData = sessionStorage.getItem(`news${sessionStorage.getItem('showedNews')}`);
        return JSON.parse(cardData);
    }

    _renderCard() {
        const cardData = this._takeCardData();
        const cardInstance = this._cardInstanceCreator();

        const cardElem = cardInstance.buildCard(cardData);
        this.cardsBlock.querySelector('.cards-list').appendChild(cardElem);
    }

    showCardsGroup() {
        let remainNews = sessionStorage.totalNews - sessionStorage.showedNews;
        if (remainNews >= this._group) {
            for ( let i = 0; i < this._group; i++) {
                this._renderCard()
            }
        } else if (remainNews < this._group) {
            for ( let i = 0; i < remainNews; i++) {
                this._renderCard()
            }
        }
        if (sessionStorage.totalNews === sessionStorage.showedNews) {
            this._showMoreButton.classList.add('results__button_disabled');
        }
    }
}