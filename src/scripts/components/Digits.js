export default class Digits {
    constructor(domElem) {
        this._block = domElem;
    }

    render() {
        this._block.querySelector('.digits__reqest').innerText = sessionStorage.lastReqest;
        this._block.querySelector('.digits__per-week').innerText = sessionStorage.lastWeekNews;
        this._block.querySelector('.digits__in-titles').innerText = sessionStorage.countInHeaders;
    }
}