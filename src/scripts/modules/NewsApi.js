export default class NewsApi {
    constructor(func) {
        this._apiKey = '645b08dc7d82469f97632a0b65a7e633';
        this._from = '';
        this._dateFormater = func;
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
        console.log('вызван: getNews');
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