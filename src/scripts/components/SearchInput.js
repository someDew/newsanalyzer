export default class SearchInput {
    constructor(api, newsApi) {
        this.api = api;
        this.newsApi = newsApi;
        this._searchForm = document.forms.searchForm;
        this._input = this._searchForm.elements.searchInput;
        this._button = this._searchForm.elements.searchSubmit;
        this._preloader = document.querySelector('.preloader');
        this._errorMsg = document.querySelector('.notfound');

        this._searchForm.addEventListener('submit', this._handleSubmit.bind(this));
        this._input.addEventListener('input', this._handleInput.bind(this));
        this._input.addEventListener('invalid', this._handleInvalid.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();
        this._hideNotFound();
        this._blockForm();
        this._handlePreloader();
        this.newsApi.getNews(this._input.value)
            .then(response => {
                if (response.ok) {
                    sessionStorage.setItem('newsData', '');
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(response => {
                sessionStorage.setItem('newsData', JSON.stringify(response));
            })
            .catch(err => {
                console.log(err.status);
                this._showNotFound(err.status);
            })
            .finally(() => {
                this._unblockForm();
                this._handlePreloader();
            });
    }

    _handlePreloader() {
        this._preloader.classList.toggle('preloader_disable');
    }

    _showNotFound(string) {
        const message = this._errorMsg.querySelector('.notfound__text');
        switch (string) {
            case 400:
                message.innerText = 'К сожалению по вашему запросу ничего не найдено. Попробуйте изменить запрос.';
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


