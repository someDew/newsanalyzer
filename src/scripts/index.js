// STYLES
import "../styles/index.css";

// MODULES
import NewsApi from "./modules/NewsApi";
import DateFormater from "./modules/DateFormater";
import SearchInput from "./components/SearchInput";
import CardsList from "./components/CadrsList";
import Card from "./components/Card";

// CONSTANTS
import {SHOW_NEWS_ONCE_TIME as showNewsOnceTime} from "./constants/constants";

// Create instances for other modules
const cardInstanceCreator = () => new Card(dateFormaterInstanceCreator);
const dateFormaterInstanceCreator = () => new DateFormater;


// Create workers
const newsApi = new NewsApi(dateFormaterInstanceCreator);
const cardsList = new CardsList(cardInstanceCreator, showNewsOnceTime);
const searchInput = new SearchInput(newsApi, cardsList);
