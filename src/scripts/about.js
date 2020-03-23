// STYLES
import '../styles/about.css';
import 'swiper/css/swiper.css';


// CONSTANTS
import { GIT_COMMITS_URL as gitCommitsUrl } from './constants/constants.js';
import { COMMITS_TO_SHOW as commitsToShow } from './constants/constants.js';
import { SLIDER_OPTIONS as sliderOptions } from './constants/constants.js';
import { DOM_ELEMENTS as elements } from './constants/constants.js';

// MODULES
import GitApi from './modules/GitApi.js';
import DateFormater from './modules/DateFormater.js';
import GithubCardsList from '../blocks/github/__cards-list/GithubCardsList.js';
import GithubCard from '../blocks/github/__card/GithubCard.js';
import Swiper from 'swiper';

// INSTANCES
const dateFormater = new DateFormater();
const gitApi = new GitApi(gitCommitsUrl);
const githubCard = new GithubCard(dateFormater)
const slider = new Swiper(elements.slider, sliderOptions);
const github = new GithubCardsList({ gitApi, commitsToShow, slider, githubCard });

// WORKERS
window.onload = () => github.renderCommits();