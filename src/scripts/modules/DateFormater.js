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
                return month = 'января';
            case '02':
                return month = 'февраля';
            case '03':
                return monthWord = 'марта';
            case '04':
                return month = 'апреля';
            case '05':
                return month = 'мая';
            case '06':
                return month = 'июня';
            case '07':
                return month = 'июля';
            case '08':
                return month = 'августа';
            case '09':
                return month = 'сентября';
            case '10':
                return month = 'октября';
            case '11':
                return month = 'ноября';
            case '12':
                return month = 'декабря';
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