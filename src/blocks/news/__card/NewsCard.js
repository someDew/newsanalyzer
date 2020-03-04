// STYLES
import './news__card.css';

// RESORSES
import defaultNewsImage from './news-card-defaultpic.jpg';
import cardTemplate from './news-card-temp.js';

export default class NewsCard {
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
        cardBlock.querySelector('.news__card-pic').addEventListener('error', (event) => {
            event.target.src = this._image;
        });
                
        cardBlock.querySelector('.news__card').href = data.url;
        cardBlock.querySelector('.news__card-pic').src = data.urlToImage;
        cardBlock.querySelector('.news__card-date').dateTime = data.publishedAt;
        cardBlock.querySelector('.news__card-date').innerText = dateObj.formatDate + ' ' + dateObj.formatMonthWord.genitive + ' ' + dateObj.formatYear;
        cardBlock.querySelector('.news__card-title').innerText = data.title;
        cardBlock.querySelector('.news__card-text').innerText = data.description;
        cardBlock.querySelector('.news__card-link').innerText = data.source.name;

        return cardBlock;
    }
}