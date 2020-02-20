export default class DateFormater {
    constructor() {
        this._date = {}
    }

    _formatDigitsDateParams (string) {
        if (string.length === 1) {
            string = ('0' + string);
        }
        return string;
    }

    _formatMonthToWord (month) {
        switch (month) {
            case '01':
                return month = {genitive: 'января', nominative: 'январь'};
            case '02':
                return month = {genitive: 'февраля', nominative: 'февраль'};
            case '03':
                return month = {genitive: 'марта', nominative: 'март'};
            case '04':
                return month = {genitive: 'апреля', nominative: 'апрель'};
            case '05':
                return month = {genitive: 'мая', nominative: 'май'};
            case '06':
                return month = {genitive: 'июня', nominative: 'июнь'};
            case '07':
                return month = {genitive: 'июля', nominative: 'июль'};
            case '08':
                return month = {genitive: 'августа', nominative: 'август'};
            case '09':
                return month = {genitive: 'сентября', nominative: 'сентябрь'};
            case '10':
                return month = {genitive: 'октября', nominative: 'октябрь'};
            case '11':
                return month = {genitive: 'ноября', nominative: 'ноябрь'};
            case '12':
                return month = {genitive: 'декабря', nominative: 'декабрь'};
        }
    }

    _formatDayToWord (day) {
        switch (day) {
            case '0':
                return day = 'вс';
            case '1':
                return day = 'пн';
            case '2':
                return day = 'вт';       
            case '3':
                return day = 'ср';
            case '4':
                return day = 'чт';
            case '5':
                return day = 'пт';
            case '6':
                return day = 'сб';
        }
    }

    getFormatedDateObject(date) {
        this._date = new Date(date);
        const formatedDateObject = {};

        formatedDateObject.formatYear = this._date.getFullYear().toString();
        formatedDateObject.formatMonth = this._formatDigitsDateParams((this._date.getMonth() + 1).toString());
        formatedDateObject.formatDate = this._formatDigitsDateParams(this._date.getDate().toString());
        formatedDateObject.formatDayWord = this._formatDayToWord(this._date.getDay().toString());
        formatedDateObject.formatMonthWord = this._formatMonthToWord(formatedDateObject.formatMonth);

        return formatedDateObject;
    }
}