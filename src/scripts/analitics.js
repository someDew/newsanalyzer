// STYLES
import '../styles/analitics.css';

// CONSTANTS
import { SEARCH_PERIOD as searchPeriod } from './constants/constants.js';
import { DOM_ELEMENTS as elements } from './constants/constants.js';

// MODULES
import DateFormater from './modules/DateFormater.js';
import Digits from '../blocks/digits/Digits.js';
import Histogram from '../blocks/histogram/Histogram.js';
import StorageHandler from './modules/StorageHandler.js';

// INSTANCES
const dateFormater = new DateFormater;
const storageHandler = new StorageHandler(searchPeriod);
const histogram = new Histogram({ elements, searchPeriod, dateFormater, storageHandler });
new Digits({ elements, storageHandler });

// WORKERS
window.onload = () => histogram.renderHistogram();