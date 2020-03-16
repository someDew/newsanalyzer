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

        const cardPic = cardBlock.querySelector('.news__card-pic');
        const cardDate = cardBlock.querySelector('.news__card-date');

        
        // change pic if it error on load
        cardPic.addEventListener('error', (event) => {
            event.target.src = this._image;
        });
        
        cardPic.src = data.urlToImage;
        cardDate.dateTime = data.publishedAt;
        cardDate.textContent = dateObj.formatDate + ' ' + dateObj.formatMonthWord.genitive + ' ' + dateObj.formatYear;
        
        cardBlock.querySelector('.news__card').href = data.url;
        cardBlock.querySelector('.news__card-title').textContent = data.title;
        cardBlock.querySelector('.news__card-text').textContent = data.description;
        cardBlock.querySelector('.news__card-link').textContent = data.source.name;

        return cardBlock;
    }
}