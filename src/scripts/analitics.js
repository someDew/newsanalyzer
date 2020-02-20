// STYLES
import "../styles/analitics.css";

// CONSTANTS

// MODULES
import Digits from "./components/Digits";

// Create instances for other modules

// Create workers
const digits = new Digits();

window.onload = () => {
    digits.render(document.querySelector('.digits'));
}