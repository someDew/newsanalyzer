// STYLES
import "../styles/index.css";

// RESORSES
import defaultNewsImage from "../images/default-cardpic.jpg";

// CONSTANTS
import {NEWS_API_KEY as apiKey} from "./constants/constants";
import {SHOW_NEWS_ONCE_TIME as showNewsOnceTime} from "./constants/constants";
import {SEARCH_PERIOD as searchPeriod} from "./constants/constants";

// MODULES
import NewsApi from "./modules/NewsApi";
import DateFormater from "./modules/DateFormater";
import StorageHandler from "./modules/StorageHandler";
import SearchInput from "./components/SearchInput";
import CardsList from "./components/CadrsList";
import Card from "./components/Card";

import NotFound from '../blocks/notfound/NotFound';

// Create instances for other modules
const dateFormater = new DateFormater;
const storageHandler = new StorageHandler;
const card = new Card(dateFormater, defaultNewsImage);
const notFound = new NotFound(document.querySelector('.content'));

// Create workers
const newsApi = new NewsApi(dateFormater, apiKey, searchPeriod);
const cardsList = new CardsList(card, showNewsOnceTime, document.querySelector('.results'), storageHandler);
const searchInput = new SearchInput(newsApi, cardsList, storageHandler, notFound);