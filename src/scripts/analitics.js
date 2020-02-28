// STYLES
import '../styles/analitics.css';

// CONSTANTS
import {SEARCH_PERIOD as searchPeriod} from './constants/constants.js';

// MODULES
import Digits from '../blocks/digits/Digits.js';
import Histogram from '../blocks/histogram/Histogram.js';
import StorageHandler from './modules/StorageHandler.js';

// Create instances for other modules
const storageHandler = new StorageHandler();

// Create workers
new Digits(document.querySelector('.digits'));
new Histogram(document.querySelector('.histogram'), storageHandler, searchPeriod);