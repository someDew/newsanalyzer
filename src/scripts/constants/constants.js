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