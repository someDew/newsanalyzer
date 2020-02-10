import "../styles/index.css";

import NewsApi from "./modules/NewsApi";
import SearchInput from "./components/SearchInput";

const api = new NewsApi();
const searchInput = new SearchInput(api);

console.log(searchInput);