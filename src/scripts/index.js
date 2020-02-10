import "../styles/index.css";

import Api from "./modules/Api";
import NewsApi from "./modules/NewsApi";
import SearchInput from "./components/SearchInput";

const api = new Api();


const newsApi = new NewsApi(api);
const searchInput = new SearchInput(api, newsApi);

console.log(searchInput);

/* const searchPeriod = new SearchPeriod(date);
class SearchPeriod {
    constructor(date) {
        this._date = date;

        
        this.periodDuration = 7*24*60*60*1000;
    }
} */