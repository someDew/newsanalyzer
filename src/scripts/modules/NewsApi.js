export default class NewsApi {
    constructor(properties) {
        this._apiKey = properties.apiKey;
        this._dateFormater = properties.dateFormater;
        this._searchPeriod = properties.searchPeriod;
    }

    getNews(string) {

        // take date minus 'searchPeriod' from today
        const date = new Date();
        date.setDate(date.getDate() - this._searchPeriod);
        const searchFrom = date.toISOString().slice(0, 10);

        // newsapi.org free plan now work only for localhost reqests
        // it is work throw yandex now
        const url = 'https://praktikum.tk/news/v2/everything?' +
                    `q=${string}&` +
                    `from=${searchFrom}&` +
                    `sortBy=publishedAt&` +
                    `language=ru&` +
                    `pageSize=100&` +
                    `apiKey=${this._apiKey}`;

        return fetch(url)
            .then(response => response.ok ? response.json() : Promise.reject(response));
    }
}