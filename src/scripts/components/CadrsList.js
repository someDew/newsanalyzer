export default class CardsList {
    constructor(func, constant) {
        this.cardsBlock = document.querySelector('.results');
        this._cardInstanceCreator = func;
        this._group = constant;
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
        if (sessionStorage.showedNews < sessionStorage.totalNews) {
            for ( let i = 0; i < this._group; i++) {
                this._renderCard()
            }
        }
    }

}