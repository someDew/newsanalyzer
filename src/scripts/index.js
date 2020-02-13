import "../styles/index.css";

import Api from "./modules/Api";
import NewsApi from "./modules/NewsApi";
import SearchInput from "./components/SearchInput";

const api = new Api();


const newsApi = new NewsApi(api);
const searchInput = new SearchInput(api, newsApi);