export default class Card {
    constructor(func) {
        this._dateFormater = func;
        this._cardBlock = document.createElement('li');
        this._cardTemplate = `
        <a class="card" target="_blank">
            <img class="card__pic" alt="news illustration">
            <time class="card__date"></time>
            <h4 class="card__title"></h4>
            <p class="card__text"></p>
            <span class="card__link"></span>
        </a>
        `;
    }

    buildCard(data) {

        const dateFormater = this._dateFormater();
        const dateObj = dateFormater.getFormatedDateObject(data.publishedAt);

        this._cardBlock.innerHTML = this._cardTemplate;
        this._cardBlock.querySelector('.card').setAttribute('href', data.url);
        this._cardBlock.querySelector('.card__pic').setAttribute('src', data.urlToImage);
        this._cardBlock.querySelector('.card__date').setAttribute('datetime', data.publishedAt)
        this._cardBlock.querySelector('.card__date').innerText = dateObj.formatDate + ' ' + dateObj.formatMonthWord + ' ' + dateObj.formatYear;
        this._cardBlock.querySelector('.card__title').innerText = data.title;
        this._cardBlock.querySelector('.card__text').innerText = data.description;
        this._cardBlock.querySelector('.card__link').innerText = data.source.name;        

        return this._cardBlock;
    }
}