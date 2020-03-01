// STYLES
import '../styles/analitics.css';

// CONSTANTS

// MODULES
import Digits from '../blocks/digits/Digits.js';
import Histogram from '../blocks/histogram/Histogram.js';

// Create instances for other modules

// Create workers
new Digits(document.querySelector('.digits'));
new Histogram(document.querySelector('.histogram'));