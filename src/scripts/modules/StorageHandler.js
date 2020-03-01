export default class StorageHandler {
    constructor(searchPeriod) {
        this._searchPeriod = searchPeriod;
    }

    clearStorage() {
        sessionStorage.clear();
    }

    writeStorage(json, string) {
        
        // user request
        sessionStorage.setItem('lastReqest', string);

        // quantity of all newsapi results for digits block
        sessionStorage.setItem('lastWeekNews', json.totalResults);
        
        // number of rendered news on main page
        sessionStorage.setItem('showedNews', '0');
        
        // number of news returned by api
        sessionStorage.setItem('totalNews', json.articles.length);        
        
        let matches = 0;
        const requestRegexp = new RegExp(string, 'im');
        json.articles.forEach( function(item, index) {
            
            // write every news in his own record with own index, start by 'news0'
            sessionStorage.setItem(`news${(index)}`, JSON.stringify(item));
            
            // search user request in response headers and wright in 'matches' for analitics
            if (requestRegexp.test(item.title)) {
                matches++
            }
        });
        
        // matches requst in response headers
        sessionStorage.setItem('matchesInHeaders', matches);
    }

    getNewsData(number) {
        return JSON.parse(sessionStorage.getItem(`news${number}`));
    }

    calculateHistogram() {

        // number of line in histogram, 0 is today, 1 is yesterday and so on
        let lineNumber = 0;

        // number of news in current line
        let lineCount = 0;

        for ( let i = 0; i < sessionStorage.getItem('totalNews'); i++) {
            const newsData = this.getNewsData(i);

            // newsapi send news in descending order starting from today's date
            let today = new Date();

            // first regexp will be match with today date, next with yesterday and so on
            // 'searchDate' inverse depend on 'lineNumber' 
            let searchDate = new Date(today.setDate(today.getDate() - lineNumber)).toISOString().slice(0, 10);
            let searchDateRegexp = new RegExp(searchDate);

            if (searchDateRegexp.test(newsData.publishedAt)) {
                // if dates match - increase lineCount
                lineCount++;
            } else {
                // if control date dont match with current news 'publishAt':
                // - write new line to Storage,
                sessionStorage.setItem(`line${lineNumber}`, lineCount);

                // - reset counter,
                lineCount = 0;

                // - increase line number, to proceed to checking the next date,
                lineNumber++;

                // - and decrease cycle index, for check match current news with next date
                i -= 1;
            }
        }

        // after all news cycle, write last line to Storage
        sessionStorage.setItem(`line${lineNumber}`, lineCount);

        // histogram must contain 'searchPeriod' days statistic, that is why next check lines number
        // and missing lines write with 0 value
        if (this._searchPeriod > lineNumber) {
            const remainigLines = this._searchPeriod - lineNumber;
            for ( let j = 0; j < remainigLines; j++) {                
                sessionStorage.setItem(`line${++lineNumber}`, 0);
            }
        }
    }
}