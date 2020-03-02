export default class SearchInput {
    constructor(newsApi, cardsList, storageHandler, notFound, preloader) {

        this._newsApi = newsApi;
        this._cardsList = cardsList;
        this._storageHandler = storageHandler;
        this._notFound = notFound;
        this._preloader = preloader;

        this._searchForm = document.forms.searchForm;
        this._input = this._searchForm.elements.searchInput;
        this._button = this._searchForm.elements.searchSubmit;

        this._searchForm.addEventListener('submit', this._handleSubmit.bind(this));
        this._input.addEventListener('input', this._handleInput.bind(this));
        this._input.addEventListener('invalid', this._handleInvalid.bind(this));
    }

    _handleSubmit(event) {
        event.preventDefault();
        this._blockForm();
        this._preloader.show();
        this._notFound.hide();
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
                this._notFound.show(error.status);
            })
            .finally(() => {
                this._storageHandler.calculateHistogram();
                this._unblockForm();
                this._preloader.hide();
            });
    }

    renderPrevious() {
        if (sessionStorage.totalNews) {
            sessionStorage.setItem('showedNews', 0);
            this._input.value = sessionStorage.lastReqest;
            this._cardsList.showCardsGroup();
            this._cardsList.showCardsList();
        }
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