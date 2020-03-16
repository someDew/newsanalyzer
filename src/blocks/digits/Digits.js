// STYLES
import './digits.css';

export default class Digits {
    constructor(domElem, storageHandler) {
        this._block = domElem;
        this._storageHandler = storageHandler;

        this._block.addEventListener('onload', this._renderDigits());
    }

    _renderDigits() {
        this._block.querySelector('.digits__request').insertAdjacentHTML('afterbegin', `&laquo;${this._storageHandler.getLastReqest()}&raquo;`);
        this._block.querySelector('.digits__per-week').textContent = this._storageHandler.getLastWeekNews();
        this._block.querySelector('.digits__in-titles').textContent = this._storageHandler.getMatchesInHeaders();
    }
}