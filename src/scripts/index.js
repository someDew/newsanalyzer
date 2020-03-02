// STYLES
import '../styles/index.css';

// RESORSES

// CONSTANTS
import { NEWS_API_KEY as apiKey } from './constants/constants.js';
import { SHOW_NEWS_ONCE_TIME as showNewsOnceTime } from './constants/constants.js';
import { SEARCH_PERIOD as searchPeriod } from './constants/constants.js';

// MODULES
import NewsApi from './modules/NewsApi';
import DateFormater from './modules/DateFormater.js';
import StorageHandler from './modules/StorageHandler.js';
import SearchInput from './components/SearchInput.js';
import CardsList from './components/CadrsList.js';

import Card from '../blocks/card/Card.js';
import NotFound from '../blocks/notfound/NotFound.js';
import Preloader from '../blocks/preloader/Preloader.js';

// Create instances for other modules
const dateFormater = new DateFormater;
const storageHandler = new StorageHandler(searchPeriod);
const card = new Card(dateFormater);
const notFound = new NotFound(document.querySelector('.content'));
const preloader = new Preloader(document.querySelector('.content'));

// Create workers
const newsApi = new NewsApi(dateFormater, apiKey, searchPeriod);
const cardsList = new CardsList(card, showNewsOnceTime, document.querySelector('.results'), storageHandler);
const searchInput = new SearchInput(newsApi, cardsList, storageHandler, notFound, preloader);


window.addEventListener('onload', searchInput.renderPrevious());