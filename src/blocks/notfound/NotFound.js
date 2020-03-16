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
        this._notfoundBlock = this._notFoundContainer.querySelector('.notfound');
        this._notfoundBlock.querySelector('.notfound__img').src = this._notFoundImage;

        const header = this._notfoundBlock.querySelector('.notfound__title');
        const message = this._notfoundBlock.querySelector('.notfound__text');
        
        switch (string) {
            case 'ok':
                header.textContent = errors.ok.title;
                message.textContent = errors.ok.text;
                break;
            case 400:
                header.textContent = errors[400].title;
                message.textContent = errors[400].text;
                break;
            case 401:
                header.textContent = errors[401].title;
                message.textContent = errors[401].text;
                break;
            case 404:
                header.textContent = errors[404].title;
                message.textContent = errors[404].text;
                break;
            case 429:
                header.textContent = errors[429].title;
                message.textContent = errors[429].text;
                break;
            case 500:
                header.textContent = errors[500].title;
                message.textContent = errors[500].text;
                break;
            default:
                header.textContent = errors.default.title;
                message.textContent = errors.default.text;
        }
    }

    hide() {
        if (this._notfoundBlock) {
            this._notFoundContainer.removeChild(this._notfoundBlock);
        }
    }
}