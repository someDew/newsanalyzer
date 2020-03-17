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

            // write month from today date
            if (i === 0) {
                this._histogramContainer.querySelector('.histogram__head-date').textContent = `дата (${dateObj.formatMonthWord.nominative})`;
            }

            this._histogramContainer.querySelector('.histogram__days-block').insertAdjacentHTML('afterbegin', this._lineTemplate);
            this._histogramContainer.querySelector('.histogram__date').textContent = dateObj.formatDate + ' ' + dateObj.formatDayWord;
            this._histogramContainer.querySelector('.histogram__quantity').textContent = lineData[1];
            
            // add line items 
            for (let j = 1; j <= lineData[1]; j++) {
                this._histogramContainer.querySelector('.histogram__line').insertAdjacentHTML('afterbegin', this._lineItemTemplate);
            }
        }
    }

    _calculateHistogram() {
        const totalNews = this._storageHandler.getTotalNews();
        const linesArray = [];

        // number of line in histogram, 0 is today, 1 is yesterday and so on
        let lineNumber = 0;

        // number of news in current line
        let lineCount = 0;

        for ( let i = 0; i < totalNews; i++) {

            // 'checkDate' start from today, then 'lineNumber' equal to 0 and
            // decrease with 'lineNumber' increase
            const checkDate = this._getNextDate(lineNumber);
            const newsData = this._storageHandler.getNewsData(i);
            const checkDateRegexp = new RegExp(checkDate);

            // test 'checkDate' and news date
            if (checkDateRegexp.test(newsData.publishedAt)) {
                
                // if dates match - increase 'lineCount'
                lineCount++;
            } else {

                // if control date dont match with current news 'publishAt' it 
                // means that there was no news on this date. And next:
                // - write new line to 'linesArray',
                linesArray[lineNumber] = [checkDate, lineCount];

                // - reset counter,
                lineCount = 0;

                // - increase line number, to proceed to checking the next date,
                lineNumber++;

                // - and decrease cycle index, for check match current news with next date
                i -= 1;
            }
        }

        // after all news cycle, write last line to 'linesArray'
        linesArray[lineNumber] = [this._getNextDate(lineNumber), lineCount];

        // histogram must contain 'searchPeriod' days statistic, that is why next check lines number
        // and missing lines write with 0 value
        if (this._searchPeriod > lineNumber) {
            const remainigLines = this._searchPeriod - lineNumber;
            for ( let j = 0; j < remainigLines; j++) {
                ++lineNumber;
                linesArray[lineNumber] = [this._getNextDate(lineNumber), 0];
            }
        }

        // write 'linesArray' to storage
        this._storageHandler.storeLines(linesArray);
    }

    _getNextDate(lineNumber) {

        // newsapi send news in descending order starting from today's date
        const today = new Date();

        // first 'searchDate' will be match with today date, next with yesterday and so on
        // 'searchDate' inverse depend on 'lineNumber'
        const searchDate = new Date(today.setDate(today.getDate() - lineNumber)).toISOString().slice(0, 10);
        return searchDate;
    }
}