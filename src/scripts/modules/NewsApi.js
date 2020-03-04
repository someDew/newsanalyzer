export default class NewsApi {
    constructor(dateFormater, key, searchPeriod) {
        this._dateFormater = dateFormater;
        this._apiKey = key;
        this._searchPeriod = searchPeriod;

        this._searchFrom = '';
    }

    getNews(string) {

        // take date minus 'searchPeriod' from today
        const date = new Date();
        date.setDate(date.getDate() - this._searchPeriod);
        this._searchFrom = date.toISOString().slice(0, 10);

        const url = 'https://newsapi.org/v2/everything?' +
                    `q=${string}&` +
                    `from=${this._searchFrom}&` +
                    `sortBy=publishedAt&` +
                    `language=ru&` +
                    `pageSize=100&` +
                    `apiKey=${this._apiKey}`;

        return fetch(url);
    }
}