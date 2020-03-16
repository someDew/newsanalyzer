// STYLES
import './histogram.css';

// RESORSES
import { lineTemplate, lineItemTemplate } from './histogram-line-temp.js'

export default class Histogram {
    constructor(domElem, searchPeriod, dateFormater, storageHandler) {
        this._histogramContainer = domElem;
        this._lineTemplate = lineTemplate;
        this._lineItemTemplate = lineItemTemplate;
        this._searchPeriod = searchPeriod;
        this._dateFormater = dateFormater;
        this._storageHandler = storageHandler;
    }

    renderHistogram() {
        this._calculateHistogram();

        for (let i = this._searchPeriod; i >= 0; i--) {
            const lineData = this._storageHandler.getLineData(i);
            const dateObj = this._dateFormater.getFormatedDateObject(lineData[0]);

            if (i === 0) {
                this._histogramContainer.querySelector('.histogram__head-date').textContent = `дата (${dateObj.formatMonthWord.nominative})`;
            }

            this._histogramContainer.querySelector('.histogram__days-block').insertAdjacentHTML('afterbegin', this._lineTemplate);
            this._histogramContainer.querySelector('.histogram__date').textContent = dateObj.formatDate + ' ' + dateObj.formatDayWord;
            this._histogramContainer.querySelector('.histogram__quantity').textContent = lineData[1];

            for (let j = 1; j <= lineData[1]; j++) {
                this._histogramContainer.querySelector('.histogram__line').insertAdjacentHTML('afterbegin', this._lineItemTemplate);
            }
        }
    }

    _calculateHistogram() {
        const totalNews = this._storageHandler.getTotalNews();

        // number of line in histogram, 0 is today, 1 is yesterday and so on
        let lineNumber = 0;

        // number of news in current line
        let lineCount = 0;

        let searchDate = {};
        let today = {};

        for ( let i = 0; i < totalNews; i++) {
            const newsData = this._storageHandler.getNewsData(i);

            // newsapi send news in descending order starting from today's date
            today = new Date();

            // first regexp will be match with today date, next with yesterday and so on
            // 'searchDate' inverse depend on 'lineNumber' 
            searchDate = new Date(today.setDate(today.getDate() - lineNumber)).toISOString().slice(0, 10);
            let searchDateRegexp = new RegExp(searchDate);

            if (searchDateRegexp.test(newsData.publishedAt)) {
                
                // if dates match - increase lineCount
                lineCount++;
            } else {

                // if control date dont match with current news 'publishAt':
                // - write new line to Storage,
                this._storageHandler.writeLineItem(lineNumber, searchDate, lineCount);                

                // - reset counter,
                lineCount = 0;

                // - increase line number, to proceed to checking the next date,
                lineNumber++;

                // - and decrease cycle index, for check match current news with next date
                i -= 1;
            }
        }

        // after all news cycle, write last line to Storage
        this._storageHandler.writeLineItem(lineNumber, searchDate, lineCount);

        // histogram must contain 'searchPeriod' days statistic, that is why next check lines number
        // and missing lines write with 0 value
        if (this._searchPeriod > lineNumber) {
            const remainigLines = this._searchPeriod - lineNumber;
            for ( let j = 0; j < remainigLines; j++) {
                ++lineNumber;
                today = new Date();
                searchDate = new Date(today.setDate(today.getDate() - lineNumber)).toISOString().slice(0, 10);
                this._storageHandler.writeLineItem(lineNumber, searchDate);
            }
        }
    }
}