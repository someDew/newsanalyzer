// STYLES
import "../styles/index.css";

// RESORSES
import defaultNewsImage from "../images/default-cardpic.jpg";

// CONSTANTS
import {NEWS_API_KEY as apiKey} from "./constants/constants";
import {SHOW_NEWS_ONCE_TIME as showNewsOnceTime} from "./constants/constants";

// MODULES
import NewsApi from "./modules/NewsApi";
import DateFormater from "./modules/DateFormater";
import SearchInput from "./components/SearchInput";
import CardsList from "./components/CadrsList";
import Card from "./components/Card";

// Create instances for other modules
const cardInstanceCreator = () => new Card(dateFormaterInstanceCreator, defaultNewsImage);
const dateFormaterInstanceCreator = () => new DateFormater;

// Create workers
const newsApi = new NewsApi(dateFormaterInstanceCreator, apiKey);
const cardsList = new CardsList(cardInstanceCreator, showNewsOnceTime, document.querySelector('.results'));
const searchInput = new SearchInput(newsApi, cardsList);