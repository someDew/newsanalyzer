export default class NewsApi {
    constructor(...props) {
        this.key = '645b08dc7d82469f97632a0b65a7e633';
    }

    getFakeNews() {
        const fakeFech = new Promise ((resolve, reject) => {
            setTimeout(function() {
                resolve('Таймаут истек');
            }, 7000);
        });

        return fakeFech;
    }
}