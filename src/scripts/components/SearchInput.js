export default class SearchInput {
    constructor(newsApi, cardsList, storageHandler) {
        
        this._newsApi = newsApi;
        this._searchForm = document.forms.searchForm;
        this._input = this._searchForm.elements.searchInput;
        this._button = this._searchForm.elements.searchSubmit;
        this._preloader = document.querySelector('.preloader');
        this._errorMsg = document.querySelector('.notfound');
        this._cardsList = cardsList;
        this._storageHandler = storageHandler;

        this._searchForm.addEventListener('submit', this._handleSubmit.bind(this));
        this._input.addEventListener('input', this._handleInput.bind(this));
        this._input.addEventListener('invalid', this._handleInvalid.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();
        this._handlePreloader();
        this._hideNotFound();
        this._blockForm();
        this._storageHandler.clearStorage();
        this._cardsList.hideCardsList();
        this._cardsList.deleteCards();
        this._newsApi.getNews(this._input.value)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(response => {
                if (response.totalResults !== 0) {
                    return response;
                }
                return Promise.reject(response);
            })
            .then(response => {
                this._storageHandler.writeStorage(response, this._input.value)
                this._cardsList.showCardsGroup();
                this._cardsList.showCardsList();
            })
            .catch(error => {
                this._showNotFound(error.status);
            })
            .finally(() => {
                this._unblockForm();
                this._handlePreloader();
            });
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






