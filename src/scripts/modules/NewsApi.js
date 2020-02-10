export default class NewsApi {
    constructor(...props) {
        this._userReq = '';
        this._apiKey = '645b08dc7d82469f97632a0b65a7e633';
        this._from = '';
        
    }

    _calcFormatDate() {
        const searchPeriod = 7*24*60*60*1000;
        let date = new Date();
        const fromTimeStamp = new Date().setTime(date.getTime() - searchPeriod);
        date.setTime(fromTimeStamp);

        let MM = date.getMonth('MM') + 1;
        


        console.log('7 days ago in full date: ' + date);
        console.log('formated date: ' + date.getFullYear('YYYY') + '-' + (date.getMonth('MM') + 1) + '-' + date.getDate('DD'));
        console.log('Тип переменной date: ' + typeof date);

        this._from = ''
    }

    getFakeNews() {
        const fakeFetch = new Promise ((resolve, reject) => {
            setTimeout(function() {
                resolve('Таймаут истек');
            }, 7000);
        });

        return fakeFetch;
    }

    getNews() {
        this._calcFormatDate();
        const url = 'https://newsapi.org/v2/everything?' +
                    `q=${this._userReq}&` +
                    `from=${this._from}&` +
                    `sortBy=publishedAt&` +
                    `apiKey=${this._apiKey}`;

        return url;
    }
}