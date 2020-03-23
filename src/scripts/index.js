// STYLES
import '../styles/index.css';

// RESORSES

// CONSTANTS
import { NEWS_API_KEY as apiKey } from './constants/constants.js';
import { SHOW_NEWS_ONCE_TIME as showNewsOnceTime } from './constants/constants.js';
import { SEARCH_PERIOD as searchPeriod } from './constants/constants.js';
import { DOM_ELEMENTS as elements } from './constants/constants.js';

// MODULES
import NewsApi from './modules/NewsApi';
import DateFormater from './modules/DateFormater.js';
import StorageHandler from './modules/StorageHandler.js';
import SearchInput from './components/SearchInput.js';
import NewsCard from '../blocks/news/__card/NewsCard.js';
import NewsCardsList from '../blocks/news/__cards-list/NewsCadrsList.js';
import NotFound from '../blocks/notfound/NotFound.js';
import Preloader from '../blocks/preloader/Preloader.js';

// INSTANCES
const dateFormater = new DateFormater;
const storageHandler = new StorageHandler(searchPeriod);
const notFound = new NotFound(elements.content);
const preloader = new Preloader(elements.content);
const newsApi = new NewsApi({ dateFormater, apiKey, searchPeriod });
const newsCard = new NewsCard(dateFormater);
const newsCardsList = new NewsCardsList({ showNewsOnceTime, elements, storageHandler, newsCard });
const searchInput = new SearchInput({ newsApi, newsCardsList, storageHandler, notFound, preloader });

// WORKERS
window.onload = () => searchInput.renderPrevious();