export default class StorageHandler {
    constructor(searchPeriod) {
        this._searchPeriod = searchPeriod;
    }

    clearStorage() {
        localStorage.clear();
    }

    storeLines(array) {
        localStorage.setItem('lines', JSON.stringify(array));
    }
    
    getLineData(number) {
        return JSON.parse(localStorage.lines)[number];
    }

    storeNews(json, string) {

        // user request
        localStorage.setItem('lastReqest', string);

        // number of all newsapi results for digits block
        localStorage.setItem('lastWeekNews', json.totalResults);

        // number of rendered news on main page
        localStorage.setItem('showedNews', '0');

        // number of news returned by api (not the same as 'lastWeekNews')
        localStorage.setItem('totalNews', json.articles.length);

        // write articles array to 'news' item in storage
        localStorage.setItem('news', JSON.stringify(json.articles));

        // search user request in response headers and wright in 'matches' for analitics
        let matches = 0;
        const requestRegexp = new RegExp(string, 'im');
        json.articles.forEach( function(item) {
            if (requestRegexp.test(item.title)) {
                matches++
            }
        });

        // matches requst in response headers
        localStorage.setItem('matchesInHeaders', matches);
    }

    getNewsData(number) {
        return JSON.parse(localStorage.news)[number];
    }

    getTotalNews() {
        return localStorage.totalNews;
    }

    getLastReqest() {
        return localStorage.lastReqest;
    }

    getLastWeekNews() {
        return localStorage.lastWeekNews;
    }

    getMatchesInHeaders() {
        return localStorage.matchesInHeaders;
    }

    readShowedNews() {
        return localStorage.showedNews;
    }

    writeShowedNews(number) {
        localStorage.showedNews = number;
    }
}