export default class StorageHandler {
    constructor() {
        // this._storage = sessionStorage;
    }

    clearStorage() {
        sessionStorage.clear();
    }

    writeStorage(json, string) {
        let count = 0;
        let totalNews = 0;
        const regexp = new RegExp(string, 'im');
        json.articles.forEach( function(item, index) {

            // search user request in response headers and wright in 'count' for analitics
            if (regexp.test(item.title)) {
                count++
            };
            
            // write every news in own record with own index, start by 'news1'
            sessionStorage.setItem(`news${(index + 1)}`, JSON.stringify(item));
            totalNews++;
        });

        sessionStorage.setItem('totalNews', totalNews); // news returned by api
        sessionStorage.setItem('countInHeaders', count); // matches requst in headers
        sessionStorage.setItem('lastWeekNews', json.totalResults); // quantity of all news api results for analitics
        sessionStorage.setItem('lastReqest', string); // user request
        sessionStorage.setItem('showedNews', '0'); // rendered news on page
    }

    getCardData() {
        sessionStorage.setItem('showedNews', (+sessionStorage.getItem('showedNews') + 1));
        const cardData = sessionStorage.getItem(`news${sessionStorage.getItem('showedNews')}`);
        return JSON.parse(cardData);
    }
}