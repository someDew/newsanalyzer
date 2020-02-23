export default class SearchInput {
    constructor(newsApi, cardsList, storageHandler, notFound) {
        
        this._newsApi = newsApi;
        this._searchForm = document.forms.searchForm;
        this._input = this._searchForm.elements.searchInput;
        this._button = this._searchForm.elements.searchSubmit;
        this._preloader = document.querySelector('.preloader');
        this._cardsList = cardsList;
        this._storageHandler = storageHandler;
        this._notFound = notFound;

        this._searchForm.addEventListener('submit', this._handleSubmit.bind(this));
        this._input.addEventListener('input', this._handleInput.bind(this));
        this._input.addEventListener('invalid', this._handleInvalid.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();
        this._blockForm();
        this._handlePreloader();
        this._notFound.hideNotFound();
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
                this._notFound.showNotFound(error.status);
            })
            .finally(() => {
                this._unblockForm();
                this._handlePreloader();
            });
    }

    _handlePreloader() {
        this._preloader.classList.toggle('preloader_disable');
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






