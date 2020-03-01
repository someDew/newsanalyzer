// STYLES
import './histogram.css';

// RESORSES
import { lineTemplate, lineItemTemplate } from './histogram-line-temp.js'

export default class Histogram {
    constructor(domElem, searchPeriod, dateFormater) {
        this._histogramContainer = domElem;
        this._lineTemplate = lineTemplate;
        this._lineItemTemplate = lineItemTemplate;
        this._searchPeriod = searchPeriod;
        this._dateFormater = dateFormater;

        this._histogramContainer.addEventListener('onload', this._renderHistogram());
    }

    _renderHistogram() {
        for (let i = this._searchPeriod; i >= 0; i--) {
            const lineData = JSON.parse(sessionStorage.getItem(`line${i}`))
            const dateObj = this._dateFormater.getFormatedDateObject(lineData[0]);

            if (i === 0) {
                this._histogramContainer.querySelector('.histogram__head-date').innerText = `дата (${dateObj.formatMonthWord.nominative})`;
            }

            this._histogramContainer.querySelector('.histogram__days-block').insertAdjacentHTML('afterbegin', this._lineTemplate);
            this._histogramContainer.querySelector('.histogram__date').innerText = dateObj.formatDate + ' ' + dateObj.formatDayWord;
            this._histogramContainer.querySelector('.histogram__quantity').innerText = lineData[1];

            for (let j = 1; j <= lineData[1]; j++) {
                this._histogramContainer.querySelector('.histogram__line').insertAdjacentHTML('afterbegin', this._lineItemTemplate);
            }

        }

    }
}