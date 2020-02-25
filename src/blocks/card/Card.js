// STYLES
import './card.css';

// RESORSES
import defaultNewsImage from './card-defaultpic.jpg';
import cardTemplate from './card-temp.js';

export default class Card {
    constructor(dateFormater) {
        this._dateFormater = dateFormater;
        this._image = defaultNewsImage;
        this._template = cardTemplate;
    }
    
    buildCard(data) {        
        const dateObj = this._dateFormater.getFormatedDateObject(data.publishedAt);
        const cardBlock = document.createElement('li');
        cardBlock.insertAdjacentHTML('afterbegin', this._template);
        
        // change pic if it error on load
        cardBlock.querySelector('.card__pic').addEventListener('error', (event) => {
            event.target.src = this._image;
        });
                
        cardBlock.querySelector('.card').href = data.url;
        cardBlock.querySelector('.card__pic').src = data.urlToImage;
        cardBlock.querySelector('.card__date').dateTime = data.publishedAt;
        cardBlock.querySelector('.card__date').innerText = dateObj.formatDate + ' ' + dateObj.formatMonthWord.genitive + ' ' + dateObj.formatYear;
        cardBlock.querySelector('.card__title').innerText = data.title;
        cardBlock.querySelector('.card__text').innerText = data.description;
        cardBlock.querySelector('.card__link').innerText = data.source.name;

        return cardBlock;
    }
}