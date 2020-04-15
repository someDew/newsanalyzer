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
        /**NewsApi have a bug with news from Yandex.News
         * Api return broken links like yandex.ru/story...
         * insted yandex.ru/news/story...
         * 
         * Next code check this and fix
        */

        // regexp looks like a broken link
        const brokenLinkRegexp = new RegExp('https://yandex.ru/story');

        //test every link with match with broken
        if (brokenLinkRegexp.test(data.url)) {
            let fixedUrl = data.url.slice(18,);
            fixedUrl = 'https://yandex.ru/news/' + fixedUrl;
            data.url = fixedUrl;
        }

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