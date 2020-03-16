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
        this._preloaderBlock = this._preloaderContainer.querySelector('.preloader');
    }

    hide() {
        if (this._preloaderBlock) {
            this._preloaderContainer.removeChild(this._preloaderBlock);
        }
    }
}