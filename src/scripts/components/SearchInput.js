export default class SearchInput {
    constructor(newsApi, cardsList) {
        
        this.newsApi = newsApi;
        this._searchForm = document.forms.searchForm;
        this._input = this._searchForm.elements.searchInput;
        this._button = this._searchForm.elements.searchSubmit;
        this._preloader = document.querySelector('.preloader');
        this._errorMsg = document.querySelector('.notfound');
        this._cardsList = cardsList;

        this._searchForm.addEventListener('submit', this._handleSubmit.bind(this));
        this._input.addEventListener('input', this._handleInput.bind(this));
        this._input.addEventListener('invalid', this._handleInvalid.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();
        this._handlePreloader();
        this._hideNotFound();
        this._blockForm();
        sessionStorage.clear();
        this._cardsList.cardsBlock.querySelector('.cards-list').innerHTML = '';
        this.newsApi.getNews(this._input.value)
            .then(res => {                
                if (res.ok) {                   
                    return res.json();
                }
                return Promise.reject(res);
            })
            .then(res => {
                if (res.totalResults !== 0) {
                    return res
                }
                return Promise.reject(res);
            })
            .then(response => {
                this._updateStorage(response, this._input.value)
                this._cardsList.showCardsGroup();
                this._cardsList.cardsBlock.classList.remove('results_disable');
            })
            .catch(err => {
                console.log('Статус ответа news api: ' + err.status);
                this._showNotFound(err.status);
            })
            .finally(() => {
                this._unblockForm();
                this._handlePreloader();
            });
    }

    _updateStorage(json, string) {
        sessionStorage.setItem('lastReqest', string);
        sessionStorage.setItem('showedNews', '0');
        let totalNews = 0;
        json.articles.forEach( function(item, index) {
            sessionStorage.setItem(`news${(index + 1)}`, JSON.stringify(item));
            totalNews++;
        });
        sessionStorage.setItem('totalNews', totalNews);
    }

    _handlePreloader() {
        this._preloader.classList.toggle('preloader_disable');
    }

    _showNotFound(err) {
        const message = this._errorMsg.querySelector('.notfound__text');
        switch (err) {
            case 'ok':
                message.innerText = 'К сожалению результаты по данному запросу отсутствуют. Попробуйте изменить запрос.';
                break;
            case 400:
                message.innerText = 'Недопустимый формат запроса. Попробуйте изменить запрос.';
                break;
            case 401:
                message.innerText = 'К сожалению возникла проблема с авторизацией. Пожалуйста, попробуйте позже.';
                break;
            case 429:
                message.innerText = 'Слишком частые запросы. Пожалуйста, попробуйте позже.';
                break;
            case 500:
                message.innerText = 'К сожалению произошла ошибка на сервере. Пожалуйста, попробуйте позже.';
                break;
            default:
                message.innerText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Пожалуйста, попробуйте позже.';
        }
        this._errorMsg.classList.remove('notfound_disable');
    }

    _hideNotFound() {
        this._errorMsg.classList.add('notfound_disable');
    }

    _blockForm() {
        this._input.setAttribute('disabled', 'true');
        this._button.setAttribute('disabled', 'true');
    }

    _unblockForm() {
        this._input.removeAttribute('disabled');
        this._button.removeAttribute('disabled');
    }

    _handleInput() {
        this._input.setCustomValidity('');
    }

    _handleInvalid() {
        this._input.setCustomValidity('Пожалуйста, введите ключевое слово');
    }    
}

