export default class Card {
    constructor() {
        this._cardBlock = document.createElement('a');
        this._cardTemplate = `
        <img class="card__pic" src="" alt="news illustration">
            <time datetime="" class="card__date"></time>
            <h4 class="card__title"></h4>
            <p class="card__text"></p>
            <span class="card__link"></span>
        `;
    }

    buildCard(data) {
        this._cardBlock.classList.add('card');
        this._cardBlock.setAttribute('href', data.url);
        this._cardBlock.innerHTML = this._cardTemplate;
        this._cardBlock.querySelector('.card__pic').setAttribute('src', data.urlToImage);
        this._cardBlock.querySelector('.card__date').setAttribute('datetime', data.publishedAt)
        this._cardBlock.querySelector('.card__date').innerText = this._formatDate(data.publishedAt);
        

        

        return this._cardBlock;
    }

    _formatDate(date) {
        const newsDate = new Date(date);
        let date = newsDate.getDate();
        let month = newsDate.getMonth() + 1;
        let year = date.getFullYear();

        // форматировать
    }
}