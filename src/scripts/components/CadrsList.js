export default class CardsList {
    constructor(elem, func) {
        this.cardsBlock = elem;
        this._cardInstanceCreator = func;
    }

    _createNewsCard() {
        this._takeCardData(); // take data of next news card
        const newCard = this._cardInstanceCreator(); // created new class Card instance
        return newCard.buildCard(data);        
    }

    _takeCardData() {
        sessionStorage.setItem('showedNews', (+sessionStorage.getItem('showedNews') + 1));
        const cardData = sessionStorage.getItem(`news${sessionStorage.getItem('showedNews')}`);
        return JSON.parse(cardData);
    }

    renderCards() {

    }

}