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
import NewsCardsList from '../blocks/news/__cards-list/NewsCadrsList.js';
import NotFound from '../blocks/notfound/NotFound.js';
import Preloader from '../blocks/preloader/Preloader.js';

// INSTANCES
const dateFormater = new DateFormater;
const storageHandler = new StorageHandler(searchPeriod);
const notFound = new NotFound(document.querySelector('.content'));
const preloader = new Preloader(document.querySelector('.content'));
const newsApi = new NewsApi(dateFormater, apiKey, searchPeriod);
const newsCardsList = new NewsCardsList(dateFormater, showNewsOnceTime, document.querySelector('.news'), storageHandler);
const searchInput = new SearchInput(newsApi, newsCardsList, storageHandler, notFound, preloader);

// WORKERS
window.addEventListener('onload', searchInput.renderPrevious());