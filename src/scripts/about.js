// STYLES
import "../styles/about.css";

// CONSTANTS
import { GIT_COMMITS_URL as gitCommitsUrl } from './constants/constants.js';
import { COMMITS_TO_SHOW as commitsToShow } from './constants/constants.js';

// MODULES
import GitApi from './modules/GitApi.js';
import DateFormater from './modules/DateFormater.js';
import GithubCardsList from '../blocks/github/__cards-list/GithubCardsList.js';

// INSTANCES
const dateFormater = new DateFormater();
const gitApi = new GitApi(gitCommitsUrl);
const github = new GithubCardsList(dateFormater, gitApi, document.querySelector('.github'), commitsToShow);

// WORKERS
window.addEventListener('onload', github.renderCommits());