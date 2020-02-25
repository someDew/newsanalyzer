// STYLES
import './preloader.css';

// RESORSES
import template from './preloader-temp.js';

export default class Preloader {
    constructor(domElem) {
        this._preloaderContainer = domElem;
        this._preloaderTemplate = template;
    }

    show() {
        this._preloaderContainer.insertAdjacentHTML('afterbegin', this._preloaderTemplate);
    }

    hide() {
        if (this._preloaderContainer.querySelector('.preloader')) {
            this._preloaderContainer.removeChild(this._preloaderContainer.querySelector('.preloader'));
        }
    }
}