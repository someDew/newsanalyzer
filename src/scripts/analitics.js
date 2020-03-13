// STYLES
import '../styles/analitics.css';

// CONSTANTS
import { SEARCH_PERIOD as searchPeriod } from './constants/constants.js';

// MODULES
import DateFormater from './modules/DateFormater.js';
import Digits from '../blocks/digits/Digits.js';
import Histogram from '../blocks/histogram/Histogram.js';
import StorageHandler from './modules/StorageHandler.js'; 

// INSTANCES
const dateFormater = new DateFormater;
const storageHandler = new StorageHandler(searchPeriod); 
const histogram = new Histogram(document.querySelector('.histogram'), searchPeriod, dateFormater, storageHandler);
new Digits(document.querySelector('.digits'), storageHandler);

// WORKERS
window.onload = () => histogram.renderHistogram();