export default class Histogram {
    constructor(domElem, storageHandler, searchPeriod) {
        this._histogramContainer = domElem;
        this._storageHandler = storageHandler;
        this._searchPeriod = searchPeriod;

        // this._histogramContainer.addEventListener('onload', this._renderHistogram());
    }

    _renderHistogram() {

        // number of line in histogram, 0 is today, 1 is yesterday and so on
        let lineNumber = 0;

        // number of news in current line
        let lineCount = 0;

        for ( let i = 0; i < sessionStorage.getItem('totalNews'); i++) {
            const newsData = this._storageHandler.getNewsData(i);

            // newsapi send news in descending order starting from today's date
            let today = new Date();

            // first regexp will be match with today date, next with yesterday and so on
            let newsDate = new Date(today.setDate(today.getDate() - lineNumber)).toISOString().slice(0, 10);
            let newsDateRegexp = new RegExp(newsDate);

            // 
            if (newsDateRegexp.test(newsData.publishedAt)) {
                lineCount++;
            } else {
                sessionStorage.setItem(`line${lineNumber}`, lineCount);
                lineCount = 0;
                lineNumber++;
                i -= 1;
            }
        }
        sessionStorage.setItem(`line${lineNumber}`, lineCount);

        if (this._searchPeriod > lineNumber) {
            const remainigLines = this._searchPeriod - lineNumber;
            for ( let j = 1; j < remainigLines; j++) {
                sessionStorage.setItem(`line${++lineNumber}`, 0);
            }
        }
    }
}