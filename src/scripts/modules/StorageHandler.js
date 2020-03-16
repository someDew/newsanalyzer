export default class StorageHandler {
    constructor(searchPeriod) {
        this._searchPeriod = searchPeriod;
    }

    clearStorage() {
        localStorage.clear();
    }

    writeStorage(json, string) {
        
        // user request
        localStorage.setItem('lastReqest', string);

        // number of all newsapi results for digits block
        localStorage.setItem('lastWeekNews', json.totalResults);
        
        // number of rendered news on main page
        localStorage.setItem('showedNews', '0');
        
        // number of news returned by api (not the same as 'lastWeekNews')
        localStorage.setItem('totalNews', json.articles.length);        
        
        let matches = 0;
        const requestRegexp = new RegExp(string, 'im');
        json.articles.forEach( function(item, index) {
            
            // write every news in his own record with own index, start by 'news0'
            localStorage.setItem(`news${(index)}`, JSON.stringify(item));
            
            // search user request in response headers and wright in 'matches' for analitics
            if (requestRegexp.test(item.title)) {
                matches++
            }
        });
        
        // matches requst in response headers
        localStorage.setItem('matchesInHeaders', matches);
    }

    getNewsData(number) {
        return JSON.parse(localStorage.getItem(`news${number}`));
    }
    
    getLineData(number) {
        return JSON.parse(localStorage.getItem(`line${number}`));
    }

    getTotalNews() {
        return localStorage.totalNews;
    }

    writeLineItem(lineNumber, searchDate, lineCount = 0) {
        localStorage.setItem(`line${lineNumber}`, JSON.stringify([searchDate, lineCount]));
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