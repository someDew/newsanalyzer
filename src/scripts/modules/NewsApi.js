export default class NewsApi {
    constructor() {
        this._apiKey = '645b08dc7d82469f97632a0b65a7e633';
        this._from = '';
         
    }

    _calcFormatDate() {
        const searchPeriod = 7*24*60*60*1000;
        let date = new Date();
        date.setTime(new Date().setTime(date.getTime() - searchPeriod));

        let reqDay = date.getDate().toString();
        let reqMonth = (date.getMonth() + 1).toString();
        let reqYear = date.getFullYear().toString();

        const formatDate = (string) => {
            switch (string.length) {
                case 1:
                    string = '0' + string;
                    return string                    
                case 2:
                    return string
            }
        }        

        this._from = reqYear + '-' + formatDate(reqMonth) + '-' + formatDate(reqDay);
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