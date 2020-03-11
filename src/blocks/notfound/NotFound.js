// STYLES
import './notfound.css'

// RESORSES
import image from './notfound.svg';
import template from './notfound-temp.js';
import { NEWS_API_ERRORS as errors } from '../../scripts/constants/constants.js';

export default class NotFound {
    constructor(domElem) {
        this._notFoundContainer = domElem;
        this._notFoundImage = image;
        this._notFoundTemplate = template;
    }

    show(string) {
        this._notFoundContainer.insertAdjacentHTML('afterbegin', this._notFoundTemplate);
        this._notFoundContainer.querySelector('.notfound__img').src = this._notFoundImage;

        const message = this._notFoundContainer.querySelector('.notfound__text');
        switch (string) {
            case 'ok': message.textContent = errors.ok;
                break;
            case 400: message.textContent = errors[400];
                break;
            case 401: message.textContent = errors[401];
                break;
            case 404: message.textContent = errors[404];
                break;
            case 429: message.textContent = errors[429];
                break;
            case 500: message.textContent = errors[500];
                break;
            default: message.textContent = errors.default;
        }
    }

    hide() {
        if (this._notFoundContainer.querySelector('.notfound')) {
            this._notFoundContainer.removeChild(this._notFoundContainer.querySelector('.notfound'));
        }
    }
}