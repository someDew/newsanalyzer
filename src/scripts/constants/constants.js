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
    ok:  {  title: 'Ничего не найдено',
            text: 'К сожалению результаты по данному запросу отсутствуют. Попробуйте изменить запрос.'},
    400: {  title: 'Недопустимый формат запроса',
            text: 'Сервер вернул ошибку формата запроса. Пожалуйста, попробуйте изменить запрос.'},
    401: {  title: 'Ошибка авторизации',
            text: 'К сожалению возникла проблема с авторизацией. Пожалуйста, попробуйте позже.'},
    404: {  title: 'Сервер недоступен',
            text: 'К сожалению сервер недоступен. Пожалуйста, попробуйте позже.'},
    429: {  title: 'Слишком частые запросы',
            text: 'Превышен порог частоты запросов. Пожалуйста, попробуйте позже.'},
    500: {  title: 'Сервер вернул ошибку', 
            text: 'К сожалению произошла ошибка на сервере. Пожалуйста, попробуйте позже.'},
    default: { title:'Во время запроса произошла ошибка.',
               text: 'Возможно, проблема с соединением или сервер недоступен. Пожалуйста, попробуйте позже.'}
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

// DOM elements to pass to modules
export const DOM_ELEMENTS = {
    content: document.querySelector('.content'),
    news: document.querySelector('.news'),
    digits: document.querySelector('.digits'),
    histogram: document.querySelector('.histogram'),
    slider: document.querySelector('.swiper-container'),
}
