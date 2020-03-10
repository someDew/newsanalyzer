// STYLES
import './github__card.css';

// RESORSES
import githubCardTemplate from './github-card-temp.js';
import defaultUserImage from './github-card-default-userpic.png';

export default class GithubCard {
    constructor(dateFormater) {
        this._dateFormater = dateFormater;
        this._template = githubCardTemplate;
        this._image = defaultUserImage;
    }

    buildCard(data) {
        const dateObj = this._dateFormater.getFormatedDateObject(data.commit.committer.date);
        const cardBlock = document.createElement('li');
        cardBlock.classList.add('swiper-slide');
        cardBlock.insertAdjacentHTML('afterbegin', this._template);

        // if you make commit from local with git bash, github dont return 'author.avatar_url' and script crush
        if (data.author !== null) {
            cardBlock.querySelector('.github__card-pic').src = data.author.avatar_url;
            // change pic if it error on load
            cardBlock.querySelector('.github__card-pic').addEventListener('error', (event) => {
                event.target.src = this._image;
            });
        } else {
            cardBlock.querySelector('.github__card-pic').src = this._image;
        }

        cardBlock.querySelector('.github__card').href = data.html_url;
        cardBlock.querySelector('.github__card-date').dateTime = data.commit.committer.date;
        cardBlock.querySelector('.github__card-date').textContent = dateObj.formatDate + ' ' + dateObj.formatMonthWord.genitive + ', ' + dateObj.formatYear;
        cardBlock.querySelector('.github__card-title').textContent = data.commit.committer.name;
        cardBlock.querySelector('.github__card-text').textContent = data.commit.message;
        cardBlock.querySelector('.github__card-link').textContent = data.commit.committer.email;
        

        return cardBlock;
    }
}