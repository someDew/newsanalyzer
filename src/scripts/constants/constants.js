export const NEWS_API_KEY = '645b08dc7d82469f97632a0b65a7e633';

// number of news items displayed at a time
export const SHOW_NEWS_ONCE_TIME = 3;

// the number of days is counted from 0 to the period value
// another words, 6 value will lead to a search for news for 7 days, starting today
export const SEARCH_PERIOD = 6;

// url to request last commits from github repo of this project
export const GIT_COMMITS_URL = 'https://api.github.com/repos/someDew/newsanalyzer/commits'

// number of commits to show on about page
export const COMMITS_TO_SHOW = 20;

// this object contains text transcripts of errors returned by news api
export const NEWS_API_ERRORS = {
    ok: 'К сожалению результаты по данному запросу отсутствуют. Попробуйте изменить запрос.',
    400: 'Недопустимый формат запроса. Попробуйте изменить запрос.',
    401: 'К сожалению возникла проблема с авторизацией. Пожалуйста, попробуйте позже.',
    404: 'К сожалению сервер недоступен. Пожалуйста, попробуйте позже.',
    429: 'Слишком частые запросы. Пожалуйста, попробуйте позже.',
    500: 'К сожалению произошла ошибка на сервере. Пожалуйста, попробуйте позже.',
    default: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Пожалуйста, попробуйте позже.',
};


// options of slider for about page
export const SLIDER_OPTIONS = {

    breakpoints: {
        1150: {
            slidesPerView: 5,
        },
        930: {
            slidesPerView: 4,
        },
        611: {
            slidesPerView: 3,
        },
        1: {
            spaceBetween: 0,
            
            slidesPerView: 1,
            centeredSlides: true,
            centeredSlidesBounds: true,
        },
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    
    navigation: {
        nextEl: '.github__slider-button_next',
        prevEl: '.github__slider-button_prev',
    },
    
    mousewheel: {},

    observer: true,
    observeParents: true,
    observeSlideChildren: true,

    loop: true,
    loopFillGroupWithBlank: true,
    slidesPerView: 5,
    slidesPerGroup: 1,
    spaceBetween: 16,

    grabCursor: true,
};