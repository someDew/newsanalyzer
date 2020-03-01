// STYLES
import '../styles/analitics.css';

// CONSTANTS
import { SEARCH_PERIOD as searchPeriod } from './constants/constants.js';

// MODULES
import DateFormater from './modules/DateFormater.js';
import Digits from '../blocks/digits/Digits.js';
import Histogram from '../blocks/histogram/Histogram.js';

// Create instances for other modules
const dateFormater = new DateFormater;

// Create workers
new Digits(document.querySelector('.digits'));
new Histogram(document.querySelector('.histogram'), searchPeriod, dateFormater);