export default class NewsApi {
    constructor(func, key) {
        this._dateFormater = func;
        this._apiKey = key;

        this._from = '';
    }

    _calcFormatDate() {
        const searchPeriod = 7*24*60*60*1000;
        let date = new Date();
        date.setTime(new Date().setTime(date.getTime() - searchPeriod));

        const dateFormater = this._dateFormater();
        const dateObj = dateFormater.getFormatedDateObject(date);

        this._from = dateObj.formatYear + '-' + dateObj.formatMonth + '-' + dateObj.formatDate;
    }

    getNews(string) {
        this._calcFormatDate();
        const url = 'https://newsapi.org/v2/everything?' +
                    `q=${string}&` +
                    `from=${this._from}&` +
                    `sortBy=publishedAt&` +
                    `language=ru&` +
                    `pageSize=100&` +
                    `apiKey=${this._apiKey}`;

        return fetch(url);
    }
}