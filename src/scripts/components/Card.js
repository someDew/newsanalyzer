export default class Card {
    constructor(dateFormater, defImg) {
        this._dateFormater = dateFormater;
        this._defImg = defImg;
        
        this._cardTemplate = `
        <a class="card" target="_blank">
        <img class="card__pic" alt="news illustration"></img>
        <time class="card__date"></time>
        <h4 class="card__title"></h4>
        <p class="card__text"></p>
        <span class="card__link"></span>
        </a>`;
    }
    
    buildCard(data) {
        
        const dateObj = this._dateFormater.getFormatedDateObject(data.publishedAt);
        const cardBlock = document.createElement('li');
        cardBlock.insertAdjacentHTML('afterbegin', this._cardTemplate);
        
        // change pic if it error on load
        cardBlock.querySelector('.card__pic').addEventListener('error', (event) => {
            event.target.setAttribute('src', this._defImg);
        });
                
        cardBlock.querySelector('.card').setAttribute('href', data.url);
        cardBlock.querySelector('.card__pic').setAttribute('src', data.urlToImage);
        cardBlock.querySelector('.card__date').setAttribute('datetime', data.publishedAt);
        cardBlock.querySelector('.card__date').innerText = dateObj.formatDate + ' ' + dateObj.formatMonthWord.genitive + ' ' + dateObj.formatYear;
        cardBlock.querySelector('.card__title').innerText = data.title;
        cardBlock.querySelector('.card__text').innerText = data.description;
        cardBlock.querySelector('.card__link').innerText = data.source.name;

        return cardBlock;
    }
}