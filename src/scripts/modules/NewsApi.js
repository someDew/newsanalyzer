export default class NewsApi {
    constructor(dateFormater, key, searchPeriod) {
        this._dateFormater = dateFormater;
        this._apiKey = key;
        this._searchPeriod = searchPeriod;

        this._from = '';
    }

    _calcFormatDate() {
        let date = new Date();
        date.setTime(new Date().setTime(date.getTime() - this._searchPeriod));
        const dateObj = this._dateFormater.getFormatedDateObject(date);

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