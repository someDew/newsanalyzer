export default class Digits {
    constructor(domElem) {
        this._block = domElem;

        this._block.addEventListener('onload', this.render());
    }

    render() {
        this._block.querySelector('.digits__request').insertAdjacentHTML('afterbegin', `&laquo;${sessionStorage.lastReqest}&raquo;`);
        this._block.querySelector('.digits__per-week').innerText = sessionStorage.lastWeekNews;
        this._block.querySelector('.digits__in-titles').innerText = sessionStorage.countInHeaders;
    }
}