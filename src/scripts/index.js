import "../styles/index.css";

import Api from "./modules/Api";
import NewsApi from "./modules/NewsApi";
import SearchInput from "./components/SearchInput";
import CardsList from "./components/CadrsList";
import Card from "./components/Card";

const api = new Api();

const cardInstanceCreator = () => new Card();

const newsApi = new NewsApi(api);
const cardsList = new CardsList(document.querySelector('.results'), cardInstanceCreator);
const searchInput = new SearchInput(api, newsApi, cardsList);
